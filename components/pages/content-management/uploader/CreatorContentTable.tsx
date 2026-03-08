"use client";

import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { privateAxios } from "@/components/axiosInstance/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteContent from "../DeleteContent";
import { toast } from "sonner";
import EyeIcon from "@/components/icons/EyeIcon";
import Link from "next/link";

interface Content {
  id: string;
  title: string;
  genre: string;
  category: {
    id: string;
    name: string;
  };
  type: string;
  file_size_bytes: string;
  status: string; // This is the content status (approved/rejected/pending)
  category_id: string;
  content_status: string;
  created_at: string;
  view_count: number;
  video: string;
  thumbnail: string;
  review_status: string;
  creator_channel: {
    id: string;
    name: string;
    status: string; // This is the channel status, not content status
  };
}

// fetch content
const fetchContent = async (status: string) => {
  try {
    const res = await privateAxios.get(`/admin/creator/creator-content?status=${status}`);
    return res.data;
  } catch (error: any) {
    console.error("Error fetching content:", error);
    throw new Error(error?.response?.data?.message || "Failed to fetch content");
  }
};

export default function CreatorContentTable() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["creator-contents", statusFilter], // Include statusFilter in query key
    queryFn: () => fetchContent(statusFilter),
  });

  const handleApprove = async (id: string) => {

    // /admin/creator/creator-content/cmlp2et2800a3l07vg33m88ns/approve
    try {
      await privateAxios.patch(`/admin/creator/creator-content/${id}/approve`);
      toast.success("Content approved successfully");
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["creator-contents", statusFilter] });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to approve content");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await privateAxios.patch(`/admin/creator/creator-content/${id}/reject`);
      toast.success("Content rejected successfully");
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["creator-contents", statusFilter] });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reject content");
    }
  };

  const columns: ColumnDef<Content>[] = [
    {
      accessorKey: "thumbnail",
      header: "Thumbnail",
      cell: ({ row }) => (
        <div className="relative">
          <img
            src={row.original.thumbnail || "/placeholder-thumbnail.jpg"}
            alt={row.original.title}
            className="rounded-sm w-[57px] h-10 object-cover"
          // onError={(e) => {
          //   (e.target as HTMLImageElement).src = "/placeholder-thumbnail.jpg";
          // }}
          />
          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/20 rounded-full p-1 backdrop-blur-sm">
              <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-medium text-white">{row.original.title || "N/A"}</span>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <span className="text-gray-300">{row.original.category?.name || "N/A"}</span>,
    },
    {
      accessorKey: "creator",
      header: "Creator",
      cell: ({ row }) => <span className="text-gray-300">{row.original.creator_channel?.name || "N/A"}</span>,
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: () => <span className="text-gray-300">--:--</span>,
    },
    {
      accessorKey: "publish",
      header: "Publish",
      cell: ({ row }) => {
        const date = row.original.created_at;
        if (!date) return <span className="text-gray-300">N/A</span>;
        try {
          const d = new Date(date);
          if (isNaN(d.getTime())) return <span className="text-gray-300">Invalid date</span>;
          return (
            <span className="text-gray-300">
              {d.getDate().toString().padStart(2, "0")}-
              {(d.getMonth() + 1).toString().padStart(2, "0")}-
              {d.getFullYear().toString().slice(-2)}
            </span>
          );
        } catch {
          return <span className="text-gray-300">Invalid date</span>;
        }
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const review_status = row.original.review_status;
        return (
          <div className="flex flex-wrap gap-2">
            {review_status === "pending" && (
              <>
                <button
                  onClick={() => handleApprove(row.original.id)}
                  className="flex w-fit items-center gap-1 bg-[#8b2fc9] text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-[#7a24a1] transition-all"
                >
                  <span className="border border-white rounded-full w-3 h-3 flex items-center justify-center text-[8px]">✓</span>
                  Approve
                </button>
                <button
                  onClick={() => handleReject(row.original.id)}
                  className="flex w-fit items-center gap-1 bg-[#d91e36] text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-[#b0182b] transition-all"
                >
                  <span className="border border-white rounded-full w-3 h-3 flex items-center justify-center text-[8px]">×</span>
                  Reject
                </button>
              </>
            )}

            {review_status === "approved" && (
              <span className="flex items-center gap-1 bg-green-600/20 text-green-400 px-3 py-1.5 rounded text-xs font-medium">
                <span className="border border-green-400 rounded-full w-3 h-3 flex items-center justify-center text-[8px]">✓</span>
                Approved
              </span>
            )}

            {review_status === "rejected" && (
              <span className="flex items-center gap-1 bg-red-600/20 text-red-400 px-3 py-1.5 rounded text-xs font-medium">
                <span className="border border-red-400 rounded-full w-3 h-3 flex items-center justify-center text-[8px]">×</span>
                Rejected
              </span>
            )}
{/* dashboard/content-management/uploader/12121 */}
            <Link href={`/dashboard/content-management/uploader/${row.original.id}`} className="flex w-fit items-center gap-1 bg-[#1C212D] text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-[#2a3142] transition-all cursor-pointer">  <EyeIcon className="w-4 h-4" /></Link>
          </div>
        );
      },
    },
  ];

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1); // Reset to first page when filter changes
  };

  // Get data array
  const contents = data?.contents || [];
  const total = contents.length;

  // Paginate data
  const paginatedData = contents.slice((page - 1) * pageSize, page * pageSize);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <>
      {/* Filter */}
      <div className="mb-4 flex justify-end gap-4">
        <Select value={statusFilter} onValueChange={handleStatusChange}>
          <SelectTrigger className="rounded px-5 text-center w-[150px] bg-[#131824] border-[#1B202C] text-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="border border-[#1B202C] bg-[#0D121E] rounded min-w-[150px]">
            <SelectGroup>
              <SelectItem value="pending" className="text-white ">
                Pending
              </SelectItem>
              <SelectItem value="approved" className="text-white ">
                Approved
              </SelectItem>
              <SelectItem value="rejected" className="text-white ">
                Rejected
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div>
        <DataTable
          columns={columns}
          data={paginatedData}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
        />

        {/* Show message if no data */}
        {contents.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No {statusFilter} content found
          </div>
        )}
      </div>
    </>
  );
}