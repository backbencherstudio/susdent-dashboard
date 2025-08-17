"use client";
import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { useState } from "react";

interface UserDetail {
  id: number;
  name: string;
  email: string;
  subscription: string;
  txnID: string;
  joinDate: string;
  status: string;
  watch: string;
  LastActivity: string;
}

const userList: UserDetail[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    subscription: "Most Popular",
    txnID: "#12548796",
    joinDate: "Apr 12, 2025",
    status: "Active",
    watch: "1500h",
    LastActivity: "2 min ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    subscription: "Basic",
    txnID: "#12548797",
    joinDate: "Feb 5, 2025",
    status: "Expired",
    watch: "800h",
    LastActivity: "5 min ago",
  },
  {
    id: 3,
    name: "Samuel Clark",
    email: "samuel@example.com",
    subscription: "Premium",
    txnID: "#12548798",
    joinDate: "Mar 3, 2025",
    status: "Active",
    watch: "1200h",
    LastActivity: "10 min ago",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subscription: "Most Popular",
    txnID: "#12548799",
    joinDate: "Jan 25, 2025",
    status: "Expired",
    watch: "900h",
    LastActivity: "15 min ago",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@example.com",
    subscription: "Basic",
    txnID: "#12548800",
    joinDate: "Feb 18, 2025",
    status: "Active",
    watch: "1100h",
    LastActivity: "30 min ago",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily@example.com",
    subscription: "Premium",
    txnID: "#12548801",
    joinDate: "Mar 10, 2025",
    status: "Expired",
    watch: "950h",
    LastActivity: "1 hour ago",
  },
  {
    id: 7,
    name: "David Wilson",
    email: "david@example.com",
    subscription: "Most Popular",
    txnID: "#12548802",
    joinDate: "Apr 1, 2025",
    status: "Active",
    watch: "1600h",
    LastActivity: "3 hours ago",
  },
  {
    id: 8,
    name: "Olivia Martinez",
    email: "olivia@example.com",
    subscription: "Basic",
    txnID: "#12548803",
    joinDate: "Mar 5, 2025",
    status: "Expired",
    watch: "500h",
    LastActivity: "5 hours ago",
  },
  {
    id: 9,
    name: "James Anderson",
    email: "james@example.com",
    subscription: "Premium",
    txnID: "#12548804",
    joinDate: "Feb 20, 2025",
    status: "Active",
    watch: "1300h",
    LastActivity: "6 hours ago",
  },
  {
    id: 10,
    name: "Charlotte Taylor",
    email: "charlotte@example.com",
    subscription: "Most Popular",
    txnID: "#12548805",
    joinDate: "Jan 30, 2025",
    status: "Expired",
    watch: "700h",
    LastActivity: "12 hours ago",
  },
  {
    id: 11,
    name: "Lucas White",
    email: "lucas@example.com",
    subscription: "Premium",
    txnID: "#12548806",
    joinDate: "Apr 8, 2025",
    status: "Active",
    watch: "1400h",
    LastActivity: "20 min ago",
  },
  {
    id: 12,
    name: "Ava Martinez",
    email: "ava@example.com",
    subscription: "Most Popular",
    txnID: "#12548807",
    joinDate: "Jan 12, 2025",
    status: "Active",
    watch: "1100h",
    LastActivity: "30 min ago",
  },
  {
    id: 13,
    name: "Liam Harris",
    email: "liam@example.com",
    subscription: "Basic",
    txnID: "#12548808",
    joinDate: "Feb 22, 2025",
    status: "Expired",
    watch: "650h",
    LastActivity: "2 hours ago",
  },
  {
    id: 14,
    name: "Mia Robinson",
    email: "mia@example.com",
    subscription: "Premium",
    txnID: "#12548809",
    joinDate: "Mar 15, 2025",
    status: "Active",
    watch: "1350h",
    LastActivity: "5 hours ago",
  },
  {
    id: 15,
    name: "Ethan Carter",
    email: "ethan@example.com",
    subscription: "Basic",
    txnID: "#12548810",
    joinDate: "Jan 18, 2025",
    status: "Active",
    watch: "750h",
    LastActivity: "7 hours ago",
  },
  {
    id: 16,
    name: "Sofia Lee",
    email: "sofia@example.com",
    subscription: "Most Popular",
    txnID: "#12548811",
    joinDate: "Apr 3, 2025",
    status: "Expired",
    watch: "1100h",
    LastActivity: "9 hours ago",
  },
  {
    id: 17,
    name: "Benjamin King",
    email: "benjamin@example.com",
    subscription: "Premium",
    txnID: "#12548812",
    joinDate: "Feb 12, 2025",
    status: "Active",
    watch: "1250h",
    LastActivity: "15 hours ago",
  },
  {
    id: 18,
    name: "Ella Scott",
    email: "ella@example.com",
    subscription: "Basic",
    txnID: "#12548813",
    joinDate: "Mar 25, 2025",
    status: "Expired",
    watch: "700h",
    LastActivity: "2 days ago",
  },
  {
    id: 19,
    name: "Jack Carter",
    email: "jack@example.com",
    subscription: "Most Popular",
    txnID: "#12548814",
    joinDate: "Apr 10, 2025",
    status: "Active",
    watch: "1550h",
    LastActivity: "1 day ago",
  },
  {
    id: 20,
    name: "Amelia Lewis",
    email: "amelia@example.com",
    subscription: "Premium",
    txnID: "#12548815",
    joinDate: "Jan 28, 2025",
    status: "Expired",
    watch: "1600h",
    LastActivity: "3 days ago",
  },
];


const columns: ColumnDef<UserDetail>[] = [
  {
    accessorKey: "id",
    header: "ID",
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
    accessorKey: "subscription",
    header: "Subscription",
    cell: ({ row }) => <span className="">{row.original.subscription}</span>,
  },
  {
    accessorKey: "txnID",
    header: "Transaction ID",
    cell: ({ row }) => <span className="">{row.original.txnID}</span>,
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => <span className="">{row.original.joinDate}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className="">{row.original.status}</span>,
  },
  {
    accessorKey: "watch",
    header: "Watch",
    cell: ({ row }) => <span className="">{row.original.watch}</span>,
  },
  {
    accessorKey: "LastActivity",
    header: "Last Activity",
    cell: ({ row }) => <span className="">{row.original.LastActivity}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <Link  className="bg-primary-color text-white px-[14px] py-[7px] rounded-[2px]" href={`/dashboard/users/${row.original.id}`}>
           Details  
        </Link>
      </div>
    ),
  },
];

export default function UserTable() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = userList.length;
  const paginatedData = userList.slice(
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
