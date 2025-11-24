"use client";
import React from "react";
import { Eye, Pencil, Trash2, Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Reusable Status Badge Component
 */
export const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-100 text-green-700 border-green-200",
    ongoing:"bg-green-100 text-green-700 border-green-200",
    complete: "bg-green-100 text-green-700 border-green-200",
    suspended: "bg-yellow-100 text-yellow-700 border-yellow-200",
    inactive: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-md text-sm w-full justify-center border ${
        styles[status] || styles.inactive
      }`}
    >
      <span className="w-1.5 h-1.5 bg-current rounded-full mr-2"></span>
      {status}
    </span>
  );
};

/**
 * Reusable Actions Menu Component
 * 
 * @param {Array} actions - Array of action objects { label, icon, onClick, className }
 */
export const ActionsMenu = ({ actions = [] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <Ellipsis color="gray" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {actions.map((action, index) => (
          <DropdownMenuItem
            key={index}
            onClick={action.onClick}
            className={action.className || ""}
          >
            {action.icon}
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/**
 * Truncated Text Cell with Tooltip
 */
export const TruncatedCell = ({ value, maxWidth = "150px" }) => {
  return (
    <span
      title={value}
      className="block truncate overflow-hidden text-ellipsis whitespace-nowrap"
      style={{ maxWidth }}
    >
      {value}
    </span>
  );
};

/**
 * Reusable Filter Menu Component
 * 
 * @param {Array} filters - Array of filter objects { label, value, checked, onChange }
 * @param {React.ReactNode} icon - Icon component to display
 * @param {string} label - Button label text
 */
export const FilterMenu = ({ filters = [], icon, label = "Filters" }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md text-sm text-gray-700 hover:bg-gray-50">
          {icon}
          {label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {filters.map((filter, index) => (
          <DropdownMenuItem
            key={index}
            onClick={(e) => {
              e.preventDefault();
              filter.onChange?.(!filter.checked);
            }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={filter.checked}
              onChange={(e) => filter.onChange?.(e.target.checked)}
              className="w-4 h-4 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
            {filter.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

/**
 * Reusable Sort Menu Component
 * 
 * @param {Array} sortOptions - Array of sort objects { label, value, onClick, isSelected }
 * @param {React.ReactNode} icon - Icon component to display
 * @param {string} label - Button label text
 */
export const SortMenu = ({ sortOptions = [], icon, label = "Sort" }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md text-sm text-gray-700 hover:bg-gray-50">
          {icon}
          {label}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {sortOptions.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={option.onClick}
            className={`cursor-pointer ${option.isSelected ? "bg-gray-100" : ""}`}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
