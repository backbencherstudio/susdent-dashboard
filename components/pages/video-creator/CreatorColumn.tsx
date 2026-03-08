// columns.ts
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { CreatorManagement } from "./CreatorTable";
import { SuspendModal } from "./SuspendModal";

type ColumnActions = {
  onSuspend: (id: string) => void;
  isSuspending: boolean;
};

export const getCreatorColumns = (
  { onSuspend, isSuspending }: ColumnActions
): ColumnDef<CreatorManagement>[] => [
    {
      accessorKey: "id",
      header: "Creator ID",
      cell: ({ row }) => (
        <span className="text-gray-400 text-xs font-mono">
          {row.original.id.slice(0, 8)}…
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <span>{row.original.name ?? "N/A"}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.email ?? "N/A"}</span>,
    },
    {
      accessorKey: "role_details.creator_channel.name",
      header: "Channel Name",
      cell: ({ row }) => <span>{row.original.role_details?.creator_channel?.name ?? "N/A"}</span>,
    },
    {
      accessorKey: "subscriptions.creator.service.plan",
      header: "Plan",
      cell: ({ row }) => <span>{row.original.subscriptions.creator?.service?.plan ?? "N/A"}</span>,
    },
    {
      accessorKey: "subscriptions.creator.service.price",
      header: "Price",
      cell: ({ row }) => <span>{row.original.subscriptions.creator?.service?.price ?? "N/A"}</span>,
    },

    {
      accessorKey: "subscriptions.creator.status",
      header: "Status",
      cell: ({ row }) => <span className={ row.original?.status === "suspended" ? "text-[#e70d0d] capitalize" : "text-[#10b981] capitalize"}>{row.original?.status ?? "N/A"}</span>,
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const isActive = row.original.subscriptions.creator?.status === "active";
        return (
          <div className="flex items-center gap-2">
            {/* <button
            onClick={() => onSuspend(row.original.id)}
            disabled={isSuspending || !isActive}
            className="px-4 py-1.5 rounded bg-[#1C212D] text-[#D4183D] text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isSuspending ? "..." : "Suspend"}
          </button> */}

            <SuspendModal row={row} userId={row.original.id} />

            <Link href={`./video-creator/${row.original.id}`}>
              Details
            </Link>
          </div>
        );
      },
    },
  ];