"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UserManagementTable from "@/app/Components/UserManagement/UserManagementTable";
import { Image } from "lucide-react";
import StatCards from "@/app/Components/StatCards";
import { useRouter } from "next/navigation";
import ImageListingTable from "@/app/Components/ImageManagement/ImageListingTable";
import { toast } from "react-toastify";
import { getImageStats } from "../../../../Api/ImageManagementApi/page";
const Page = () => {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getImageStats();
      if (result.data) {
        setData(result.data?.[0]);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Error fetching stats data");
    } finally {
      setLoading(false);
    }
  };
  const stats = [
    { title: "Total uploaded", number: data?.total??"--" },
    { title: "fully tagged", number: data?.complete??"--" },
    { title: "incomplete", number: data?.incomplete??"--" },
    { title: "active in gameplay", number: data?.active??"--" },
  ];
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);
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
                Image Management
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
          <Image size={18} />
          Add Images
        </button>
      </div>
      <div className="w-full flex flex-col gap-5 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCards key={index} title={stat.title} number={stat.number} />
          ))}
        </div>
        <ImageListingTable />
      </div>
    </div>
  );
};

export default Page;
