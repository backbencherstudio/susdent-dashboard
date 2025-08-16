import SubscriptionTable from "@/components/pages/subscription/SubscriptionTable";
import StatsCard from "@/components/reusable/StatsCard";

export default function Subscription() {
  return (
    <>
    {/* Stats */}
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
       <StatsCard title="Total Subscribers" count="12,458" description="+8.2% from last month"/>
       <StatsCard title="Active Subscriptions" count="9,874" description="82% retention"/>
       <StatsCard title="Monthly Revenue" count="$14,250" description="+12% growth"/>
       <StatsCard title="Avg. Subscription Value" count="$14.99" description="Most popular: Premium"/>
    </section>

    {/* Table */}
    <div className="my-4">
       <SubscriptionTable/>
    </div>
    </>
  )
}
