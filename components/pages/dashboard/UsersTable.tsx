import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

interface LocationItem {
  id: number;
  state: string;
  city: string;
  country: string;
}

// Sample data matching your image
const locationData: LocationItem[] = [
  {
    id: 1,
    state: "New York",
    city: "Coney Island",
    country: "United States of America",
  },
  {
    id: 2,
    state: "New Mexico",
    city: "Truth or Consequences",
    country: "United States of America",
  },
  {
    id: 3,
    state: "New York",
    city: "East Hampton",
    country: "United States of America",
  },
  {
    id: 4,
    state: "New Mexico",
    city: "Silver City",
    country: "United States of America",
  },
  {
    id: 5,
    state: "New Jersey",
    city: "South Orange Village",
    country: "United States of America",
  },
  {
    id: 6,
    state: "Massachusetts",
    city: "Great Barrington",
    country: "United States of America",
  },
  {
    id: 7,
    state: "California",
    city: "Beverly Hills",
    country: "United States of America",
  },
];

const handleDeleteLocation = (id: number) => {
  console.log("Deleting location with id:", id);
  // Add your actual delete logic here (API call, etc.)
};

// Table columns
const columns: ColumnDef<LocationItem>[] = [
  {
    accessorKey: "state",
    header: "State",
    cell: ({ row }) => <span className="">{row.original.state}</span>,
  },
  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => <span className="">{row.original.city}</span>,
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <span className="">{row.original.country}</span>,
  },
  {
    id: "action",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-4">
        <>Delete</>
        {/* <EditLocationModal item={row.original} id={row.original.id} />

        <DeleteModal
          item={row.original}
          onDelete={handleDeleteLocation}
          id={row.original.id}
        /> */}
      </div>
    ),
  },
];

export default function UsersTable() {
  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const total = locationData.length;
  const paginatedData = locationData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  return (
    <div>
      <div>
        <DataTable
          tableTitle="Locations Manangement"
          data={paginatedData}
          columns={columns}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
          //   addDataButton={<AddLocationModal />}
        />
      </div>
    </div>
  );
}
