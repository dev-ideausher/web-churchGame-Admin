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

const RevenueListingTable = () => {
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
      header: "Transaction ID",
    },

    {
      accessorKey: "User ID",
      header: "User ID",
    },
    {
      accessorKey: "Username",
      header: "Username",
    },
    {
      accessorKey: "Tier",
      header: "Tier",
    },
    {
      accessorKey: "Amount",
      header: "Amount",
    },
    {
      accessorKey: "Platform",
      header: "Platform",
    },

    {
      accessorKey: "Generated on",
      header: "Date",
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
              //   onClick: () =>
              //     router.push(`/imageManagement/${row.original._id}`),
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
      label: "Success",
      value: "Success",
      checked: selectedFilter === "Success",
      onChange: () => {
        setSelectedFilter("Success");
        setPage(1);
      },
    },
    {
      label: "Failed",
      value: "Failed",
      checked: selectedFilter === "Failed",
      onChange: () => {
        setSelectedFilter("Failed");
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
      title="Transaction Log"
      data={data}
      columns={columns}
      loading={loading}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search in transactions "
      filters={filterOptions}
      sortOptions={sortOptions}
      pagination={pagination}
      onPageChange={setPage}
    />
  );
};

export default RevenueListingTable;
