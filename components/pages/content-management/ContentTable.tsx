"use client";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <button>
          <EditIcon />
        </button>
        <button>
          <DeleteIcon />
        </button>
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
    <>
      {/* filter */}
      <div className="mb-4 flex gap-4">
        <Select>
          <SelectTrigger className="flex items-center gap-2 rounded border border-[color:var(--Gray-Black-50,#E9E9EA)] [background:#0D121E] px-5 py-2.5 border-solid ">
            <SelectValue
              className="text-white [font-family:Inter] text-sm font-normal leading-[100%]"
              placeholder="Genre"
            />
          </SelectTrigger>
          <SelectContent className="border border-[color:var(--Line-Color,#1B202C)] [background:#0D121E] p-3 border-solid text-white [font-family:Inter] text-sm font-normal leading-[100%]">
            <SelectGroup className="space-y-2">
              {/* <SelectLabel>Fruits</SelectLabel> */}
              <SelectItem className="selectOption" value="action">
                Action
              </SelectItem>
              <SelectItem className="selectOption" value="comedy">
                Comedy
              </SelectItem>
              <SelectItem className="selectOption" value="drama">
                Drama
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* 2nd */}
        <Select>
          <SelectTrigger className="rounded">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent className="border border-[color:var(--Line-Color,#1B202C)] [background:#0D121E] rounded">
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem  className="selectOption" value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

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
    </>
  );
}
