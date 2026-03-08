"use client";
import { privateAxios } from "@/components/axiosInstance/axios";
import SubscriptionTable from "@/components/pages/subscription/SubscriptionTable";
import CustomSelect from "@/components/reusable/CustomSelect";
import { STATUS_OPTIONS, PLAN_OPTIONS, PAYMENT_OPTIONS } from "@/components/pages/subscription/constants";

import StatsCard from "@/components/reusable/StatsCard";
import { useQuery } from "@tanstack/react-query";

export default function Subscription() {


  const { data: subscriptionStats } = useQuery({
    queryKey: ["totalSubscriber"],
    queryFn: async () => {
      const res = await privateAxios.get("/payments/subscriptions/stats?kind=all");
      return res.data.cards;
    },
  });

  // console.log(subscriptionStats);

  return (
    <>
      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Subscribers"
          count={subscriptionStats?.total_subscribers.value.toFixed() ?? 0}
          description="+8.2% from last month"
        />
        <StatsCard
          title="Active Subscriptions"
          count={subscriptionStats?.active_subscriptions.value.toFixed() ?? 0}
          description="82% retention"
        />
        <StatsCard
          title="Monthly Revenue"
          count={subscriptionStats?.monthly_revenue.value.toFixed() ?? 0}
          description="+12% growth"
        />
        <StatsCard
          title="Avg. Subscription Value"
          count={subscriptionStats?.avg_subscription_value.value.toFixed() ?? 0}
          description="Most popular: Premium"
        />
      </section>

      {/* Table */}
      <div className="my-4">
        <div className="flex gap-4 mb-4">
          {/* 1. Status Dropdown */}
          <CustomSelect
            options={STATUS_OPTIONS}
            placeholder="Status"
            className="w-[107px]"
          // defaultValue="active"
          />

          {/* 2. Plan Dropdown */}
          <CustomSelect
            options={PLAN_OPTIONS}
            placeholder="Select Plan"
            className="w-[160px]"
          // defaultValue="family"
          />

          {/* 3. Payment Method Dropdown */}
          <CustomSelect
            options={PAYMENT_OPTIONS}
            placeholder="Payment Method"
            className="w-[180px]"
          // defaultValue="stripe"
          />
        </div>
        <SubscriptionTable />
      </div>
    </>
  );
}

