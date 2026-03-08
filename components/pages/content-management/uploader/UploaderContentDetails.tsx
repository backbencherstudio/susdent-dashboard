"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import {
  Play, Pause, Volume2, VolumeX, Maximize2, Settings,
  Captions, RotateCcw, CheckCircle2, XCircle, Edit,
  Trash2, Eye, Calendar, Clock, Tag, User, Layers,
  Star, ChevronRight, AlertCircle, Plus,
  
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "next/navigation";
import Link from "next/link";

// ─── Fetch function ──────────────────────────────────────────────────────────
const fetchContentDetail = async (id: string) => {
    const res = await privateAxios.get(`/admin/creator/creator-content/${id}`);
    return res.data;
}


// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    draft:     "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    pending:   "bg-blue-500/15 text-blue-400 border-blue-500/30",
    approved:  "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    rejected:  "bg-red-500/15 text-red-400 border-red-500/30",
    private:   "bg-slate-500/15 text-slate-400 border-slate-500/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${map[status] ?? map.draft}`}>
      {status}
    </span>
  );
}

// ─── Video Player ─────────────────────────────────────────────────────────────
function VideoPlayer({ src, thumbnail }: { src: string; thumbnail: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const [hovered, setHovered] = useState(false);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    playing ? v.pause() : v.play();
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    setProgress((v.currentTime / v.duration) * 100 || 0);
    setCurrentTime(fmt(v.currentTime));
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(fmt(v.duration));
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden bg-black group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={src}
        poster={thumbnail}
        className="w-full aspect-video object-cover"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
        muted={muted}
      />

      {/* Play overlay */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pb-4 pt-10 transition-opacity duration-300 ${hovered || !playing ? "opacity-100" : "opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer group/bar"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-[#8b2fc9] rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/bar:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="text-white hover:text-[#c084fc] transition-colors">
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
            </button>
            <button onClick={() => setMuted(!muted)} className="text-white hover:text-[#c084fc] transition-colors">
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="text-white/70 text-xs font-mono">
              {currentTime} / {duration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-white/60 hover:text-white transition-colors"><Captions className="w-4 h-4" /></button>
            <button
              className="text-white/60 hover:text-white transition-colors"
              onClick={() => videoRef.current?.requestFullscreen()}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button className="text-white/60 hover:text-white transition-colors"><Settings className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Info Row ────────────────────────────────────────────────────────────────
function InfoRow({ label, value, icon: Icon }: { label: string; value: React.ReactNode; icon?: any }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        {Icon && <Icon className="w-3.5 h-3.5" />}
        <span>{label}</span>
      </div>
      <div className="text-sm font-medium text-slate-100 text-right">{value}</div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function VideoDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["content-detail", id],
    queryFn: () => fetchContentDetail(id),
    enabled: !!id,
  });

  const approveMutation = useMutation({
    mutationFn: async () => {
 
      const res = await privateAxios.patch(`/admin/creator/creator-content/${id}/approve`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Content approved!");
      queryClient.invalidateQueries({ queryKey: ["content-detail", id] });
    },
    onError: () => toast.error("Failed to approve content"),
  });

  const rejectMutation = useMutation({
    mutationFn: async () => {
      
      const res = await privateAxios.patch(`/admin/creator/creator-content/${id}/reject`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Content rejected.");
      queryClient.invalidateQueries({ queryKey: ["content-detail", id] });
    },
    onError: () => toast.error("Failed to reject content"),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await privateAxios.delete(`/admin/creator/creator-content/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Content deleted.");
      queryClient.invalidateQueries({ queryKey: ["content-detail", id] });
    },
    onError: () => toast.error("Failed to delete content"),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#8b2fc9] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !data?.content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-slate-400">
        <AlertCircle className="w-10 h-10" />
        <p>Failed to load content details</p>
      </div>
    );
  }

  const c = data.content;
  const reviewStatus = c.status.review_status;

  return (
    <div className="min-h-screen text-white p-6 max-w-[1400px] mx-auto">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
        <Link href="/dashboard/content-management/uploader" className="hover:text-white cursor-pointer transition-colors">Contents  </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-white font-medium">Video Details</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ── Left: Video + Info ── */}
        <div className="xl:col-span-2 space-y-5">

          {/* Video card */}
          <div className="bg-[#0f1623] rounded-2xl border border-white/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Preview &amp; Approve Video
              </h2>
              <div className="flex items-center gap-2">
                <StatusBadge status={c.status.content_status} />
                <StatusBadge status={reviewStatus} />
              </div>
            </div>

            <VideoPlayer
              src={c.media.video_url}
              thumbnail={c.media.thumbnail_url}
            />

            <div className="mt-4">
              <h1 className="text-xl font-bold text-white mb-1">{c.basic.title}</h1>
              <p className="text-slate-400 text-sm leading-relaxed">{c.basic.description}</p>
            </div>
          </div>

          {/* Creator card */}
          <div className="bg-[#0f1623] rounded-2xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Creator Info</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b2fc9] to-[#5b21b6] flex items-center justify-center text-white font-bold text-lg shrink-0">
                {c.creator.channel.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{c.creator.channel.name}</p>
                <p className="text-slate-400 text-sm truncate">{c.creator.created_by.email}</p>
              </div>
              <StatusBadge status={c.creator.channel.status} />
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Views", value: c.stats.view_count.toLocaleString(), icon: Eye },
              { label: "Duration", value: c.media.duration_formatted, icon: Clock },
              { label: "Quality", value: c.basic.quality, icon: Layers },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-[#0f1623] rounded-2xl border border-white/5 p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#8b2fc9]/15 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#c084fc]" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="font-semibold text-white text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Sidebar ── */}
        <div className="space-y-5">

          {/* Details card */}
          <div className="bg-[#0f1623] rounded-2xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Details</h3>
            <InfoRow label="Creator" icon={User} value={c.creator.created_by.name} />
            <InfoRow label="Category" icon={Tag} value={c.basic.category.name} />
            <InfoRow label="Content Type" icon={Layers} value={<span className="capitalize">{c.basic.content_type}</span>} />
            <InfoRow label="Duration" icon={Clock} value={c.media.duration_formatted} />
            <InfoRow label="Status" icon={Eye} value={<StatusBadge status={c.status.content_status} />} />
            <InfoRow label="Premium" icon={Star} value={c.basic.is_premium ? "Yes" : "No"} />
            <InfoRow
              label="Release Date"
              icon={Calendar}
              value={formatDate(c.basic.release_date)}
            />
            <InfoRow
              label="Uploaded"
              icon={Clock}
              value={formatDate(c.timestamps.created_at)}
            />
          </div>

          {/* Action buttons */}
          <div className="bg-[#0f1623] rounded-2xl border border-white/5 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Actions</h3>

            {reviewStatus === "pending" && (
              <>
                <button
                  onClick={() => approveMutation.mutate()}
                  disabled={approveMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 bg-[#8b2fc9] hover:bg-[#7a24bc] disabled:opacity-60 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {approveMutation.isPending ? "Approving…" : "Approve Content"}
                </button>
                <button
                  onClick={() => rejectMutation.mutate()}
                  disabled={rejectMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 disabled:opacity-60 text-red-400 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                >
                  <XCircle className="w-4 h-4" />
                  {rejectMutation.isPending ? "Rejecting…" : "Reject Content"}
                </button>
              </>
            )}

            {reviewStatus === "approved" && (
              <div className="flex items-center justify-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2.5 rounded-lg text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Approved
              </div>
            )}

            {reviewStatus === "rejected" && (
              <div className="flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-lg text-sm font-medium">
                <XCircle className="w-4 h-4" />
                Rejected
              </div>
            )}

            <div className="flex gap-2 pt-1">
              {/* <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-4 py-2.5 rounded-lg text-sm font-medium transition-all">
                <Edit className="w-3.5 h-3.5" />
                Edit
              </button> */}
              <button className="flex-1 flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 text-red-400 px-4 py-2.5 rounded-lg text-sm font-medium transition-all">
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          </div>

          {/* Thumbnail preview */}
          <div className="bg-[#0f1623] rounded-2xl border border-white/5 p-5">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Thumbnail Preview</h3>
            <div className="flex gap-3">
              <div className="w-16 h-16 rounded-lg border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center cursor-pointer hover:border-[#8b2fc9]/50 transition-colors">
                <Plus className="w-5 h-5 text-slate-500" />
              </div>
              {c.media.thumbnail_url && (
                <div className="w-16 h-16 rounded-lg overflow-hidden ring-2 ring-[#8b2fc9]/50">
                  <img
                    src={c.media.thumbnail_url}
                    alt="Thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Review info */}
          {(c.review.reviewed_by || c.review.note) && (
            <div className="bg-[#0f1623] rounded-2xl border border-white/5 p-5">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Review</h3>
              {c.review.reviewed_by && (
                <InfoRow label="Reviewed By" icon={User} value={c.review.reviewed_by} />
              )}
              {c.review.reviewed_at && (
                <InfoRow label="Reviewed At" icon={Calendar} value={formatDate(c.review.reviewed_at)} />
              )}
              {c.review.note && (
                <div className="mt-2 p-3 bg-white/5 rounded-lg text-sm text-slate-400">
                  {c.review.note}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}