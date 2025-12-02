import React from 'react'

const StatCards = ({ title, number }) => {
     const displayValue = number !== null && number !== undefined ? number.toLocaleString() : '--';
  return (
    <div className="bg-white rounded-lg border w-full border-gray-200 2xl:p-6 xl:p-4 lg:p-2 p-1 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer shadow">
      <div title={title} className="text-xs font-medium text-[#646464] uppercase tracking-wide mb-2 truncate">
        {title}
      </div>
      <div className="2xl:text-3xl xl:text-2xl text-xl font-bold text-gray-900">
        {displayValue}
      </div>
    </div>
  );
}

export default StatCards


