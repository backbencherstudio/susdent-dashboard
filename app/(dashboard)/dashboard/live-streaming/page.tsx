"use client";
import LiveStreamingList from "@/components/pages/live-streaming/LiveStreamingList";
import StatsCard from "@/components/pages/live-streaming/StatsCard";
import Tabs from "@/components/pages/live-streaming/Tabs";



export default function LiveStriming() {
  return (
    <>
    {/* Stats Card */}
    <StatsCard/>

    {/* Tabs */}
    <div className="my-4">
    <Tabs />
    </div>

    {/* Streaming List */}
    <LiveStreamingList/>
    </>
  )
}
