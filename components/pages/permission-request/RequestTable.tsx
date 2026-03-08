"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/reusable/data-table";
import { CircleCheck, CircleX, Info } from "lucide-react";
import Link from "next/link";
import CustomSelect from "@/components/reusable/CustomSelect";
import convertDate from "@/hooks/convertDate";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import { useState } from "react";
import { toast } from "sonner";

// Update the interface to match actual API response
interface Channel {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  bio: string;
  sample_video_link: string;
  channel_category: string;
  status: "pending" | "approved" | "rejected";
  reviewed_by_user_id: string | null;
  reviewed_at: string | null;
  review_note: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: {
    id: string;
    name: string;
    avatar: string | null;
    email: string;
    role: string;
  };
  reviewed_by: {
    id: string;
    name: string;
    email: string;
    avatar: string | null;
    role: string;
  } | null;
  _count: {
    contents: number;
  };
}

export default function RequestTable() {
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: channels, isLoading, error, refetch } = useQuery({
    queryKey: ["permission-requests", statusFilter],
    queryFn: async () => {
      const status = statusFilter === "all" ? "" : statusFilter;
      const res = await privateAxios.get(`/admin/creator/channels?status=${status}`);
      return res?.data?.channels ?? [];
    },
  });
 
  const handleApprove = async (id: string) => {
    try {
      await privateAxios.patch(`/admin/creator/channels/${id}/approve`, {
        review_note: "Approved by admin",
      });
      toast.success("Channel approved successfully");
      refetch();
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
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reject channel");
    }
  };

  const columns: ColumnDef<Channel>[] = [
    {
      accessorKey: "id",
      header: "Creator ID",
      cell: ({ row }) => (
        <span className="text-gray-400 text-xs">{row.original.id.slice(0, 8)}...</span>
      ),
    },
    {
      accessorKey: "name",
      header: "User Info",
      cell: ({ row }) => (
        <div className="flex gap-3 items-center">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-700 bg-gray-800">
            <img
              src={row.original.user?.avatar ?? "https://via.placeholder.com/150"}
              alt={row.original.user?.name ?? ""}
              className="w-full h-full object-cover"
             
            />
          </div>
          <div>
            <p className="text-white text-sm font-medium leading-none">
              {row.original.name ?? "Unknown"}
            </p>
            <p className="text-xs text-gray-500 mt-1">{row.original.user?.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "channel_category",
      header: "Category",
      cell: ({ row }) => (
        <span className="text-gray-300">{row.original.channel_category}</span>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Request Date",
      cell: ({ row }) => (
        <span className="text-gray-300">{convertDate(row.original.created_at)}</span>
      ),
    },
    {
      accessorKey: "_count",
      header: "Contents",
      cell: ({ row }) => (
        <span className="text-gray-300">{row.original._count?.contents || 0}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <span className="text-gray-400">
            {status === "pending" ? (
              <span className="text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full text-xs">Pending</span>
            ) : status === "approved" ? (
              <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded-full text-xs">Approved</span>
            ) : (
              <span className="text-red-500 bg-red-500/10 px-2 py-1 rounded-full text-xs">Rejected</span>
            )}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const status = row.original.status;
        
        return (
          <>
            {status !== "pending" ? (
              <div className="flex items-center gap-2">
                <Link
                  href={`./permission-requests/${row.original.id}`}
                  className="action-btn1 bg-[#1C212D] hover:bg-[#2a3142] inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Details</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleApprove(row.original.id)}
                  className="action-btn1 bg-[#7A24BC] hover:bg-[#6a1fa3] inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs"
                >
                  <CircleCheck className="w-3.5 h-3.5" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handleReject(row.original.id)}
                  className="action-btn1 bg-[#D4183D] hover:bg-[#b81535] inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs"
                >
                  <CircleX className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
                <Link
                  href={`./permission-requests/${row.original.id}`}
                  className="action-btn1 bg-[#1C212D] hover:bg-[#2a3142] inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Details</span>
                </Link>
              </div>
            )}
          </>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4 p-4 bg-[#0D121E] min-h-screen text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Permission Request</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-white">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4 p-4 bg-[#0D121E] min-h-screen text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Permission Request</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">Error: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 bg-[#0D121E] min-h-screen text-white">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Permission Request</h2>

        <CustomSelect
          options={[
            { label: "All", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Approved", value: "approved" },
            { label: "Rejected", value: "rejected" },
          ]}
          placeholder="Status"
          className="min-w-[107px]"
          defaultValue="all"
          onValueChange={(value) => setStatusFilter(value)}
        />
      </div>

      {/* table */}
      <div className="rounded-md border border-gray-800">
        <DataTable columns={columns} data={channels || []} />
        
        {(!channels || channels.length === 0) && (
          <div className="text-center py-8 text-gray-400">
            No permission requests found
          </div>
        )}
      </div>
    </div>
  );
}