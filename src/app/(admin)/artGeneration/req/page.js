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
import DetailsBox from "@/app/Components/DetailsBox";
const Page = () => {
  const details = [
    { label: "Image ID", value: "123456" },
    { label: "User Name", value: "Biblekid1234" },
    { label: "Image generated on", value: "2 August 2025, 3:56 pm" },
    { label: "Status", value: "Completed" },
    { label: "Subscription type", value: "Free" },
    { label: "Average time for generation", value: "03:00 minutes" },
  ];
  const ImageDetails = [
    { label: "Style", value: "Lego" },

    {
      label: "Original Prompt",
      value:
        "Lorem ipsum dolor sit amet, consectetur piscing elit, lorem ipsum dolor sit amet, consectetur piscing elit orem ipsum dolor sit amet, consectetur piscing elit",
    },

    {
      label: "Final Prompt",
      value:
        "Lorem ipsum dolor sit amet, consectetur piscing elit, lorem ipsum dolor sit amet, consectetur piscing elit orem ipsum dolor sit amet, consectetur piscing elit",
    },

    {
      label: "Image",
      value: "/image1.png",
      type: "image",
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
                href="/artGeneration"
              >
                Art Generation
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Requests</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <button className="px-4 py-2.5 rounded-full flex items-center flex-row gap-2 text-gray-700 cursor-pointer">
          <Pencil />
        </button>
      </div>
      <div className="flex flex-col gap-10">
        <DetailsBox title="User Information" details={details} />

        <DetailsBox title="Image details" details={ImageDetails} />
        <div className="flex flex-row items-center gap-5 w-1/3">
          <button className="px-4 py-2.5 rounded-full flex items-center flex-row gap-2 text-white cursor-pointer bg-[#026E0F]">Accept Image</button>
          <button className="px-4 py-2.5 rounded-full flex items-center flex-row gap-2  cursor-pointer bg-[#9C1B1B] text-white">Reject Image</button>
            
        </div>
      </div>
    </div>
  );
};

export default Page;
