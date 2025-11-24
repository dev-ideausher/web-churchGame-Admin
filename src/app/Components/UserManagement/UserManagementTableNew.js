"use client";
import React, { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import ReusableTable from "../ReusableTable";
import { StatusBadge, ActionsMenu, TruncatedCell } from "../TableHelpers";
import { getAllUsers } from "../../../../Api/UserManagement/page";

const UserManagementTableNew = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch data
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAllUsers();
      if (result.data) {
        setData(result.data.data);
      }
    } catch (error) {
      toast.error(error.message || "Unable to fetch data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Define columns
  const columns = [
    {
      accessorKey: "_id",
      header: "ID",
      cell: ({ row }) => (
        <TruncatedCell value={row.original._id.slice(-8)} />
      ),
    },
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <TruncatedCell value={row.original.username} />
      ),
    },
    { 
      accessorKey: "email", 
      header: "Email" 
    },
    { 
      accessorKey: "groupCount", 
      header: "Groups" 
    },
    { 
      accessorKey: "reflectionCount", 
      header: "Reflections" 
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) =>
        dayjs(row.original.lastLogin).format("DD/MM/YYYY, hh:mm A"),
    },
    { 
      accessorKey: "badges", 
      header: "Badges" 
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
              label: "View",
              icon: <Eye color="gray" size={14} />,
              onClick: () => router.push(`/userManagement/${row.original._id}`),
            },
            {
              label: "Delete",
              icon: <Trash2 color="red" size={14} />,
              onClick: () => console.log("Delete", row.original),
              className: "text-red-700",
            },
          ]}
        />
      ),
    },
  ];

  // Handlers (you can implement your own logic here)
  const handleSearchChange = (value) => {
    setSearchValue(value);
    // TODO: Implement your search logic
    console.log("Search:", value);
  };

  const handleFilterClick = () => {
    // TODO: Implement your filter logic
    console.log("Filter clicked");
  };

  const handleSortClick = () => {
    // TODO: Implement your sort logic
    console.log("Sort clicked");
  };

  return (
    <ReusableTable
      title="Users"
      data={data}
      columns={columns}
      loading={loading}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search in users"
      onFilterClick={handleFilterClick}
      onSortClick={handleSortClick}
      emptyMessage="No users found"
    />
  );
};

export default UserManagementTableNew;
