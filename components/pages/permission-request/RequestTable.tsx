"use client";

import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/reusable/data-table";
import { CircleCheck, CircleX, Info } from "lucide-react"; // Changed icons to match context better
import Link from "next/link";

interface PermissionRequest {
  id: string;
  name: string;
  email: string;
  img: string;
  category: string;
  plan: string;
  date: string;
  method: string;
  status: string;
}

const permissionRequest: PermissionRequest[] = [
  {
    id: "284910",
    name: "Alex Rivera",
    email: "alex.r@example.com",
    img: "https://i.pravatar.cc/150?u=284910",
    category: "Lifestyle",
    plan: "Basic",
    date: "12 Oct 2025",
    method: "Stripe",
    status: "Pending",
  },
  {
    id: "883214",
    name: "Sarah Chen",
    email: "schen.dev@example.com",
    img: "https://i.pravatar.cc/150?u=883214",
    category: "Tech",
    plan: "Most Popular",
    date: "05 Nov 2025",
    method: "PayPal",
    status: "rejected",
  },
  {
    id: "459023",
    name: "Marcus Thorne",
    email: "m.thorne@example.com",
    img: "https://i.pravatar.cc/150?u=459023",
    category: "Fitness",
    plan: "Premium",
    date: "22 Nov 2025",
    method: "Credit Card",
    status: "Pending",
  },
  {
    id: "102938",
    name: "Elena Rodriguez",
    email: "elena.rod@example.com",
    img: "https://i.pravatar.cc/150?u=102938",
    category: "Education",
    plan: "Basic",
    date: "01 Dec 2025",
    method: "Stripe",
    status: "approved",
  },
  {
    id: "674521",
    name: "Jordan Smith",
    email: "j.smith@example.com",
    img: "https://i.pravatar.cc/150?u=674521",
    category: "Music",
    plan: "Most Popular",
    date: "14 Dec 2025",
    method: "PayPal",
    status: "Pending",
  },
];

const columns: ColumnDef<PermissionRequest>[] = [
  {
    accessorKey: "id",
    header: "Creator ID",
    cell: ({ row }) => <span className="text-gray-400">{row.original.id}</span>,
  },
  {
    accessorKey: "name",
    header: "User Info",
    cell: ({ row }) => (
      <div className="flex gap-3 items-center">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-700">
          {/* FIXED: Removed quotes from row.original.img */}
          <img
            src={row.original.img}
            alt={row.original.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-white text-sm font-medium leading-none">
            {row.original.name}
          </p>
          <p className="text-xs text-gray-500 mt-1">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-gray-300">{row.original.category}</span>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => (
      <span className="text-gray-300">{row.original.plan}</span>
    ),
  },
  {
    accessorKey: "date",
    header: "Request Date",
    cell: ({ row }) => (
      <span className="text-gray-300">{row.original.date}</span>
    ),
  },
  {
    accessorKey: "method",
    header: "Payment Method",
    cell: ({ row }) => (
      <span className="text-gray-300">{row.original.method}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="text-gray-400">{row.original.status}</span>
    ),
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <>
       

        {row.original.status !== "Pending" ? (
          <p>Action not allowed for this status</p>
        ) : (
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#7A24BC] text-white text-xs font-medium hover:bg-[#6a1fa3] transition-colors">
              <CircleCheck className="w-3.5 h-3.5" />
              <span>Approve</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#D4183D] text-white text-xs font-medium hover:bg-[#b81535] transition-colors">
              <CircleX className="w-3.5 h-3.5" />
              <span>Reject</span>
            </button>
            <Link
              href="./permission-requests/1234"
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#1C212D] text-white text-xs font-medium border border-gray-700 hover:bg-[#2a3142] transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Details</span>
            </Link>
          </div>
        )}
      </>
    ),
  },
];

export default function RequestTable() {
  return (
    <div className="space-y-4 p-4 bg-[#0D121E] min-h-screen text-white">
      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Permission Request</h2>
        <Select>
          <SelectTrigger className="w-[140px] bg-[#1C212D] border-gray-700 rounded px-4">
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
      </div>

      {/* table */}
      <div className="rounded-md border border-gray-800">
        <DataTable columns={columns} data={permissionRequest} />
      </div>
    </div>
  );
}
