"use client"
import { ContentUploadForm } from "@/components/pages/content-management/ContentUploadForm";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus } from "lucide-react";

export default function page() {

  const router = useRouter()

  return (
    <div className="px-2">

      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-lg font-medium leading-[160%] text-white mb-4">Add new content</h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => router.back()}
            className="text-base font-medium leading-[100%] text-white flex items-center gap-2.5 bg-[#7A24BC]/40 px-4 py-2.5 rounded-lg cursor-pointer"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

          <button
            onClick={() => router.push('/dashboard/content-management/add-series')}
            className="text-base font-medium leading-[100%] text-white flex items-center gap-2 bg-[#7A24BC] px-4 py-2.5 rounded-lg cursor-pointer"
          >
            <Plus size={18} />
            Add Series
          </button>
        </div>
      </div>
      <ContentUploadForm />
    </div>
  );
}
