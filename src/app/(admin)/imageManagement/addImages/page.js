"use client";

import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "react-toastify";
import { addImages } from "../../../../../Api/ImageManagementApi/page";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const MAX_IMAGES = 5;

 const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length + files.length > MAX_IMAGES) {
      toast.error(`Only ${MAX_IMAGES} images allowed`);
      return;
    }

    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 11),
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

 const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (images.length + files.length > MAX_IMAGES) {
      toast.error(`Only ${MAX_IMAGES} images allowed`);
      return;
    }

    const newImages = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 11),
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const removeImage = (id) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const handleSave = async () => {
    if (images.length === 0) {
      toast.error("Please select images first!");
      return;
    }

    const files = images.map((img) => img.file);

    try {
      toast.info("Uploading images...");
      const response = await addImages(files);

      if (response.status) {
        toast.success("Images uploaded successfully!");
        setImages([]);
        // Redirect to image management listing page
        router.push("/imageManagement");
      } else {
        toast.error(response.message || "Upload failed");
      }
    } catch (error) {
      toast.error(error.message || "Upload failed");
    }
  };

  return (
    <div className="flex flex-col gap-5 mb-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              className="font-semibold text-base"
              href="/imageManagement"
            >
              Image Management
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium text-sm">
              Add Images
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="w-2/3">
        <div className=" py-3 text-base text-[#4E4C6A] font-semibold">
          Upload Images
        </div>

        <div className="">
          {images.map((image) => (
            <div
              key={image.id}
              className="flex items-center gap-4 px-6 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <img
                src={image.preview}
                alt={image.name}
                className="w-11 h-11 object-cover rounded border border-gray-300"
              />

              <span className="flex-1 text-sm text-gray-700 truncate">
                {image.name}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(image.preview, "_blank")}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="View"
                >
                  <Upload className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => removeImage(image.id)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Remove"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="bg-white border-2 rounded-md border-dashed border-gray-300 p-2 text-center"
        >
          <div className="flex flex-col items-center gap-2 ">
            <Upload className="w-8 h-8 text-gray-400" />
            <div className="text-[#76716F]">
              <p className="font-medium">Drop files here</p>
              <p className="text-sm">or</p>
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                multiple
                disabled={images.length >= MAX_IMAGES}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="px-6  border-2 border-gray-900 rounded-full font-medium hover:bg-gray-900 hover:text-white transition-colors inline-block">
                Choose files
              </span>
            </label>
            <p className="text-sm text-gray-500">Maximum file size: 20 MB</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={images.length === 0}
          className="px-6 py-2 bg-[#4E4C6A] text-white rounded-md font-medium hover:bg-[#4E4C7B] mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Page;
