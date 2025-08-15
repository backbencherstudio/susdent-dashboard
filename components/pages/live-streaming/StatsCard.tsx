import React from "react";

interface StatCard {
  title: string;
  count: string | number;
  description?: string;
}

export default function StatsCard() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Active Streams" count="8" description="+2 from yesterday"/>
      <StatCard title="Current Viewers" count="3,421" description="Peak: 5,200"/>
      <StatCard title="Avg. Watch Time" count="32 min" description="Engagement: 68%"/>
      <StatCard title="Scheduled Events" count="5" description="Next: Movie Premiere"/>
    </section>
  );
}

const StatCard = ({ title, count, description }: StatCard) => {
  return (
    <div className="flex flex-col items-start gap-4 flex-[1_0_0] border border-[color:var(--Line-Color,#1B202C)] [background:linear-gradient(180deg,rgba(0,0,0,0.10)_0%,rgba(122,36,188,0.10)_100%)] p-4 rounded-lg border-solid">
      <div className="flex justify-between items-center self-stretch">
        <div className="space-y-4">
          <div className="text-[color:var(--W,#FFF)] text-[13px] font-normal leading-[160%]">
            {title}
          </div>
          <div className="self-stretch text-[color:var(--Neutral-Colors-100,#FFF)]  text-[28px] font-semibold leading-[130%] tracking-[0.14px]">
            {count}
          </div>
          <p className="text-xs font-normal">{description}</p>
        </div>
      </div>
    </div>
  );
};
