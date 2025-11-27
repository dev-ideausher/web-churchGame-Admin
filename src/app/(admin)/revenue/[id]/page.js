"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ImageDetailsBox from "@/app/Components/DetailsBox";

const Page = () => {
    const details = [
    { label: "user ID", value: "123456" },
    { label: "User Name", value: "Biblekid1234" },
    { label: "Full Name", value: "John Doe" },
    { label: "Email", value: "johndoe@email.com" },
   
  ];
    const details2 = [
    { label: "Plan name", value: "Pro" },
    { label: "Platform", value: "Google" },
    { label: "Status", value: "Active" },
    { label: "Start date", value: "1 Aug 2025" },
    { label: "Renewal date", value: "1 September 2025" },
    { label: "Billing cycle", value: "Monthly" },
    { label: "Auto Renew", value: "No" },   
    { label: "Images generated", value: "26/100" },   
   
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
      <div className="flex flex-row items-center justify-between w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="font-semibold text-base"
                href="/imageManagement"
              >
                Revenue
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ImageDetailsBox title="User Information" details={details}/>
      <ImageDetailsBox title="Subscription information" details={details2}/>
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
    </div>
  );
};

export default Page;
