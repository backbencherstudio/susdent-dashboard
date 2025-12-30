"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import { DataTable } from "@/components/reusable/data-table";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { useState } from "react";

interface SubscriptionDetail {
  id: number;
  name: string;
  email: string;
  plan: string;
  startDate: string;
  renewalDate: string;
  paymentMethod: string;
  txnID: string;
  status: string;
}

const subscriptionList: SubscriptionDetail[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    plan: "Most Popular",
    startDate: "Apr 12, 2025",
    renewalDate: "15 Jul 2025",
    paymentMethod: "Credit Card",
    txnID: "#12548796",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    plan: "Basic",
    startDate: "Feb 5, 2025",
    renewalDate: "5 May 2025",
    paymentMethod: "Debit Card",
    txnID: "#12548797",
    status: "Expired",
  },
  {
    id: 3,
    name: "Samuel Clark",
    email: "samuel@example.com",
    plan: "Premium",
    startDate: "Mar 3, 2025",
    renewalDate: "3 Jun 2025",
    paymentMethod: "PayPal",
    txnID: "#12548798",
    status: "Active",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    plan: "Most Popular",
    startDate: "Jan 25, 2025",
    renewalDate: "25 Apr 2025",
    paymentMethod: "Credit Card",
    txnID: "#12548799",
    status: "Expired",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    plan: "Basic",
    startDate: "Feb 18, 2025",
    renewalDate: "18 May 2025",
    paymentMethod: "Credit Card",
    txnID: "#12548800",
    status: "Active",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@example.com",
    plan: "Premium",
    startDate: "Mar 10, 2025",
    renewalDate: "10 Jun 2025",
    paymentMethod: "Debit Card",
    txnID: "#12548801",
    status: "Expired",
  },
  {
    id: 7,
    name: "David Wilson",
    email: "david@example.com",
    plan: "Most Popular",
    startDate: "Apr 1, 2025",
    renewalDate: "1 Jul 2025",
    paymentMethod: "PayPal",
    txnID: "#12548802",
    status: "Active",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    email: "olivia@example.com",
    plan: "Basic",
    startDate: "Mar 5, 2025",
    renewalDate: "5 Jun 2025",
    paymentMethod: "Credit Card",
    txnID: "#12548803",
    status: "Expired",
  },
  {
    id: 9,
    name: "James Anderson",
    email: "james@example.com",
    plan: "Premium",
    startDate: "Feb 20, 2025",
    renewalDate: "20 May 2025",
    paymentMethod: "Credit Card",
    txnID: "#12548804",
    status: "Active",
  },
  {
    id: 10,
    name: "Charlotte Taylor",
    email: "charlotte@example.com",
    plan: "Most Popular",
    startDate: "Jan 30, 2025",
    renewalDate: "30 Apr 2025",
    paymentMethod: "PayPal",
    txnID: "#12548805",
    status: "Expired",
  },
];


const columns: ColumnDef<SubscriptionDetail>[] = [
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => <span className="">{row.original.id}</span>,
  },
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
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => <span className="">{row.original.plan}</span>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => <span className="">{row.original.startDate}</span>,
  },
  {
    accessorKey: "renewalDate",
    header: "Renewal Date",
    cell: ({ row }) => <span className="">{row.original.renewalDate}</span>,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => <span className="">{row.original.paymentMethod}</span>,
  },
  {
    accessorKey: "txnID",
    header: "Transaction ID",
    cell: ({ row }) => <span className="">{row.original.txnID}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => 
        {
          return( row.original.status === "Active" ? <span>{row.original.status}</span> : <span className="text-[#E73021]">{row.original.status} </span>)
        }
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => (
  //     <div className="flex gap-4">
  //       <Link  className="border border-[#A5A5AB] px-2 py-1 rounded-[2px]" href="#">
  //          Details  
  //       </Link>
  //     </div>
  //   ),
  // },
];

export default function SubscriptionTable() {

   /* const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () =>
    {
      const res = await privateAxios.get("/payments/getAllSubscriptions");
      return res.data;
    }
  }) */

  /*  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>error</p>; */
  

  const [page, setPage] = useState(1);
  const pageSize = 5;
  const total = subscriptionList.length;
  const paginatedData = subscriptionList.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  return (
    <div>
      {/* filter */}
      {/* table */}

      <div>
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
