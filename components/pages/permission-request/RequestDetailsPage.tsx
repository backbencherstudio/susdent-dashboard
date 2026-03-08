"use client";

import React from "react";
import { CircleCheck, CircleX, PlayCircle } from "lucide-react";
import { VideoPreviewModal } from "./PreviewVideo";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/reusable/Loader";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const RequestDetailsPage = () => {
  const { rid } = useParams();
  const router = useRouter();

  console.log("rid", rid ?? "no rid");
  const { data: permissionRequest, isLoading, error, refetch } = useQuery({
    queryKey: ["permissionRequest", rid],
    queryFn: async () => {
      const res = await privateAxios.get(`/admin/creator/channels/${rid}`);
      return res?.data?.channel ?? {};
    },
  });

  const queryClient = useQueryClient();

  const handleApprove = async (id: string) => {
    try {
      await privateAxios.patch(`/admin/creator/channels/${id}/approve`, {
        review_note: "Approved by admin",
      });
        toast.success("Channel approved successfully");
        refetch();
        router.push("/dashboard/permission-requests");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to approve channel");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await privateAxios.patch(`/admin/creator/channels/${id}/reject`, {
        review_note: "Rejected by admin",
      });
      toast.success("Channel rejected successfully");
      refetch();
      router.push("/dashboard/permission-requests");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reject channel");
    }
  };



  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("permission request", permissionRequest ?? "no data");

  return (
    <div className=" text-white space-y-6">
      <header>
        <h1 className="text-sm font-medium text-gray-400 mb-6">Video Request Details</h1>
      </header>

      {/* Profile Header Card */}
      <div className="bg-[#111723] rounded-xl p-6 flex items-center justify-between border border-gray-800">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-purple-600"></div>
            <img
              src={permissionRequest?.user?.avatar}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover p-1"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{permissionRequest?.name}</h2>
              <span className="bg-[#7A24BC] text-[10px] px-2 py-0.5 rounded text-white font-semibold">
                {permissionRequest?.user?.role}
              </span>
            </div>
            <p className="text-sm text-gray-400">Email: <span className="text-gray-200">{permissionRequest?.user?.email}</span></p>
            <p className="text-sm text-gray-400">Phone Number: <span className="text-gray-200">{permissionRequest?.user?.phone}</span></p>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => handleApprove(permissionRequest?.id)} className="flex items-center gap-2 bg-[#7A24BC] hover:bg-[#6a1fa3] px-4 py-2 rounded-lg text-sm transition-all">
            <CircleCheck className="w-4 h-4" />
            Approve
          </button>
          <button onClick={() => handleReject(permissionRequest?.id)} className="flex items-center gap-2 bg-[#D4183D] hover:bg-[#b81535] px-4 py-2 rounded-lg text-sm transition-all">
            <CircleX className="w-4 h-4" />
            Reject
          </button>
        </div>
      </div>

      {/* Channel & Bio Section */}
      <div className="bg-[#111723] rounded-xl p-6 border border-gray-800 space-y-4">
        <h3 className="text-lg font-semibold italic text-gray-100">
          {permissionRequest?.name}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {permissionRequest?.bio}
        </p>
      </div>

      {/* Category Section */}
      <div className="bg-[#111723] rounded-xl p-6 border border-gray-800 space-y-4">
        <h3 className="text-lg font-semibold">Content Category *</h3>
        <p className="text-sm text-gray-400">{permissionRequest?.channel_category}</p>
      </div>

      {/* Sample Video Section */}
      <div className="bg-[#111723] rounded-xl p-6 border border-gray-800 space-y-4">
        <h3 className="text-lg font-semibold">Sample Video :</h3>
        <div className="relative w-24 h-16 rounded overflow-hidden group cursor-pointer border border-gray-700">
          <img
            src={permissionRequest?.sample_video_link}
            alt="Video Thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
            <PlayCircle className="w-8 h-8 text-white opacity-80" />
          </div>


        </div>

        <VideoPreviewModal
          sampleVideoLink={permissionRequest?.sample_video_link}
          title={permissionRequest?.name}
          description={permissionRequest?.bio}
          creator={permissionRequest?.user?.name}
          category={permissionRequest?.channel_category}
          duration={permissionRequest?.media?.duration_formatted}
          onApprove={() => {console.log("approve")}}
          onReject={() => {console.log("reject")}}
          isPendingApprove={false}
          isPendingReject={false}
        />
      </div>
    </div>
  );
};

export default RequestDetailsPage;