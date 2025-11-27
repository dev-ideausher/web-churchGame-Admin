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
import { Pencil } from "lucide-react";
import Image from "next/image";
import Tabs from "@/app/Components/Tabs";

const Page = () => {
  const tabItems = [
    { id: "gameplays", label: "Image options" },
    { id: "daily-match", label: "Top verses" },
  ];
  const [activeTab, setActiveTab] = useState(tabItems[0].id);
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
                Image Management
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>View Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <button className="px-4 py-2.5 rounded-full flex items-center flex-row gap-2 text-gray-700 cursor-pointer">
          <Pencil />
        </button>
      </div>
      <div
        onClick={() => window.open("/image1.png", "_blank")}
        className="relative w-[100px] h-[100px] bg-white border-2 border-dashed overflow-hidden rounded-xl cursor-pointer"
      >
        <Image src="/image1.png" alt="Image" fill className="object-cover" />
      </div>

      <h2 className="text-base font-semibold text-[#1C1C1C]">Information</h2>
      <div className="flex flex-col gap-1">
        <div className="bg-white w-2/3 rounded-lg border border-[#8380B4] p-5">
          <div className="grid grid-cols-[200px_1fr] gap-y-3 gap-x-5">
            <p className="font-medium text-[#4E4C6A] text-base">Image ID :</p>
            <p className="font-medium text-[#1C1C1C] text-sm">123456</p>

            <p className="font-medium text-[#4E4C6A] text-base">Level:</p>
            <p className="font-medium text-[#1C1C1C] text-sm">Medium</p>

            <p className="font-medium text-[#4E4C6A] text-base">Themes :</p>
            <p className="font-medium text-[#1C1C1C] text-sm">Theme 1 ,2,3,4</p>

            <p className="font-medium text-[#4E4C6A] text-base">Tags :</p>
            <p className="font-medium text-[#1C1C1C] text-sm">
              Tag 1. Tag 2, Tag 3, Tag 4
            </p>

            <p className="font-medium text-[#4E4C6A] text-base">Devotional:</p>
            <p className="wrap-break-word font-medium text-[#1C1C1C] text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>

            <p className="font-medium text-[#4E4C6A] text-base">
              Reflection question :
            </p>
            <p className="font-medium text-[#1C1C1C] text-sm">
              Easy: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor Difficult: Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor
            </p>
          </div>
        </div>
      </div>
      <Tabs items={tabItems} onTabChange={setActiveTab} />
    </div>
  );
};

export default Page;
