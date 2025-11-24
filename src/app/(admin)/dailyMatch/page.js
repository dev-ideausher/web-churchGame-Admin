"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import UserManagementTable from "@/app/Components/UserManagement/UserManagementTable";
import StatCards from "@/app/Components/StatCards";
const Page = () => {
  const router = useRouter();
  const stats = [
    { title: "Total Daily matches", number: 2426 },
    { title: "TOTAL PARTICIPANTS", number: 2426 },
    { title: "TOTAL REFLECTIONS", number: 453 },
  ];
  return (
    <div className="flex flex-col gap-5 mb-5">
      <div className="flex flex-row items-center justify-between w-full">
        <Breadcrumb>
          <BreadcrumbList>
            {/* <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator /> */}
            <BreadcrumbItem>
              <BreadcrumbLink
                className="font-semibold text-base"
                href="/imageManagement"
              >
                Daily Match
              </BreadcrumbLink>
            </BreadcrumbItem>
            {/* <BreadcrumbSeparator /> */}
            {/* <BreadcrumbItem>
            <BreadcrumbPage>User Details</BreadcrumbPage>
          </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
        <button
          onClick={() => router.push("/imageManagement/addImages")}
          className="px-4 py-2.5 bg-[#4E4C6A] rounded-full flex items-center flex-row gap-2 text-white cursor-pointer"
        >
          <Calendar size={18} />
          Schedule image
        </button>
      </div>
      <div className="w-full flex flex-col gap-5 ">
        <div className="flex flex-row justify-between items-center w-full  gap-4">
          {stats.map((stat, index) => (
            <StatCards key={index} title={stat.title} number={stat.number} />
          ))}
        </div>
        <UserManagementTable />
      </div>
    </div>
  );
};

export default Page;
