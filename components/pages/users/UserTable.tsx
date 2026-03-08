"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import { DataTable } from "@/components/reusable/data-table";
import Loader from "@/components/reusable/Loader";
import convertDate from "@/hooks/convertDate";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { useState } from "react";

interface UserDetail {
  id: number;
  name: string;
  email: string;
  Subscription: string;
  created_at: string;
  status: string;
  subscriptions?: {
    creator?: {
      service?: { name: string };
      transaction_id?: string;
    };
  };
  updated_at?: string;
}


export default function UserTable() {

  const columns: ColumnDef<UserDetail>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        const serialNumber = (page - 1) * pageSize + (row.index + 1);
        return <span>{serialNumber.toString().padStart(2, '0')}</span>;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.original.name ?? "N/A"}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.email ?? "N/A"}</span>,
    },
    {
      accessorKey: "subscription",
      header: "Subscription",
      // Accessing the service name from the creator subscription object
      cell: ({ row }) => <span>{row.original.subscriptions?.creator?.service?.name ?? "N/A"}</span>,
    },
    {
      accessorKey: "transactionId",
      header: "Transaction ID",
      // Accessing the transaction ID from the creator subscription object
      cell: ({ row }) => <span>{row.original.subscriptions?.creator?.transaction_id ?? "N/A"}</span>,
    },
    {
      accessorKey: "joinDate",
      header: "Join Date",
      cell: ({ row }) => (
        <span>
          {row.original.created_at ? convertDate(row.original.created_at) : "N/A"}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        if (!status) return <span>N/A</span>;
        const isInactive = status.toLowerCase() === "inactive" || status.toLowerCase() === "suspended";
        return (
          <span className={isInactive ? "text-[#e70d0d]" : ""}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
      },
    },
    {
      accessorKey: "watch",
      header: "Watch",
      // Note: This field is missing from your JSON object; using N/A as requested
      cell: () => <span>N/A</span>,
    },
    {
      accessorKey: "lastActivity",
      header: "Last activity",
      // Note: Using updated_at as a proxy for last activity, or N/A if you prefer
      cell: ({ row }) => <span>{row.original.updated_at ? convertDate(row.original.updated_at) : "N/A"}</span>,
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
  // get data
  const { data: userData, error, isLoading } = useQuery({
    queryKey: ['userData', "users"],
    queryFn: async () => {
      const res = await privateAxios.get("/admin/user/allusers");
      return res.data.users ?? [];
      ;
    }
  })

  const [page, setPage] = useState(1);
  const pageSize = 10;

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  const total = userData?.length;
  const paginatedData = userData?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );


  return (
    <div>
      {/* filter */}
      {/* table */}

      <div className="bg-[#131824]">
        <div className="px-8 py-4">
          <h1 className="text-base font-medium">User Details</h1>
        </div>

        <DataTable
          columns={columns}
          data={paginatedData}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

