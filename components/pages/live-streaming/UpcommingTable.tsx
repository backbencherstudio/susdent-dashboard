"use client";
import EditIcons from "@/components/icons/EditIcons";
import TrashBin from "@/components/icons/TrashBin";
import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

interface VideoDetail {
  id: number;
  eventTitle: string; 
  scheduledTime: string;
  host: string;
  category: string;
  status: string;
}

const videoDetailsList: VideoDetail[] = [
  {
    id: 1,
    eventTitle: "World Cup Final",
    scheduledTime: "Tomorrow, 3:00 PM",
    host: "Sports Network",
    category: "Sports",
    status: "Upcoming",
  },
  {
    id: 2,
    eventTitle: "Super Bowl 2025",
    scheduledTime: "Sunday, 7:00 PM",
    host: "NFL Network",
    category: "Sports",
    status: "Upcoming",
  },
  {
    id: 3,
    eventTitle: "Oscars 2025",
    scheduledTime: "March 15, 8:00 PM",
    host: "ABC",
    category: "Entertainment",
    status: "Upcoming",
  },
  {
    id: 4,
    eventTitle: "Game of Thrones: Special Reunion",
    scheduledTime: "Tomorrow, 9:00 PM",
    host: "HBO",
    category: "TV Show",
    status: "Upcoming",
  },
  {
    id: 5,
    eventTitle: "2025 Summer Olympics Opening Ceremony",
    scheduledTime: "July 24, 8:00 PM",
    host: "NBC",
    category: "Sports",
    status: "Upcoming",
  },
  {
    id: 6,
    eventTitle: "The Voice Live Show",
    scheduledTime: "Monday, 9:00 PM",
    host: "NBC",
    category: "Music",
    status: "Upcoming",
  },
  {
    id: 7,
    eventTitle: "TechCrunch Disrupt 2025",
    scheduledTime: "September 22, 10:00 AM",
    host: "TechCrunch",
    category: "Tech",
    status: "Upcoming",
  },
  {
    id: 8,
    eventTitle: "Grammy Awards 2025",
    scheduledTime: "February 2, 8:00 PM",
    host: "CBS",
    category: "Music",
    status: "Upcoming",
  },
  {
    id: 9,
    eventTitle: "FIFA Women's World Cup Final",
    scheduledTime: "July 10, 5:00 PM",
    host: "Fox Sports",
    category: "Sports",
    status: "Upcoming",
  },
  {
    id: 10,
    eventTitle: "The Witcher Season 3 Premiere",
    scheduledTime: "December 1, 10:00 PM",
    host: "Netflix",
    category: "TV Show",
    status: "Upcoming",
  },
];


const columns: ColumnDef<VideoDetail>[] = [
  {
    accessorKey: "eventTitle",
    header: "Event Name",
    cell: ({ row }) => <span className="">{row.original.eventTitle}</span>,
  },
  {
    accessorKey: "scheduledTime",
    header: "Scheduled Time",
    cell: ({ row }) => <span className="">{row.original.scheduledTime}</span>,
  },
  {
    accessorKey: "host",
    header: "Host",
    cell: ({ row }) => <span className="">{row.original.host}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span className="">{row.original.category}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className="">{row.original.status}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <button className="cursor-pointer h-6 w-6 hover:bg-[#0000004D] rounded flex items-center justify-center">
            <EditIcons className="w-4 h-4" />
        </button>
        <button className="cursor-pointer h-6 w-6 hover:bg-[#0000004D] rounded flex items-center justify-center">
            <TrashBin className="w-4 h-4" />
        </button>
      </div>
    ),
  },
];

export default function UpcommingTable() {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const total = videoDetailsList.length;
  const paginatedData = videoDetailsList.slice(
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
