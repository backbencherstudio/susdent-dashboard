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
import { privateAxios } from "@/components/axiosInstance/axios";
import { useQuery } from "@tanstack/react-query";
import DeleteContent from "./DeleteContent";

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

interface Category {
  id: string;
  name: string;
}

interface Content {
  id: string;
  title: string;
  genre: string;
  category: Category;
  type: string;
  file_size_bytes: string;
  status: string;
  category_id: string;
  content_status: string;
  created_at: string;
  view_count: number;
  video: string;
  thumbnail: string;
}

const columns: ColumnDef<Content>[] = [
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => (
      <img
        src={row.original.thumbnail}
        alt="Thumbnail"
        className="rounded-sm w-[57px] h-10 object-cover"
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
    cell: ({ row }) => <span className="">{row.original.category.name}</span>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <span className="">{row.original.type}</span>,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <span className="">{row.original.status}</span>,
  },

  {
    accessorKey: "views",
    header: "Views",
    cell: ({ row }) => <span className="">{row.original.view_count}</span>,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <DeleteContent categoryId={row.original.id} />
        <button>
          <EditIcon />
        </button>
      </div>
    ),
  },
];

// fetch content
const fetchContent = async () => {
  const res = await privateAxios.get("/contents/allContents");
  return res.data;
};

export default function ContentTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["contents"],
    queryFn: fetchContent,
  });

  // console.log(data);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const total = data?.length;
  const paginatedData = data?.slice((page - 1) * pageSize, page * pageSize);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>error</p>;

  return (
    <>
      {/* filter */}
      <div className="mb-4 flex gap-4">
        <Select>
          <SelectTrigger className="flex items-center gap-2 rounded border border-[color:var(--Gray-Black-50,#E9E9EA)] bg-[#0D121E] px-5 py-2.5 border-solid ">
            <SelectValue
              className=" [font-family:Inter] text-sm font-normal leading-[100%]"
              placeholder="Genre"
            />
          </SelectTrigger>
          <SelectContent className="border border-[color:var(--Line-Color,#1B202C)] bg-[#0D121E] rounded min-w-[106px]  max-w-[106px]">
            <SelectGroup className="space-y-2 w-24">
              <SelectItem className="selectOption" value="action">
                Action
              </SelectItem>
              <SelectItem className="selectOption" value="comedy">
                Comedy
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* 2nd */}
        <Select>
          <SelectTrigger className="rounded px-5">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="border border-[color:var(--Line-Color,#1B202C)] [background:#0D121E] rounded">
            <SelectGroup className="space-y-2">
              <SelectItem className="selectOption" value="action">
                Action
              </SelectItem>
              <SelectItem className="selectOption" value="comedy">
                Comedy
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* 3rd */}
        <Select>
          <SelectTrigger className="rounded px-5 text-center">
            <SelectValue className="text-center" placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="border border-[color:var(--Line-Color,#1B202C)] [background:#0D121E] rounded min-w-25">
            <SelectGroup className="space-y-2">
              <SelectItem className="selectOption" value="published">
                Published
              </SelectItem>
              <SelectItem className="selectOption" value="live">
                Live
              </SelectItem>
              <SelectItem className="selectOption" value="draft">
                Draft
              </SelectItem>
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
