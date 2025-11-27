"use client";
import React, { useEffect, useState } from "react";
import { Eye, Pencil, X } from "lucide-react";
import { toast } from "react-toastify";
import ReusableTable from "../ReusableTable";
import { StatusBadge, ActionsMenu } from "../TableHelpers";
import { useDebounce } from "../../hooks/useDebounce";
import { getAllImageTableList } from "../../../../Api/ImageManagementApi/page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAllArtRequests } from "../../../../Api/ArtGenerationApi/page";
import dayjs from "dayjs";

const ArtLisitngTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [selectedFilter, setSelectedFilter] = useState("all");

  const [selectedSort, setSelectedSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {
        sort: selectedSort,
        status: selectedFilter,
        page,
        limit,
        ...(debouncedSearchValue && { search: debouncedSearchValue }),
      };

      const result = await getAllArtRequests(params);
      if (result.data) {
        setData(result.data.data);
        setPagination(result.data.pagination);
        console.log("Fetched data:", result.data);
      }
    } catch (error) {
      toast.error(error.message || "Unable to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedFilter, selectedSort, page, debouncedSearchValue]);

  const columns = [
    {
      accessorKey: "_id",
      header: "Request Id",
    },

    {
      header: "Username",
      cell: ({ row }) => {
        const  username = row.original?.userId?.username || "N/A";
        return(
          <p>{username}</p>
        )
      },
    },
    {
      header: "image",
      cell: ({ row }) => (
        <div className="flex flex-row items-start gap-1 min-w-[120px]">
          <Image
            src={row.original?.art?.url}
            width={20}
            height={20}
            alt="image"
          />
          <p title={row.original?.art?.id} className="truncate">
            {".." + row.original?.art?.id.slice(-8)}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "finalPrompt",
      header: "Final Prompt",
      cell: ({ row }) => <p title={row.original.finalPrompt} className="truncate">{row.original.finalPrompt}</p>,
    },
    {
      accessorKey: "Style",
      header: "Style",
    },
    {
      accessorKey: "updatedAt",
      header: "Generated on",
      cell: ({ row }) => (
        <p>{dayjs(row.original.updatedAt).format("DD/MM/YYYY , h:mm A")}</p>
      ),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <ActionsMenu
          actions={[
            {
              label: "View Details",
              icon: <Eye color="gray" size={14} />,
              onClick: () =>
                router.push(`/artGeneration/${row.original._id}`),
            },
            {
              label: "Edit Details",
              icon: <Pencil color="gray" size={14} />,
              // onClick: () => router.push(`/userManagement/${row.original._id}`),
            },
            {
              label: "Mark Inactive",
              icon: <X color="red" size={14} />,
              onClick: () => console.log("Delete", row.original),
              className: "text-red-500",
            },
          ]}
        />
      ),
    },
  ];

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const filterOptions = [
    {
      label: "All",
      value: "ll",
      checked: selectedFilter === "all",
      onChange: () => {
        setSelectedFilter("all");
        setPage(1);
      },
    },
    {
      label: "Requested",
      value: "requested",
      checked: selectedFilter === "requested",
      onChange: () => {
        setSelectedFilter("requested");
        setPage(1);
      },
    },
    {
      label: "Saved",
      value: "saved",
      checked: selectedFilter === "saved",
      onChange: () => {
        setSelectedFilter("saved");
        setPage(1);
      },
    },
    {
      label: "Rejected",
      value: "rejected",
      checked: selectedFilter === "rejected",
      onChange: () => {
        setSelectedFilter("rejected");
        setPage(1);
      },
    },
    
  ];

  const sortOptions = [
    {
      label: "Newest First",
      value: "newest",
      isSelected: selectedSort === "newest",
      onClick: () => {
        setSelectedSort("newest");
        setPage(1);
      },
    },
    {
      label: "Oldest First",
      value: "oldest",
      isSelected: selectedSort === "oldest",
      onClick: () => {
        setSelectedSort("oldest");
        setPage(1);
      },
    },
  ];

  return (
    <ReusableTable
      title="Art Generation"
      data={data}
      columns={columns}
      loading={loading}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search "
      filters={filterOptions}
      sortOptions={sortOptions}
      pagination={pagination}
      onPageChange={setPage}
    />
  );
};

export default ArtLisitngTable;
