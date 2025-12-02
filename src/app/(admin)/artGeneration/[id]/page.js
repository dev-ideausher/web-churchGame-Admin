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
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  getDetailsById,
  statusArt,
} from "../../../../../Api/ArtGenerationApi/page";
import dayjs from "dayjs";
const Page = () => {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const router = useRouter();
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

  const permissionApi = async (type) => {
    try {
      if (type === "accept") setAcceptLoading(true);
      if (type === "reject") setRejectLoading(true);

      const result = await statusArt(type, id);
      if (result.status) {
        setLoading(false);
        toast.success("Status updated successfully");
        router.push("/artGeneration");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setAcceptLoading(false);
      setRejectLoading(false);
    }
  };
  const details = [
    { label: "Image ID", value: data?.art?.id },
    { label: "User Name", value: "Biblekid1234" },
    {
      label: "Image generated on",
      value: dayjs(data?.createdAt).format("DD/MM/YYYY, h:mm A"),
    },
    { label: "Status", value: data?.status },
    { label: "Subscription type", value: data?.subscription },
    { label: "Average time for generation", value: data?.avgGenTime },
  ];
  const ImageDetails = [
    { label: "Style", value: "Lego" },

    {
      label: "Original Prompt",
      value: data?.initialPrompt,
    },

    {
      label: "Final Prompt",
      value: data?.finalPrompt,
    },

    {
      label: "Image",
      value: data?.art?.url || null,
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
      <div className="flex flex-col gap-10 w-2/3">
        <DetailsBox title="User Information" details={details} />

        <DetailsBox title="Image details" details={ImageDetails} />
      </div>
      {data?.status === "requested" && (
        <div className="flex flex-row items-center gap-5 w-full">
          <button
            disabled={acceptLoading || rejectLoading}
            onClick={() => permissionApi("accept")}
            className="px-4 py-2.5 rounded-full flex items-center flex-row gap-2 text-white cursor-pointer bg-[#026E0F]"
          >
            {acceptLoading ? "Accepting..." : "Accept Image"}
          </button>
          <button
            disabled={acceptLoading || rejectLoading}
            onClick={() => permissionApi("reject")}
            className="px-4 py-2.5 rounded-full flex items-center flex-row gap-2  cursor-pointer bg-[#9C1B1B] text-white"
          >
            {rejectLoading ? "Rejecting..." : "Reject Image"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
