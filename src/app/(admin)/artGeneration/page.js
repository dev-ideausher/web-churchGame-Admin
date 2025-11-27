"use client";
import React, { useEffect, useState } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import StatCards from "@/app/Components/StatCards";
import Tabs from "@/app/Components/Tabs";
import ArtLisitngTable from "@/app/Components/ArtGeneration/ArtLisitingTable";
import { toast } from "react-toastify";
import { getArtStats } from "../../../../Api/ArtGenerationApi/page";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getArtStats();
      if (result.status) {
        setData(result.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong while getting stats");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: "Total art generated", number: data?.totalGenerated ?? "--" },
    { title: "Pending approvals", number: data?.requested ?? "--" },
    { title: "Approved for gameplay", number: data?.accepted ?? "--" },
    { title: "Rejected", number: data?.rejected ?? "--" },
  ];
  const tabItems = [
    { id: "gameplays", label: "Generation" },
    { id: "daily-match", label: "Approval Requests" },
  ];
  useEffect(() => {
    fetchData();
  }, []);
  const [activeTab, setActiveTab] = useState(tabItems[0].id);
  return (
    <div className="flex flex-col gap-5 mb-5">
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
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCards key={index} title={stat.title} number={stat.number} />
        ))}
      </div>
      <Tabs items={tabItems} onTabChange={setActiveTab} />

      <ArtLisitngTable />
    </div>
  );
}
