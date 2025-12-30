import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { CircleCheck, CircleX, X } from "lucide-react";

export function VideoPreviewModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-[#7A24BC] hover:underline font-medium">Open Preview</button>
      </DialogTrigger>

      {/* Set max-width to 719px as requested */}
      <DialogContent className="lg:min-w-[700px] lg:max-w-[700px] bg-white border-0 p-0 overflow-hidden outline-none shadow-xl sm:rounded-3xl">

        {/* Custom Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <DialogTitle className="text-[#0F172A] text-lg font-bold">
            Preview & Approve Video
          </DialogTitle>
          {/* DialogClose is not rendered by default in some shadcn versions if pure content, but here we use custom close */}
          {/* <DialogClose className="text-gray-500 hover:text-black transition-colors outline-none cursor-pointer">
            <X className="w-5 h-5" />
          </DialogClose> */}
        </div>

        <div className="p-6 space-y-6">
          {/* Main Video/Image Banner */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mt-2">
            <img
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop"
              alt="Video Preview"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Video Information */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#0F172A]">What&apos;s My Name? ft. Drake</h2>
            <p className="text-[#64748B] text-sm">
              Learn the basics of React Hooks in this comprehensive tutorial
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-8 py-2">
            <div className="space-y-1">
              <p className="text-sm text-[#64748B]">Creator</p>
              <p className="text-[#0F172A] font-semibold">Sarah Johnson</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[#64748B]">Category</p>
              <p className="text-[#0F172A] font-semibold">Entertainment</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-[#64748B]">Duration</p>
              <p className="text-[#0F172A] font-semibold">1 Hour 8 Min</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#F9FAFB] text-[#EF4444] font-semibold hover:bg-[#FEE2E2] transition-colors cursor-pointer">
              <CircleX className="w-5 h-5" />
              Reject
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#7A24BC] text-white font-semibold hover:bg-[#6a1fa3] transition-colors shadow-lg shadow-purple-900/20 cursor-pointer">
              <CircleCheck className="w-5 h-5" />
              Approve
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}