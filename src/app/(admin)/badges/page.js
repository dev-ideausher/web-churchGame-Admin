"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import StatCards from "@/app/Components/StatCards";
import CommunityTable from "@/app/Components/Community/CommunityTable";

const Page = () => {
  const stats = [
    { title: "Bronze earned", number: "500" },
    { title: "Silver earned", number: "450" },
    { title: "Gold earned", number: "50" },
    { title: "Faith fire earned", number: "50" },
  ];
  return (
    <div className="flex flex-col gap-5 mb-5">
      <div className="flex flex-row items-center justify-between w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="font-semibold text-base"
                href="/badges"
              >
                Badges
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <button
          onClick={() => router.push("/community/archives")}
          className="px-4 py-2.5 rounded-full flex items-center flex-row gap-2 cursor-pointer text-white bg-[#4E4C6A] font-semibold text-sm hover:shadow-lg"
        >
          <span>
            <Archive size={16} />
          </span>
          Go to Archives
        </button> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCards key={index} title={stat.title} number={stat.number} />
        ))}
      </div>
      <CommunityTable />
    </div>
  );
};

export default Page;
