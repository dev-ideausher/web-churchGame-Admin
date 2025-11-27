"use client";
import React, { useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import StatCards from "@/app/Components/StatCards";
import RevenueListingTable from "@/app/Components/Revenue/RevenueListingTable";

const Page = () => {
  const stats = [
    { title: "Total Revenue", number: "$" + 2426 },
    { title: "Revenue this month", number: "$" + 2426 },
    { title: "Average revenue per User", number: "$" + 453 },
    { title: "Monthly Recurring Revenue", number: "$" + 4563 },
  ];
  const subscriptionData = [
    {
      tier: "Free",
      billingCycle: "$0/month",
      users: "12345",
      monthlyRevenue: "$12345",
      churnRate: "5%",
    },
    {
      tier: "Pro",
      billingCycle: "$0/month",
      users: "12345",
      monthlyRevenue: "$12345",
      churnRate: "4%",
    },
    {
      tier: "Plus",
      billingCycle: "$0/month",
      users: "12345",
      monthlyRevenue: "$12345",
      churnRate: "3%",
    },
  ];
  return (
    <div className="flex flex-col gap-5 mb-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="font-semibold text-base"
              href="/artGeneration"
            >
              Art Generation
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCards key={index} title={stat.title} number={stat.number} />
        ))}
      </div>
      <div className="w-full  mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#4E4C6A] px-6 py-4">
            <h2 className="text-white text-lg font-semibold">
              Subscription Performance
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F0F2F5]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Tier
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Billing Cycle
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Monthly Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Churn Rate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {subscriptionData.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {row.tier}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {row.billingCycle}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {row.users}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {row.monthlyRevenue}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {row.churnRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <RevenueListingTable />
    </div>
  );
};

export default Page;
