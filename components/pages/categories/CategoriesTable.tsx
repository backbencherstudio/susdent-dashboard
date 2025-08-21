"use client";

import { privateAxios } from "@/components/axiosInstance/axios";
import DeleteIcon from "@/components/icons/DeleteIcon";
import EditIcon from "@/components/icons/EditIcon";
import { DataTable } from "@/components/reusable/data-table";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Delete, Edit, Link, Trash } from "lucide-react";


type Category = {
  created_at: string;
  deleted_at: string | null;
  id: string;
  name: string;
  slug: string;
  status: number;
  updated_at: string;
};

// const fakeCategories: Category[] = [
//   {
//     categoryName: "Action",
//     description: "Movies with a lot of action and stunts",
//     content: 248,
//     status: "Active",
//   },
//   {
//     categoryName: "Comedy",
//     description: "Funny movies to make you laugh",
//     content: 176,
//     status: "Active",
//   },
//   {
//     categoryName: "Drama",
//     description: "Movies with a lot of action and stunts",
//     content: 215,
//     status: "Active",
//   },
// ];

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <span className="">{row.original.name}</span>,
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

const fetchCategoris = async () => {
  const res = await privateAxios.get("/admin/categories/categories");
  return res.data;
};

export default function CategoriesTable() {
  // fetch categories
  const { data:categories, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await privateAxios.get("/admin/categories/categories");
      return response.data.data;
    },
    // queryFn: () => privateAxios.get("/admin/categories/categories")
    
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log("Category", categories);
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
        <DataTable columns={columns} data={categories}>
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
