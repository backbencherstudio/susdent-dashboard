import React from "react";
import StatsCard from "./StatsCard";
import UsersTable from "./UsersTable";
import { RevenueChart } from "./TotalRevenueChart";
import { SubscriptionGrowthChart } from "./SubscriptionChart";
import LatestUploadsTable from "./LatestUploadsTable";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";



export default function DashboardContent() {

  const { data, isLoading, error } = useQuery({
    queryKey: ["totalUploaders"],
    queryFn: async () => {
      const res = await privateAxios.get("/admin/dashboard/overview");
      return res;
    },
  });

  // console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <StatsCard data={data?.data?.cards} />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[63%]">
          <RevenueChart />
        </div>
        <div className="w-full md:w-[37%]">
          <SubscriptionGrowthChart/>
          <LatestUploadsTable data={data?.data?.latest_uploads} />
        </div>
      </div>

      <UsersTable />
    </div>
  );
}
