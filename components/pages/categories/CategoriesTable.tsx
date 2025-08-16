"use client";

import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { DataTable } from "@/components/reusable/data-table";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { Delete, Edit, Link, Trash } from "lucide-react";
import React from "react";
type Category = {
  categoryName: string;
  description: string;
  content: number;
  status: string;
};

const fakeCategories: Category[] = [
  {
    categoryName: "Action",
    description: "Movies with a lot of action and stunts",
    content: 248,
    status: "Active",
  },
  {
    categoryName: "Comedy",
    description: "Funny movies to make you laugh",
    content: 176,
    status: "Active",
  },
  {
    categoryName: "Drama",
    description: "Movies with a lot of action and stunts",
    content: 215,
    status: "Active",
  },
];

export default function CategoriesTable() {
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: "categoryName",
      header: "Category Name",
      cell: ({ row }) => <span className="">{row.original.categoryName}</span>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <span className="">{row.original.description}</span>,
    },
    {
      accessorKey: "content",
      header: "Content",
      cell: ({ row }) => <span className="">{row.original.content}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <span className="">{row.original.status}</span>,
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <span className="">
          <div className="flex gap-2">
            <EditIcon className=" cursor-pointer" />
            <DeleteIcon className=" cursor-pointer" />
          </div>
        </span>
      ),
    },
  ];
  return (
    <div>
      {/* categories title */}
      <div className="flex items-center  justify-between mb-4">
        <h2 className="text-lg font-medium leading-[160%] text-white mb-4">
          Categories Management
        </h2>

        
        <div className="flex justify-center items-center gap-2.5 [background:var(--Primary-color,#7A24BC)] px-5 py-2.5 rounded-lg cursor-pointer">
            + Add category
        </div>
        
        </div>

      {/* all categorties table */}
      <div>
        <DataTable columns={columns} data={fakeCategories}>
          <div className="">
            <h2 className="self-stretch text-[color:var(--W,#FFF)]  text-lg font-medium leading-[160%] mb-[18px]">
              All Categories
            </h2>

            <Input
              className="flex justify-between items-center flex-[1_0_0] rounded border border-[color:var(--Line-Color,#1B202C)] px-4 py-[9px] border-solid mb-6"
              placeholder="Search categories..."
              type="text"
            />
          </div>
        </DataTable>
      </div>
    </div>
  );
}
