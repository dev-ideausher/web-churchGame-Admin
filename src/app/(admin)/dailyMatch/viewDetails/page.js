import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Pencil } from "lucide-react";
import ImageDetailsBox from "@/app/Components/DetailsBox";
import Image from "next/image";

const Page = () => {
  const details = [
    { label: "Total participants", value: "123456" },
    { label: "Total reflections", value: "12345" },
    { label: "Average response time", value: "3 hours" },
  ];
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
                Daily Match
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
      <ImageDetailsBox title="Game Information" details={details} />
      <div className="flex flex-row items-start justify-between gap-5 w-full">
        <div className="flex flex-col items-start   gap-2">
          <h3>Image: 123345</h3>
          <Image src="/image1.png" alt="image" width={200} height={300} />
        </div>
        <div className="flex flex-col gap-2 items-start">
          <h3 className="capitalize">verse options</h3>
        </div>
      </div>
    </div>
  );
};

export default Page;
