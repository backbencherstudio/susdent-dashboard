import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { CircleCheck, CircleX, X } from "lucide-react";

export function VideoPreviewModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-purple-500 hover:underline">Open Preview</button>
      </DialogTrigger>
      
      {/* Set max-width to 719px as requested */}
      <DialogContent className="lg:min-w-[719px] lg:max-w-[719px] bg-[#0D121E] border-gray-800 p-0 overflow-hidden outline-none">
        
        {/* Custom Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <DialogTitle className="text-white text-lg font-semibold">
            Preview & Approve Video
          </DialogTitle>
          <DialogClose className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </DialogClose>
        </div>

        <div className="p-6 space-y-6">
          {/* Main Video/Image Banner */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-800">
            <img 
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
              alt="Video Preview" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Video Information */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">What&apos;s My Name? ft. Drake</h2>
            <p className="text-gray-400 text-sm">
              Learn the basics of React Hooks in this comprehensive tutorial
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-4 py-2">
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Creator</p>
              <p className="text-white font-medium">Sarah Johnson</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Category</p>
              <p className="text-white font-medium">Entertainment</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-semibold">Duration</p>
              <p className="text-white font-medium">1 Hour 8 Min</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-800 bg-[#ececec] text-[#D4183D] font-semibold hover:bg-[#252b3a] transition-all">
              <CircleX className="w-5 h-5" />
              Reject
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#7A24BC] text-white font-semibold hover:bg-[#6a1fa3] transition-all shadow-lg shadow-purple-900/20">
              <CircleCheck className="w-5 h-5" />
              Approve
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}