"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import StatCards from "@/app/Components/StatCards";
import ImageDetailsBox from "@/app/Components/DetailsBox";
import CommunityTable from "@/app/Components/Community/CommunityTable";
import { Archive } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const stats = [
    { title: "Total shares", number: "123,456" },
    { title: "total likes", number: "123,456" },
    { title: "total comments", number: "123,456" },
    { title: "Engagement rate", number: "123,456" },
    { title: "shares today", number: "123,456" },
    { title: "likes today", number: "123,456" },
    { title: "comments today", number: "123,456" },
    { title: "engagement rate today", number: "123,456" },
  ];
  const details = [
    { label: "Username", value: "Verse master" },
    {
      label: "Reflection",
      value:
        "Lorem ipsum dolor sit amet, consectetur piscing elit, lorem ipsum dolor sit amet, consectetur piscing elit orem ipsum dolor sit amet, consectetur piscing elit consectetur piscing elit orem ipsum dolor ",
    },
    {
      label: "Likes",
      value: "123",
    },
    { label: "Comments", value: "45" },
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
          </BreadcrumbList>
        </Breadcrumb>
        <button
          onClick={() => router.push("/community/archives")}
          className="px-4 py-2.5 rounded-full flex items-center flex-row gap-2 cursor-pointer text-white bg-[#4E4C6A] font-semibold text-sm hover:shadow-lg"
        >
          <span>
            <Archive size={16} />
          </span>
          Go to Archives
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCards key={index} title={stat.title} number={stat.number} />
        ))}
      </div>
      <div className="flex flex-row items-start gap-8 mt-4">
        <div className="flex flex-col gap-3 w-2/7 ">
          <h2 className="text-[#1C1C1C] font-semibold text-base">
            Today&apos;s Dailymatch Image
          </h2>
          <img
            src="/image1.png"
            alt="image"
            className="rounded-md object-cover w-full h-60"
          />
        </div>
        <div className="flex flex-col  gap-3 w-full ">
          <div className="flex flex-col gap-1">
            <h2 className="text-[#1C1C1C] font-semibold text-base">
              Today&apos;s Reflection Question
            </h2>
            <p className="bg-white py-2 px-5 border rounded-md ">
              From that time Jesus began to preach, saying, “Repent, for the
              kingdom of heaven is at hand.” From that time Jesus began to
              preach, saying, “Repent, for the kingdom of heaven is at hand.”
              From that time Jesus began to preach, saying, “Repent, for the
              kingdom of heaven is at hand.” From that time Jesus began to
              preach, saying, “Repent, for the kingdom of heaven is at hand.”
            </p>
          </div>
          <ImageDetailsBox title="Top share today:" details={details} />
        </div>
      </div>
      <CommunityTable />
    </div>
  );
};

export default Page;
