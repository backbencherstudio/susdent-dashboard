"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { DataTable } from "@/components/reusable/data-table";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CreatorInfoTabs from "./CreatorInfoTabs";

// Interface updated to match the new image columns
interface CreatorManagement {
  id: string;
  name: string;
  email: string;
  img: string;
  category: string;
  plan: string;
  videos: number;
  earnings: string;
  lastUpload: string;
  status: string;
}

const creatorData: CreatorManagement[] = [
  {
    id: "154898",
    name: "Mark Lee",
    email: "jane@example.com",
    img: "https://i.pravatar.cc/150?u=mark",
    category: "Entertainment",
    plan: "Basic",
    videos: 20,
    earnings: "$2,850",
    lastUpload: "15 Nov 2025",
    status: "Pending",
  },
  {
    id: "154898",
    name: "John Doe",
    email: "jane@example.com",
    img: "https://i.pravatar.cc/150?u=john",
    category: "Gaming",
    plan: "Family",
    videos: 25,
    earnings: "$2,850",
    lastUpload: "Apr 12, 2025",
    status: "Pending",
  },
];

const columns: ColumnDef<CreatorManagement>[] = [
  {
    accessorKey: "id",
    header: "Creator ID",
    cell: ({ row }) => (
      <span className="text-gray-400 text-xs">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Creator Info",
    cell: ({ row }) => (
      <div className="flex gap-3 items-center">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-700">
          <img
            src={row.original.img}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-white text-sm font-medium">{row.original.name}</p>
          <p className="text-[10px] text-gray-500">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-gray-400 text-xs">{row.original.category}</span>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => (
      <span className="text-gray-400 text-xs">{row.original.plan}</span>
    ),
  },
  {
    accessorKey: "videos",
    header: "Videos",
    cell: ({ row }) => (
      <span className="text-gray-400 text-xs">{row.original.videos}</span>
    ),
  },
  {
    accessorKey: "earnings",
    header: "Earnings",
    cell: ({ row }) => (
      <span className="text-gray-400 text-xs">{row.original.earnings}</span>
    ),
  },
  {
    accessorKey: "lastUpload",
    header: "Last Upload",
    cell: ({ row }) => (
      <span className="text-gray-400 text-xs">{row.original.lastUpload}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="text-gray-400 text-xs">{row.original.status}</span>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <button className="px-4 py-1.5 rounded bg-[#1C212D] text-[#D4183D] text-xs font-medium hover:bg-opacity-80 transition-all">
          Suspend
        </button>
        <Link
          href={`./video-creator/${row.id}`}
          className="px-4 py-1.5 rounded bg-[#1C212D] text-white text-xs font-medium border border-gray-800 hover:bg-gray-800 transition-all"
        >
          Details
        </Link>
      </div>
    ),
  },
];

export default function CreatorManagementTable() {
  return (
    <>
      {/* header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Permission Request</h2>
        <div className="flex items-center justify-center gap-4">
          <Select>
            <SelectTrigger className="w-[100px] bg-[#1C212D] border-gray-700 rounded px-4">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="border border-gray-700 bg-[#0D121E] text-white">
              <SelectGroup>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[110px] bg-[#1C212D] border-gray-700 rounded px-4">
              <SelectValue placeholder="Plans" />
            </SelectTrigger>
            <SelectContent className="border border-gray-700 bg-[#0D121E] text-white">
              <SelectGroup>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="pending">Basic</SelectItem>
                <SelectItem value="approved">Family</SelectItem>
                <SelectItem value="rejected">Most Popular</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full bg-[#0D121E] rounded-lg overflow-hidden ">
        <DataTable columns={columns} data={creatorData} />
      </div>

    
   
    </>
  );
}
