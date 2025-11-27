"use client";
import React, { use, useEffect, useState } from "react";
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
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { getDetailsById } from "../../../../../Api/ArtGenerationApi/page";
import dayjs from "dayjs";
const Page = () => {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getDetailsById(id);
      if (result.status) {
        setData(result.data);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const details = [
    { label: "Image ID", value: data?.art?.id },
    { label: "User Name", value: "Biblekid1234" },
    { label: "Image generated on", value: dayjs(data?.createdAt).format("DD/MM/YYYY, h:mm A") },
    { label: "Status", value: data?.status },
    { label: "Subscription type", value: data?.subscription },
    { label: "Average time for generation", value: data?.avgGenTime },
  ];
  const ImageDetails = [
    { label: "Style", value: "Lego" },

    {
      label: "Original Prompt",
      value:
        data?.initialPrompt,
    },

    {
      label: "Final Prompt",
      value:
       data?.finalPrompt,
    },

    {
      label: "Image",
      value: data?.art?.url,
      type: "image",
    },
  ];
  useEffect(() => {
    if (!id) {
      toast.error("Something went wrong");
    } else {
      fetchData();
    }
  }, [id]);
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
              <BreadcrumbPage>View Details</BreadcrumbPage>
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
      </div>
    </div>
  );
};

export default Page;
