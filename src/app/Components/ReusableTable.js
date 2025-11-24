"use client";
import React from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import DataTable from "./DataTable";
import { FilterMenu, SortMenu } from "./TableHelpers";
import Pagination from "./Pagination";

/**
 * ReusableTable Component
 *
 * @param {Object} props
 * @param {string} props.title - Table title displayed in header
 * @param {Array} props.data - Array of data objects to display
 * @param {Array} props.columns - Column definitions for TanStack Table
 * @param {boolean} props.loading - Loading state
 * @param {string} props.searchValue - Controlled search input value
 * @param {Function} props.onSearchChange - Search input change handler
 * @param {string} props.searchPlaceholder - Placeholder text for search input
 * @param {Array} props.filters - Array of filter objects for FilterMenu
 * @param {Array} props.sortOptions - Array of sort objects for SortMenu
 * @param {Function} props.onFilterClick - (Deprecated) Filter button click handler
 * @param {Function} props.onSortClick - (Deprecated) Sort button click handler
 * @param {Object} props.headerAction - Optional action button config { label, icon, onClick }
 * @param {Object} props.pagination - Pagination object { total, page, limit, totalPages }
 * @param {Function} props.onPageChange - Page change handler
 */
const ReusableTable = ({
  title,
  data = [],
  columns = [],
  loading = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search",
  filters = [],
  sortOptions = [],
  onFilterClick, // Kept for backward compatibility
  onSortClick, // Kept for backward compatibility
  headerAction,
  pagination,
  onPageChange,
}) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-[#4E4C6A] px-6 py-3 flex items-center justify-between
       gap-5 ">
        <div className="flex flex-row  items-center gap-4 w-2/3">
          {" "}
          <h2 className="text-white text-lg font-semibold ">{title}</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border rounded-md text-sm w-96"
              disabled={loading}
            />
          </div>
        </div>

        <div className="flex gap-3 w-1/3 justify-end">
          {/* Filters - Use dropdown menu if filters provided, otherwise fallback to button */}
          {filters.length > 0 ? (
            <FilterMenu
              filters={filters}
              icon={<SlidersHorizontal color="#DBB358" size={16} />}
              label="Filters"
            />
          ) : (
            onFilterClick && (
              <button
                onClick={onFilterClick}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md text-sm text-gray-700"
                disabled={loading}
              >
                <SlidersHorizontal color="#DBB358" size={16} />
                Filters
              </button>
            )
          )}

          {/* Sort - Use dropdown menu if sortOptions provided, otherwise fallback to button */}
          {sortOptions.length > 0 ? (
            <SortMenu
              sortOptions={sortOptions}
              icon={<ArrowUpDown color="#DBB358" size={16} />}
              label="Sort"
            />
          ) : (
            onSortClick && (
              <button
                onClick={onSortClick}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md text-sm text-gray-700"
                disabled={loading}
              >
                <ArrowUpDown color="#DBB358" size={16} />
                Sort
              </button>
            )
          )}

          {/* Optional Header Action */}
          {headerAction && (
            <button
              onClick={headerAction.onClick}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md text-sm text-gray-700"
              disabled={loading}
            >
              {headerAction.icon}
              {headerAction.label}
            </button>
          )}
        </div>
      </div>

      {/* Reuse existing DataTable component */}
      <DataTable
        table={table}
        loading={loading}
        columnsCount={columns.length}
      />
      
      {/* Only show pagination if totalPages > 1 */}
      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default ReusableTable;
