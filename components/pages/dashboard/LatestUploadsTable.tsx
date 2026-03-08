import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

interface LatestUpload {
  id: string;
  type: string;
  title: string;
  upload_date: string;
  duration_seconds: number | null;
  duration_formatted: string | null;
  views: number;
}

const columns: ColumnDef<LatestUpload>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="text-white">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <span className="capitalize text-gray-300">{row.original.type}</span>
    ),
  },
  {
    accessorKey: "upload_date",
    header: "Upload Date",
    cell: ({ row }) => {
      const date = new Date(row.original.upload_date);
      return (
        <span className="text-gray-300">
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "duration_formatted",
    header: "Duration",
    cell: ({ row }) => (
      <span className="text-gray-300">
        {row.original.duration_formatted ?? "-"}
      </span>
    ),
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => (
      <span className="text-gray-300">
        {row.original.views.toLocaleString()}
      </span>
    ),
  },
];

export default function LatestUploadsTable({
  data,
}: {
  data: LatestUpload[];
}) {
  return (
    <div className="rounded-lg mt-4">
      <DataTable columns={columns} data={data.slice(0, 4) ?? []}>
        <div className="flex items-center justify-between">
          <h2 className="text-white text-base font-medium leading-[160%]">
            Latest Uploads
          </h2>

          <button className="text-white text-xs font-medium cursor-pointer">
            View All
          </button>
        </div>
      </DataTable>
    </div>
  );
}