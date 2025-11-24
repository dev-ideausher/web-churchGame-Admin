"use client";
import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import ReusableTable from "../ReusableTable";
import { StatusBadge, ActionsMenu } from "../TableHelpers";
import {
  getDailyMatchTableData,
  getMatchTypes,
} from "../../../../Api/UserManagement/page";
import { useDebounce } from "../../hooks/useDebounce";
import Image from "next/image";

const DailyMatchTable = ({ id }) => {
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

      const result = await getDailyMatchTableData(id, params);
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
      accessorKey: "lastLogin",
      header: "Date",
      cell: ({ row }) =>
        dayjs(row.original.lastLogin).format("DD/MM/YYYY, hh:mm A"),
    },
    {
      accessorKey: "rounds",
      header: "Image",
      cell: ({ row }) => {
        const url = row.original.rounds?.[0]?.image?.art;

        return (
          <div className="flex flex-row items-center gap-1">
            <Image
              width={40}
              height={40}
              src={url?.url || "/image1.png"}
              alt="Art"
            />
            <p title={url?.url} className="truncate max-w-[150px]">
              {url?.id}
            </p>
          </div>
        );
      },
    },

    {
      accessorKey: "userMatchData",
      header: "Verse Submitted",
      cell: ({ row }) => {
        const userMatchData =
          row.original.userMatchData?.[0]?.responses?.[0]?.chosenVerse;

        return <p className="truncate max-w-[150px]">{userMatchData?.ref}</p>;
      },
    },
    {
      header: "Verse Rank",
      cell: ({ row }) => {
        const verseRank =
          row.original.userMatchData?.[0]?.responses?.[0]?.verseRank;

        return <p className="truncate max-w-[150px]">{verseRank}</p>;
      },
    },
    {
      accessorKey: "reflection",
      header: "Shared Reflection",
      cell: ({ row }) => {
        const reflectionData = row.original.reflection?.[0]?.body;
        return <p className="truncate max-w-[150px]">{reflectionData}</p>;
      },
    },

    {
      header: "Likes",
      cell: ({ row }) => {
        const likes = row.original.reflection?.[0]?.likes ?? 0;
        return <p>{likes}</p>;
      },
    },

    {
      header: "Comments",
      cell: ({ row }) => {
        const comments = row.original.reflection?.[0]?.comments ?? 0;
        return <p>{comments}</p>;
      },
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
              // onClick: () => router.push(`/userManagement/${row.original._id}`),
            },
            // {
            //   label: "Delete",
            //   icon: <Trash2 color="red" size={14} />,
            //   onClick: () => console.log("Delete", row.original),
            //   className: "text-red-700",
            // },
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
      label: "Ongoing",
      value: "ongoing",
      checked: selectedFilter === "ongoing",
      onChange: () => {
        setSelectedFilter("ongoing");
        setPage(1);
      },
    },
    {
      label: "Completed",
      value: "complete",
      checked: selectedFilter === "complete",
      onChange: () => {
        setSelectedFilter("complete");
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
      title="Daily Match"
      data={data}
      columns={columns}
      loading={loading}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search by id"
      filters={filterOptions}
      sortOptions={sortOptions}
      pagination={pagination}
      onPageChange={setPage}
    />
  );
};

export default DailyMatchTable;
