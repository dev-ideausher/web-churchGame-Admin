import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const isFirst = currentPage === 1;
  const isLast  = currentPage === totalPages || totalPages === 0;

  return (
    <div className="w-full bg-gray-100 shadow-lg rounded-b-lg flex justify-end items-center border-t border-gray-100 px-4 py-1">
      <div className="border bg-white border-gray-300 rounded-lg flex items-center shadow-md">
        {/* Prev button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isFirst}
          className="
            px-1 py-1 border-r border-gray-300
            text-gray-800 cursor-pointer disabled:text-gray-300
            disabled:cursor-not-allowed
          "
        >
          <ChevronLeft />
        </button>

        {/* Page indicator */}
        <span className="px-4 py-1 border-r border-gray-300 text-base">
          {currentPage}/{totalPages}
        </span>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLast}
          className="
            px-1 py-1 rounded-r-lg
            text-gray-800 cursor-pointer disabled:text-gray-300
            disabled:cursor-not-allowed
          "
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
