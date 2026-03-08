"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";
import { DataTable } from "@/components/reusable/data-table";
import Link from "next/link";
import { getCreatorColumns } from "./CreatorColumn";
    
// ─── Types ────────────────────────────────────────────────────────────────────
interface CreatorChannel {
  id: string;
  name: string;
  slug: string;
  status: string;
  avatar: string | null;
  banner: string | null;
}

interface CreatorService {
  id: string;
  name: string;
  plan: string;
  price: number;
  currency: string;
  videos_per_month: number | null;
}

interface CreatorSubscription {
  id: string;
  status: string;
  plan: string;
  payment_method: string;
  transaction_id: string;
  start_date: string;
  end_date: string;
  renewal_date: string;
  service: CreatorService;
}

interface LastPayment {
  id: string;
  status: string;
  provider: string;
  price: string;
  currency: string;
  paid_amount: string;
  paid_currency: string;
  kind: string;
  created_at: string;
}

interface Flags {
  is_deleted: boolean;
  has_creator_channel: boolean;
  has_active_viewer_subscription: boolean;
  has_active_creator_subscription: boolean;
}

export interface CreatorManagement {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: string;
  role: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  role_details: {
    creator_channel: CreatorChannel;
  };
  subscriptions: {
    viewer: null;
    creator: CreatorSubscription | null; // can be null if no subscription
  };
  last_payment: LastPayment | null;
  flags: Flags;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function formatPrice(price: number | string | null | undefined, currency?: string) {
  if (price == null) return "—";
  const amount = typeof price === "string" ? parseFloat(price) : price;
  return `$${(amount / 100).toFixed(2)}`; // stripe stores in cents
}

function PlanBadge({ plan }: { plan: string | null | undefined }) {
  if (!plan) return <span className="text-gray-500 text-xs">—</span>;
  const labels: Record<string, string> = {
    most_popular: "Most Popular",
    basic: "Basic",
    family: "Family",
  };
  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-[#1C212D] text-purple-400 capitalize">
      {labels[plan] ?? plan}
    </span>
  );
}

function StatusBadge({ status }: { status: string | null | undefined }) {
  if (!status) return <span className="text-gray-500 text-xs">—</span>;
  const map: Record<string, string> = {
    active:    "text-emerald-400 bg-emerald-400/10",
    suspended: "text-red-400 bg-red-400/10",
    pending:   "text-yellow-400 bg-yellow-400/10",
    approved:  "text-emerald-400 bg-emerald-400/10",
    rejected:  "text-red-400 bg-red-400/10",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${map[status] ?? "text-gray-400 bg-gray-400/10"}`}>
      {status}
    </span>
  );
}



// ─── Component ────────────────────────────────────────────────────────────────
export default function CreatorTable({
  data,
  isLoading,
  error,
  onSuspend,
  isSuspending,

}: {
  data: CreatorManagement[] | undefined;
  isLoading: boolean;
  error: Error | null;
  onSuspend: (id: string) => void;
  isSuspending: boolean;
}) {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const total = data?.length ?? 0;
  const paginatedData = data?.slice((page - 1) * pageSize, page * pageSize) ?? [];

  const columns = useMemo(
    () => getCreatorColumns({ onSuspend: onSuspend, isSuspending: isSuspending }),
    [onSuspend, isSuspending]  // only rebuilds when these change
  );


  if (isLoading) return (
    <div className="flex items-center justify-center h-40">
      <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-40 text-red-400 text-sm">
      Failed to load creators
    </div>
  );

  return (
    <div className="w-full bg-[#0D121E] rounded-lg overflow-hidden">
      <DataTable
        columns={columns}
        data={paginatedData}
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={setPage}
      />
    </div>
  );
}