"use client";
import StatsCard from "@/components/pages/live-streaming/StatsCard";
import Tabs from "@/components/pages/live-streaming/Tabs";
import UpcommingTable from "@/components/pages/live-streaming/UpcommingTable";

export default function Upcomming() {
  return (
    <>
        {/* Stats Card */}
        <StatsCard/>

        {/* Tabs */}
        <div className="my-4">
        <Tabs />
        </div>

        {/* Upcomming Table */}
        <UpcommingTable/>
        
    </>
  )
}
