"use client";
import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

interface VideoDetail {
  id: number;
  thumbnail: string; // Added field for the thumbnail
  title: string;
  genre: string;
  category: string;
  type: string;
  duration: string;
  status: string;
  uploaded: string;
  views: string;
}

const videoDetailsList: VideoDetail[] = [
  {
    id: 1,
    thumbnail: "thumbnail_url_1",
    title: "Close Encounters of the Third Kind",
    genre: "Action",
    category: "Web series",
    type: "HD",
    duration: "2h 28m",
    status: "Published",
    uploaded: "20-04-25",
    views: "12M",
  },
  {
    id: 2,
    thumbnail: "thumbnail_url_2",
    title: "Lord of the Rings: The Return of the Kings",
    genre: "Comedy",
    category: "Movie",
    type: "4K",
    duration: "3h 32m",
    status: "Live",
    uploaded: "16-04-25",
    views: "12M",
  },
  {
    id: 3,
    thumbnail: "thumbnail_url_3",
    title: "Lord of the Rings: The Fellowship of the Ring",
    genre: "Drama",
    category: "Short film",
    type: "Trailer",
    duration: "2h 50m",
    status: "Draft",
    uploaded: "20-04-25",
    views: "12M",
  },
  {
    id: 4,
    thumbnail: "thumbnail_url_4", // Add the actual thumbnail URL
    title: "Close Encounters of the Third Kind",
    genre: "Action",
    category: "Movie",
    type: "Trailer",
    duration: "2h 28m",
    status: "Published",
    uploaded: "20-04-25",
    views: "12M",
  },
  {
    id: 5,
    thumbnail: "thumbnail_url_5", // Add the actual thumbnail URL
    title: "Lord of the Rings: The Fellowship of the Ring",
    genre: "Comedy",
    category: "Web series",
    type: "Trailer",
    duration: "2h 50m",
    status: "Draft",
    uploaded: "20-04-25",
    views: "12M",
  },
  {
    id: 6,
    thumbnail: "thumbnail_url_6", // Add the actual thumbnail URL
    title: "Close Encounters of the Third Kind",
    genre: "Drama",
    category: "Short film",
    type: "HD",
    duration: "2h 28m",
    status: "Published",
    uploaded: "20-04-25",
    views: "12M",
  },
  {
    id: 7,
    thumbnail: "thumbnail_url_7", // Add the actual thumbnail URL
    title: "Lord of the Rings: The Return of the Kings",
    genre: "Action",
    category: "Web series",
    type: "Trailer",
    duration: "3h 32m",
    status: "Live",
    uploaded: "16-04-25",
    views: "12M",
  },
];

const columns: ColumnDef<VideoDetail>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => (
      <img
        src={row.original.thumbnail}
        alt="Thumbnail"
        className="thumbnail-class"
      />
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <span className="">{row.original.title}</span>,
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ row }) => <span className="">{row.original.genre}</span>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <span className="">{row.original.category}</span>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <span className="">{row.original.type}</span>,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => <span className="">{row.original.duration}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className="">{row.original.status}</span>,
  },
  {
    accessorKey: "uploaded",
    header: "Uploaded",
    cell: ({ row }) => <span className="">{row.original.uploaded}</span>,
  },
  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => <span className="">{row.original.views}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    ),
  },
];

export default function ContentTable() {
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
