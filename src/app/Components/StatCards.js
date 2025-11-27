import React from 'react'

const StatCards = ({ title, number }) => {
     const displayValue = number !== null && number !== undefined ? number.toLocaleString() : '--';
  return (
    <div className="bg-white rounded-lg border w-full border-gray-200 p-6 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer shadow">
      <div title={title} className="text-xs font-medium text-[#646464] uppercase tracking-wide mb-2 truncate">
        {title}
      </div>
      <div className="text-3xl font-bold text-gray-900">
        {displayValue}
      </div>
    </div>
  );
}

export default StatCards


