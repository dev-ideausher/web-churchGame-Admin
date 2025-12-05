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
import Tabs from "@/app/Components/Tabs";
const Page = () => {
  const tabItems = [
    { id: "gameplays", label: "Comments" },
    { id: "daily-match", label: "Likes" },
  ];
  const [activeTab, setActiveTab] = useState(tabItems[0].id);

  const details = [
    { label: "Share date", value: " 1 Aug 2025" },
    {
      label: "Reflection question",
      value: "How can we include more prayers into our daily routines? ",
    },
    {
      label: "Associated devotional",
      value:
        "Lorem ipsum dolor sit amet, consectetur piscing elit, sed do...Lorem ipsum dolor sit amet, consectetur piscing elit, sed do...",
    },
    { label: "Total Shares", value: "12345" },
    { label: "Total likes", value: "12345" },
    { label: "Total comments", value: "12345" },
  ];
  const commentDetails = [
    { label: "Username", value: " Biblekid4567" },
    {
      label: "Comment",
      value:
        "Lorem ipsum dolor sit amet, consectetur piscing elit, sed do...Lorem ipsum dolor sit amet, consectetur piscing elit, sed do... ",
    },
    {
      label: "Time",
      value: "11:11 am",
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
                href="/community"
              >
                Community
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Share Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-2/3 flex flex-col gap-5">
        <ImageDetailsBox title="User information" details={details} />
        <ImageDetailsBox title="Share information" details={details} />
        <Tabs items={tabItems} onTabChange={setActiveTab} />
        <ImageDetailsBox title="" details={commentDetails} />
        <ImageDetailsBox title="" details={commentDetails} />
      </div>
    </div>
  );
};

export default Page;
