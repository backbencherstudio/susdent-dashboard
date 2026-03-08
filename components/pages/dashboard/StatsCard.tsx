import DollerCircleIcon from "@/components/icons/DollerCircleIcon";
import RevenueIcon from "@/components/icons/RevenueIcon";
import { User } from "lucide-react";
import React from "react";

interface StatCard {
  icon: React.ReactNode;
  title: string;
  count: string | number | React.ReactNode;
}

export default function StatsCard({ data }: { data: any }) {
  // console.log(data ?? "no data");
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={<User />} title="Total Users" count={data?.total_users} />
      <StatCard icon={<User />} title="Active Subscriptions" count={data?.active_subscriptions} />
      {/* <StatCard icon={<User />} title="Active Creator Subscriptions" count={data?.active_creator_subscriptions} /> */}
      <StatCard icon={<RevenueIcon />} title="Revenue This Month" count={data?.revenue_this_month} />

      <StatCard icon={<DollerCircleIcon />} title="Top viewed Movie" count={<p className="text-white text-[24px] font-semibold leading-[160%]">{data?.top_viewed_movie?.title}</p>} />
    </section>
  );
}

const StatCard = ({ icon, title, count }: StatCard) => {
  return (
    <div className="relative p-6 rounded-2xl border border-[#1B202C] bg-gradient-to-br from-[#020617] via-[#0B1023] to-[#1A1036] flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-white">{icon}</div>
          <p className="text-gray-300 text-[16px]">{title}</p>
        </div>

        {/* Three dots */}
        <button className="text-gray-400 text-xl leading-none">•••</button>
      </div>

      {/* Count */}
      <div className="text-white text-[48px] font-semibold tracking-wide">
        {count}
      </div>
    </div>
  );
};
