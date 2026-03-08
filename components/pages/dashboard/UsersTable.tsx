import { DataTable } from "@/components/reusable/data-table";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { privateAxios } from "@/components/axiosInstance/axios";
import Link from "next/link";
import { ArrowRightIcon, DivideCircle } from "lucide-react";
import convertDate from "@/hooks/convertDate";

interface UserDetail {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  status: string;
  role: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role_details: {
    viewer: boolean;
  };
  subscriptions: {
    viewer: string | null;
    creator: {
      service: {
        name: string;
      } | null;
      transaction_id: string | null;
    } | null;
  };
  last_payment: string | null;
  flags: {
    is_deleted: boolean;
    has_creator_channel: boolean;
    has_active_viewer_subscription: boolean;
    has_active_creator_subscription: boolean;
  };
}

// Table columns
const columns: ColumnDef<UserDetail>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="">{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="">{row.original.email}</span>,
  },
  {
    accessorKey: "subscription",
    header: "Subscription",
    cell: ({ row }) => {
      const serviceName = row.original.subscriptions?.creator?.service?.name;
      return <span className="">{serviceName ?? "N/A"}</span>;
    },
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => {
      const transactionId = row.original.subscriptions?.creator?.transaction_id;
      return <span className="">{transactionId ?? "N/A"}</span>;
    },
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => <span className="">{row.original.created_at ? convertDate(row.original.created_at) : "N/A"}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className="">{row.original.status.charAt(0).toUpperCase() + row.original.status.slice(1)}</span>,
  },
  {
    accessorKey: "lastActivity",
    header: "Last Activity",
    cell: ({ row }) => <span className="">{row.original.updated_at ? convertDate(row.original.updated_at) : "N/A"}</span>,
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <Link
          className="bg-[#8b2fc9] text-white px-[14px] py-[7px] rounded-[4px] text-sm hover:opacity-90 transition-opacity"
          href={`/dashboard/users/${row.original.id}`}
        >
          Details
        </Link>
      </div>
    ),
  },
];

export default function UsersTable() {
  const { data } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await privateAxios.get("/admin/dashboard/recent-users");
      return res.data.users.slice(0, 8) ?? [];
    },
  });

  console.log("users dataaaa", data ?? "no data");

  return (
    <div>
      <div className="mt-4">
        <DataTable
          tableTitle="User Details"
          data={data ?? []}
          columns={columns}
        >
        </DataTable>

        <div className="flex items-center justify-center py-2">
          <Link href="/dashboard/users" className="text-white text-xs font-medium cursor-pointer items-center gap-2 bg-[#1C212D] hover:bg-[#2a3142] inline-flex px-3 py-1.5 rounded">
            <span>View All</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}