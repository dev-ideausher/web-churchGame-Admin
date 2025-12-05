import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ImageDetailsBox from "@/app/Components/DetailsBox";
import CommunityTable from "@/app/Components/Community/CommunityTable";

const Page = () => {
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
  const data = [
    { rank: 1, username: "biblemaster123", likes: 123, comments: 123 },
    { rank: 2, username: "biblemaster123", likes: 122, comments: 122 },
    { rank: 3, username: "biblemaster123", likes: 111, comments: 111 },
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
              <BreadcrumbLink
                className="font-semibold text-base"
                href="/community/archives"
              >
                Archives
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Archives Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="w-2/3">
        <ImageDetailsBox title="Share information" details={details} />
      </div>
      <div className="">
        <h1 className="text-xl font-medium mb-2">Top Shares</h1>

        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-4 gap-4 p-4 bg-gray-200 font-semibold text-gray-700 rounded-t-lg">
            <div>Rank</div>
            <div>Username</div>
            <div>Likes</div>
            <div>Comments</div>
          </div>

          {data.map((item) => (
            <div
              key={item.rank}
              className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <div className="text-gray-900">{item.rank}</div>
              <div className="text-gray-900">{item.username}</div>
              <div className="text-gray-900">{item.likes}</div>
              <div className="text-gray-900">{item.comments}</div>
            </div>
          ))}
        </div>
      </div>
      <CommunityTable />
    </div>
  );
};

export default Page;
