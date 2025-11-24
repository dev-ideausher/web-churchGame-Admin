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
import Tabs from "@/app/Components/Tabs";

import StatCards from "@/app/Components/StatCards";
import { useParams } from "next/navigation";
import {
  getSingleUserStats,
  getUserById,
} from "../../../../../Api/UserManagement/page";
import { toast } from "react-toastify";
import SoloWalkTableNew from "@/app/Components/UserManagement/SoloWalkTableNew";
import QuickMatchTable from "@/app/Components/UserManagement/QuickMatchTable";
import GroupJourneyTable from "@/app/Components/UserManagement/GroupJourneyTable";

const Page = () => {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tabItems = [
    { id: "gameplays", label: "Gameplays" },
    { id: "daily-match", label: "Daily Match" },
    { id: "groups", label: "Groups" },
    { id: "art-generation", label: "Art Generation" },
    { id: "badges", label: "Badges" },
    { id: "subscriptions", label: "Subscriptions" },
  ];
  const tabItems2 = [
    { id: "soloWalk", label: "Solo Walk" },
    { id: "quickMatch", label: "Quick Match" },
    { id: "groupJourney", label: "Group Journey" },
  ];
  const [activeTab, setActiveTab] = useState(tabItems[0].id);
  const [activeTab2, setActiveTab2] = useState(tabItems2[0].id);

  const [statsData, setStatsData] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getUserById(id);
      if (result.data) {
        setData(result.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Unable to fetch data");
    }
    setLoading(false);
  };
  const fetchStats = async () => {
    setLoading(true);
    try {
      const result = await getSingleUserStats(id);
      if (result.data) {
        setStatsData(result.data[0] ?? {});
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Unable to fetch data");
    }
    setLoading(false);
  };
  const stats = [
    { title: "Total Games Played", number: statsData?.total },
    { title: "Solo Walk", number: statsData?.soloWalk },
    { title: "Quick Match", number: statsData?.quickMatch },
    { title: "Group Journey", number: statsData?.groupJourney },
  ];
  useEffect(() => {
    if (id) {
      fetchData();
      fetchStats();
    }
  }, [id]);
  return (
    <div className="flex flex-col gap-5 mb-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="font-semibold text-base"
              href="/userManagement"
            >
              User Management
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>User Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-1">
        <h2 className="font-medium text-[#4E4C6A] text-base">
          User Information
        </h2>
        <div className="bg-white w-2/3 rounded-lg border border-[#8380B4] p-5">
          <div className="grid grid-cols-[200px_1fr] gap-y-3 gap-x-5">
            <p className="font-medium text-[#4E4C6A] text-base">User Id :</p>
            <p className="font-medium text-[#1C1C1C] text-sm">{data?._id}</p>

            <p className="font-medium text-[#4E4C6A] text-base">User Name :</p>
            <p className="font-medium text-[#1C1C1C] text-sm">
              {data?.username}
            </p>

            <p className="font-medium text-[#4E4C6A] text-base">Full Name :</p>
            <p className="font-medium text-[#1C1C1C] text-sm">{data?.name}</p>

            <p className="font-medium text-[#4E4C6A] text-base">Email :</p>
            <p className="font-medium text-[#1C1C1C] text-sm">
              johndoe@email.com
            </p>

            <p className="font-medium text-[#4E4C6A] text-base">
              Favorite Verse :
            </p>
            <p className="wrap-break-word font-medium text-[#1C1C1C] text-sm">
              {data?.favoriteQuote}
            </p>

            <p className="font-medium text-[#4E4C6A] text-base">Church :</p>
            <p className="font-medium text-[#1C1C1C] text-sm">
              {data?.favoriteChurch}
            </p>

            <p className="font-medium text-[#4E4C6A] text-base">
              Account Status :
            </p>
            <p className="font-medium text-[#1C1C1C] text-sm">Active</p>

            <p className="font-medium text-[#4E4C6A] text-base">
              Subscription Plan :
            </p>
            <p className="font-medium text-[#1C1C1C] text-sm">Active</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 ">
        <Tabs items={tabItems} onTabChange={setActiveTab} />
        {activeTab === "gameplays" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <StatCards
                  key={index}
                  title={stat.title}
                  number={stat.number}
                />
              ))}
            </div>
            <div className="px-8">
              <Tabs items={tabItems2} onTabChange={setActiveTab2} />
            </div>
            {activeTab2 === "soloWalk" && <SoloWalkTableNew New id={id} />}
            {activeTab2 === "quickMatch" && <QuickMatchTable New id={id} />}
            {activeTab2 === "groupJourney" && <GroupJourneyTable New id={id} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
