"use client";
import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import ReusableTable from "../ReusableTable";
import { StatusBadge, ActionsMenu } from "../TableHelpers";
import { getMatchTypes } from "../../../../Api/UserManagement/page";
import { useDebounce } from "../../hooks/useDebounce";

const GroupJourneyTable = ({ id }) => {
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

      const result = await getMatchTypes(id, "GroupJourney", params);
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
      header: "Match ID",
      cell: ({ row }) => (
        <p className="min-w-[120px]" title={row.original._id}>{row.original._id.slice(-8)}</p>
      ),
    },
    {
      accessorKey: "name",
      header: "name",
      cell: ({ row }) => (
        <p title={row.original.name}>{row.original.name}</p>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Creation Date",
      cell: ({ row }) =>
        dayjs(row.original.lastLogin).format("DD/MM/YYYY, hh:mm A"),
    },
    {
      accessorKey: "startsAt",
      header: "start Date",
      cell: ({ row }) =>
        dayjs(row.original.lastLogin).format("DD/MM/YYYY, hh:mm A"),
    },
    {
      accessorKey: "expiresAt",
      header: "Expiry Date",
      cell: ({ row }) =>
        dayjs(row.original.lastLogin).format("DD/MM/YYYY, hh:mm A"),
    },
    {
      accessorKey: "difficulty",
      header: "Difficulty",
      // cell: ({ row }) => (
      //   <TruncatedCell value={row.original.Difficulty || "N/A"} />
      // ),
    },
    {
      accessorKey: "groupType",
      header: "group Type",
      cell: ({ row }) => (
        <p className="min-w-[90px]" title={row.original.groupType}>{row.original.groupType}</p>
      ),
      
    },
    {
      accessorKey: "code",
      header: "code",
      
    },
    {
      accessorKey: "maxParticipants",
      header: "max Participants",
       cell: ({ row }) => (
        <p className="min-w-[130px]" title={row.original.maxParticipants}>{row.original.maxParticipants}</p>
      ),
      
    },
    {
      accessorKey: "roundsCount",
      header: "Rounds",
    },
    {
      accessorKey: "currentRound",
      header: "current Round",
       cell: ({ row }) => (
        <p className="min-w-[120px]" title={row.original.currentRound}>{row.original.currentRound}</p>
      ),
    },
    {
      accessorKey: "VerseMatch",
      header: "Verse Match",
       cell: ({ row }) => (
        <p className="min-w-[120px]" title={row.original.VerseMatch}>{row.original.VerseMatch??"--"}</p>
      ),
    },
    {
      accessorKey: "reflectionCount",
      header: "Reflections",
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
            //   onClick: () => router.push(`/userManagement/${row.original._id}`),
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
      title="Group Journey"
      data={data}
      columns={columns}
      loading={loading}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search by id or name"
      filters={filterOptions}
      sortOptions={sortOptions}
      emptyMessage="No group journey data found"
      pagination={pagination}
      onPageChange={setPage}
    />
  );
};

export default GroupJourneyTable;
