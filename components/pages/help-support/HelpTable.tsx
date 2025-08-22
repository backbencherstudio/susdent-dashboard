"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import { DataTable } from "@/components/reusable/data-table";
import convertDate from "@/hooks/convertDate";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { toast } from "sonner";

interface UserDetail {
  id: number;
  user_id: string;
  subject: string;
  description: string;
  created_at: string;
  updated_at: string;
  status: string;
}

export default function HelpTable() {

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
    accessorKey: "user_id",
    header: "User ID",
    cell: ({ row }) => <span className="">{row.original.user_id}</span>,
  },
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => <span className="">{row.original.subject}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <span className="">{row.original.description}</span>,
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => <span className="">
      {
        convertDate(row.original.created_at)
      }
      </span>,
  },
   {
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => <span className="">
      {
        convertDate(row.original.updated_at)
      }
      </span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      {
        return (
        row.original.status =="Open" ? 
        <span className="">{row.original.status}</span> : 
        <span className="text-[#2ECC71]">{row.original.status}</span>
        )
      }
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <button onClick={() => handleStatus(row.original.id)} className="cursor-pointer bg-primary-color text-white px-[14px] py-[7px] rounded-[2px]">
           Update Status  
        </button>
      </div>
    ),
  },
  ];

  // get data
  const {data: userData, error,isLoading, refetch } = useQuery({
    queryKey: ['userData'],
    queryFn: async () =>
    {
      const res = await privateAxios.get("/support/tickets");
      return res.data.tickets;
    }
  })

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const total = userData?.length;
  const paginatedData = userData?.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

   //Handle Status
  const handleStatus = async (id: number) => {

    try {
      const response = await privateAxios.patch(`/support/tickets/${id}`); 
      if(response.data)
      {
        toast.success(response.data.message, {
          position: "top-right",
          style: {
            backgroundColor: "#4CAF50", 
            color: "#fff", 
          },
        });
       refetch();
      }
    } catch (errorData: any) {
       toast.error("Status updated failed", {
        position: "top-right",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
        },
      });
    }

  }

  if (isLoading) return null;
  if (error) return null;

  return (
    <div>
      {/* filter */}
      {/* table */}
  
      <div className="bg-[#131824]">
        <div className="px-8 py-4">
          <h1 className="text-base font-medium">Help & Support</h1>
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
