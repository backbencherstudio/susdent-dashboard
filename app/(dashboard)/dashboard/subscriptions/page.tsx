"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import SubscriptionTable from "@/components/pages/subscription/SubscriptionTable";
import StatsCard from "@/components/reusable/StatsCard";
import { useQuery } from "@tanstack/react-query";

export default function Subscription() {

  // total subscriber
  const { data: totalSubscriber} = useQuery({
    queryKey: ["totalSubscriber"],
    queryFn: async () =>
    {
       const res = await privateAxios.get("/payments/totalSubscribers");
       return res.data;
    }
  });

  // active subscription
  const { data: totalActiveSubscription } = useQuery({
    queryKey: ["totalActiveSubscription"],
    queryFn: async () =>
    {
       const res = await privateAxios.get("/payments/totalActiveSubscribers");
       return res.data;
    }
  });

  // monthly revenue
  const { data: monthlyRevenue } = useQuery({
    queryKey: ["monthlyRevenue"],
    queryFn: async () =>
    {
       const res = await privateAxios.get("/payments/totalMonthlyRevenue");
       return res.data;
    }
  });

  // average subscription value
  const { data: totalAvgSubValue } = useQuery({
    queryKey: ["totalAvgSubValue"],
    queryFn: async () =>
    {
       const res = await privateAxios.get("/payments/totalAvgSubValue");
       return res.data;
    }
  });


  return (
    <>
    {/* Stats */}
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
       <StatsCard title="Total Subscribers" count={totalSubscriber?.totalSubscribers.toLocaleString()} description="+8.2% from last month"/>
       <StatsCard title="Active Subscriptions" count={totalActiveSubscription?.message} description="82% retention"/>
       <StatsCard title="Monthly Revenue" count={monthlyRevenue?.message} description="+12% growth"/>
       <StatsCard title="Avg. Subscription Value" count={totalAvgSubValue?.message} description="Most popular: Premium"/>
    </section>

    {/* Table */}
    <div className="my-4">
       <SubscriptionTable/>
    </div>
    </>
  )
}
