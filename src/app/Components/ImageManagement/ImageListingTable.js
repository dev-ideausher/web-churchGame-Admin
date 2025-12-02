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

const ImageListingTable = () => {
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

      const result = await getAllImageTableList(params);
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
      header: "image",
      cell: ({ row }) => (
        <div className="flex flex-row items-start gap-1 min-w-[120px]">
          <Image
            src={row.original?.image?.art?.url}
            width={20}
            height={20}
            alt="image"
          />
          <p title={row.original?.image?._id} className="truncate">
            {".." + row.original?.image?._id.slice(-8)}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "difficulty",
      header: "image Level",
      cell: ({ row }) => (
        <p className="capitalize" > {row.original?.difficulty??"--"}</p>
      ),
    },
    {
      accessorKey: "tags",
      header: "tags",
      cell: ({ row }) => {
        const tags = row.original.tags;
        return Array.isArray(tags) && tags.length > 0 ? tags.join(", ") : "--";
      },
    },

    {
      accessorKey: "themes",
      header: "Themes",
      cell: ({ row }) => {
        const themes = row.original.themes;
        return Array.isArray(themes) && themes.length > 0
          ? themes.join(", ")
          : "--";
      },
    },
    {
      accessorKey: "devotional",
      header: "Devotionals",
      cell: ({ row }) => {
        const text = row.getValue("devotional") ?? "--";

        return (
          <div className="max-w-[150px] truncate" title={text}>
            {text}
          </div>
        );
      },
    },
    {
      accessorKey: "reflectionE",
      header: "reflections",
        cell: ({ row }) => {
        const text = row.getValue("reflectionE") ?? "--";

        return (
          <div className="max-w-[150px] truncate" title={text}>
            {text}
          </div>
        );
      },
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
                router.push(`/imageManagement/${row.original._id}`),
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
      value: "all",
      checked: selectedFilter === "all",
      onChange: () => {
        setSelectedFilter("all");
        setPage(1);
      },
    },
    {
      label: "Active",
      value: "active",
      checked: selectedFilter === "active",
      onChange: () => {
        setSelectedFilter("active");
        setPage(1);
      },
    },
    {
      label: "Complete",
      value: "complete",
      checked: selectedFilter === "complete",
      onChange: () => {
        setSelectedFilter("complete");
        setPage(1);
      },
    },
    {
      label: "Incomplete",
      value: "incomplete",
      checked: selectedFilter === "incomplete",
      onChange: () => {
        setSelectedFilter("incomplete");
        setPage(1);
      },
    },
    {
      label: "Inactive",
      value: "inactive",
      checked: selectedFilter === "inactive",
      onChange: () => {
        setSelectedFilter("inactive");
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
      title="Images"
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

export default ImageListingTable;
