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
  const ImageDetails = [
    { label: "Badge name", value: "Verse master" },

    {
      label: "Badge ID",
      value: "12345",
    },

    {
      label: "Badge family",
      value: "Solo Walk",
    },
    {
      label: "Bronze collected",
      value: "4000",
    },
    {
      label: "Silver collected",
      value: "4000",
    },

    {
      label: "Gold collected",
      value: "4000",
    },
    {
      label: "Faithfire collected",
      value: "4000",
    },
    {
      label: "Status",
      value: "Active",
    },

    {
      label: "Image",
      value: "/image1.png",
      type: "image",
    },
    {
      label: "Description",
      value:
        "Lorem ipsum dolor sit amet, consectetur piscing elit, lorem ipsum dolor sit amet, consectetur piscing elit orem ipsum dolor sit amet, consectetur piscing elit consectetur piscing elit orem ipsum dolor sit amet, consectetur piscing elit",
    },
    {
      label: "Criteria",
      value:
        "Lorem ipsum dolor sit amet, consectetur piscing elit, lorem ipsum dolor sit amet, consectetur piscing elit orem ipsum dolor sit amet, consectetur piscing elit consectetur piscing elit orem ipsum dolor sit amet, consectetur piscing elit",
    },
    {
      label: "Verse",
      value:
        "Lorem ipsum dolor sit amet, consectetur piscing elit, lorem ipsum dolor sit amet, consectetur piscing elit orem ipsum dolor sit amet, consectetur piscing elit consectetur piscing elit orem ipsum dolor sit amet, consectetur piscing elit",
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
                href="/badges"
              >
                Badges
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Share Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ImageDetailsBox title="Badge information" details={ImageDetails} />
    </div>
  );
};

export default Page;
