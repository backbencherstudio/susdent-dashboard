"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import { DataTable } from "@/components/reusable/data-table";
import convertDate from "@/hooks/convertDate";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { useState } from "react";

interface SubscriptionDetail {
  id: string;
  name: string;
  email: string;
  plan: string;
  startDate: string;
  renewalDate: string;
  paymentMethod: string;
  txnID: string;
  status: string;
  kind: string;
  payment_method: string;
  transaction_id: string;
  price: number;
  created_at: string;
  start_date: string;
  end_date: string;
  renewal_date: string;
  deleted_at: string;
  user: {
    id: string;
    name: string;
    email: string;
    status: string;
  };
  service: {
    id: string;
    name: string;
    plan: string;
    price: number;
    currency: string;
    videos_per_month: number;
  };
}

// {
//   "kind": "creator",
//   "id": "cmmd7wqr3000rl0hmk6z662hh",
//   "status": "active",
//   "plan": "family",
//   "payment_method": "stripe",
//   "transaction_id": "sub_1T7XUUF8S2i4eRYfPBY4O4s5",
//   "price": null,
//   "created_at": "2026-03-05T08:42:46.768Z",
//   "start_date": "2026-03-05T08:42:42.000Z",
//   "end_date": "2026-04-05T08:42:42.000Z",
//   "renewal_date": "2026-04-05T08:42:42.000Z",
//   "deleted_at": null,
//   "user": {
//       "id": "cmlrskrtx00jml07vy0449fir",
//       "name": "kazishayem008",
//       "email": "kazishayem008@gmail.com",
//       "status": "active",
//       "role": "creator",
//       "deleted_at": null
//   },
//   "service": {
//       "id": "cmlonts0o000ll07vj6lmk72s",
//       "name": "Creator Family",
//       "plan": "family",
//       "price": 800,
//       "currency": "usd",
//       "videos_per_month": 30
//   }
// }


const columns: ColumnDef<SubscriptionDetail>[] = [
  {
    accessorKey: "id",
    header: "User ID",
    cell: ({ row }) => <span className="">{row.original.user.id}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span className="">{row.original.user.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span className="">{row.original.user.email}</span>,
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => <span className="">{row.original.service.plan}</span>,
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => <span className="">{convertDate(row.original.start_date)}</span>,
  },
  {
    accessorKey: "renewalDate",
    header: "Renewal Date",
    cell: ({ row }) => <span className="">{convertDate(row.original.renewal_date)}</span>,
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => <span className="">{row.original.payment_method}</span>,
  },
  {
    accessorKey: "txnID",
    header: "Transaction ID",
    cell: ({ row }) => <span className="">{row.original.transaction_id}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (row.original.status === "active" ? <span className="text-[#10b981] capitalize">{row.original.status}</span> : <span className="text-[#E73021] cursor-pointer capitalize">{row.original.status} </span>)
    }
  },

];

export default function SubscriptionTable() {

  const { data: subscriptionData=[], isLoading, error, refetch } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const res = await privateAxios.get("/payments/getAllSubscriptions");
      return res.data.subscriptions;
    }
  })

  const [page, setPage] = useState(1);


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>error</p>;
  console.log(subscriptionData);

  const pageSize = 8;
  const total = subscriptionData?.length;
  const paginatedData = subscriptionData?.slice(
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
