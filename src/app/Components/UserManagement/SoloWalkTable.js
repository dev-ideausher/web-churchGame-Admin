"use client";
import React, { useEffect, useState } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { Search, SlidersHorizontal, ArrowUpDown, Ellipsis } from "lucide-react";
import { Eye, Pencil, Trash2 } from "lucide-react";

import DataTable from "../DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllUsers } from "../../../../Api/UserManagement/page";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-100 text-green-700 border-green-200",
    suspended: "bg-yellow-100 text-yellow-700 border-yellow-200",
    inactive: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-sm w-full justify-center border ${styles[status]}`}
    >
      <span className="w-1.5 h-1.5 bg-current rounded-full mr-2"></span>
      {status}
    </span>
  );
};

const SoloWalkTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAllUsers();
      if (result.data) {
        setData(result.data.data);
        console.log(result.data.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Unable to fetch data");
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      accessorKey: "_id",
      header: "Match ID",
      cell: ({ row }) => {
        const value = row.original._id;
        return (
          <span
            title={value}
            className="block max-w-[150px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {value.slice(-8)}
          </span>
        );
      },
    },
    {
      accessorKey: "lastLogin",
      header: "Date",
      cell: ({ row }) =>
        dayjs(row.original.lastLogin).format("DD//MM/YYYY, hh:mm A"),
    },
    {
      accessorKey: "Difficulty",
      header: "Difficulty",
      cell: ({ row }) => {
        const value = row.original.Difficulty;
        return (
          <span
            title={value}
            className="block max-w-[150px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {value}
          </span>
        );
      },
    },
    { accessorKey: "Rounds ", header: "Rounds " },
    { accessorKey: "Verse Match", header: "Verse Match" },
    { accessorKey: "Reflections", header: "Reflections" },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-md">
                <Ellipsis color="gray" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem
                onClick={() =>
                  router.push(`/userManagement/${row.original?._id}`)
                }
              >
                <Eye color="gray" size={14} /> View Details
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => console.log("Edit", user)}>
                <Pencil color="gray" size={14} /> Edit
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="bg-[#4E4C6A]  flex-row px-6 py-3 flex justify-between items-center gap-5">
        <div className="flex flex-row items-center gap-3 w-full">
          {" "}
          <h2 className="text-white text-lg font-semibold w-full">Solo Walk</h2>
          <div className="relative ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border rounded-md text-sm w-96"
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex items-center justify-end  w-full gap-3">
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md text-sm text-gray-700">
              <SlidersHorizontal color="#DBB358" size={16} />
              Filters
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md text-sm text-gray-700">
              <ArrowUpDown color="#DBB358" size={16} />
              Sort
            </button>
          </div>
        </div>
      </div>

      <DataTable
        table={table}
        loading={loading}
        columnsCount={columns.length}
      />
    </div>
  );
};

export default SoloWalkTable;
