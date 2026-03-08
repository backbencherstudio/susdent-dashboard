// SuspendModal.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import toast from "react-hot-toast";

export function SuspendModal({ row, userId }: { row: any,    userId: string }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("00:00");
  const queryClient = useQueryClient();

  const suspendMutation = useMutation({
    mutationFn: (body: { suspend_endTime: string }) =>
      privateAxios.patch(`/admin/user/${userId}/suspend`, body),
    onSuccess: () => {
      toast.success("Creator suspended successfully");
      queryClient.invalidateQueries({ queryKey: ["creators"] });
      setOpen(false);
      setDate("");
      setTime("00:00");
    },
    onError: () => toast.error("Failed to suspend creator"),
  });

  const handleSubmit = () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    // Combine date + time → ISO string
    const suspend_endTime = new Date(`${date}T${time}:00`).toISOString();
    suspendMutation.mutate({ suspend_endTime });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="px-4 py-1.5 rounded bg-[#1C212D] text-[#D4183D] text-xs font-medium hover:bg-opacity-80 transition-all cursor-pointer border border-white/10">
          Suspend
        </button>
      </DialogTrigger>

      <DialogContent className="bg-[#0D121E] border border-white/10 rounded-2xl p-6 max-w-md w-full">
        <DialogTitle className="text-white text-lg font-semibold mb-1">
          Suspend Creator
        </DialogTitle>
        <p className="text-slate-400 text-sm mb-6">
          Set the suspension end date and time for this creator.
        </p>

        <div className="space-y-4">
          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 block">
              End Date
            </label>
            <input
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]} // no past dates
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-white/10 bg-[#131824] text-slate-100 text-sm outline-none focus:border-purple-500 transition-colors [color-scheme:dark]"
            />
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 block">
              End Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-white/10 bg-[#131824] text-slate-100 text-sm outline-none focus:border-purple-500 transition-colors [color-scheme:dark]"
            />
          </div>

          {/* Preview */}
          {date && (
            <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-slate-400">
                Suspend until:{" "}
                <span className="text-white font-medium">
                  {new Date(`${date}T${time}:00`).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setOpen(false)}
            className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-sm font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={suspendMutation.isPending || !date}
            className="flex-1 py-2.5 rounded-lg bg-[#D4183D] hover:bg-[#b91535] disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium transition-colors"
          >
            {suspendMutation.isPending ? "Suspending…" : "Confirm Suspend"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}