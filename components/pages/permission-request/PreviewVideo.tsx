
"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleCheck, CircleX } from "lucide-react";

export function VideoPreviewModal({
  sampleVideoLink,
  title,
  description,
  creator,
  category,
  duration,
  onApprove,
  onReject,
  isPendingApprove,
  isPendingReject,
}: {
  sampleVideoLink: string;
  title?: string;
  description?: string;
  creator?: string;
  category?: string;
  duration?: string;
  onApprove?: () => void;
  onReject?: () => void;
  isPendingApprove?: boolean;
  isPendingReject?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-[#7A24BC] hover:underline font-medium">
          Open Preview
        </button>
      </DialogTrigger>

      <DialogContent className="lg:min-w-[700px] lg:max-w-[700px] bg-white border-0 p-0 overflow-hidden outline-none shadow-xl sm:rounded-3xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <DialogTitle className="text-[#0F172A] text-lg font-bold">
            Preview &amp; Approve Video
          </DialogTitle>
        </div>

        <div className="p-6 space-y-5">
          {/* Video */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black">
            <video
              src={sampleVideoLink}
              className="w-full h-full object-cover"
              controls
              controlsList="nodownload"
            />
          </div>

          {/* Title + Description */}
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#0F172A]">
              {title ?? "Untitled Video"}
            </h2>
            {description && (
              <p className="text-[#64748B] text-sm leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-3 gap-6 py-1">
            <div className="space-y-1">
              <p className="text-xs text-[#64748B] uppercase tracking-wide">Creator</p>
              <p className="text-[#0F172A] font-semibold text-sm">
                {creator ?? "—"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-[#64748B] uppercase tracking-wide">Category</p>
              <p className="text-[#0F172A] font-semibold text-sm">
                {category ?? "—"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-[#64748B] uppercase tracking-wide">Duration</p>
              <p className="text-[#0F172A] font-semibold text-sm">
                {duration ?? "—"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-1">
            <button
              onClick={onReject}
              disabled={isPendingReject || isPendingApprove}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#F9FAFB] text-[#EF4444] font-semibold hover:bg-[#FEE2E2] disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <CircleX className="w-5 h-5" />
              {isPendingReject ? "Rejecting…" : "Reject"}
            </button>
            <button
              onClick={onApprove}
              disabled={isPendingApprove || isPendingReject}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#7A24BC] text-white font-semibold hover:bg-[#6a1fa3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-purple-900/20 cursor-pointer"
            >
              <CircleCheck className="w-5 h-5" />
              {isPendingApprove ? "Approving…" : "Approve"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}