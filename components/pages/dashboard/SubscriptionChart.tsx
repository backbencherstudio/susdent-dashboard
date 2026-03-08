"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex items-center justify-center gap-6 mt-2">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-slate-400">
            {entry.value === "newSubscribers"
              ? "New Subscribers"
              : "Cancellations"}
          </span>
        </div>
      ))}
    </div>
  );
};

export function SubscriptionGrowthChart() {
  const { data } = useQuery({
    queryKey: ["subscriptionGrowthData"],
    queryFn: async () => {
      const res = await privateAxios.get(
        "/admin/dashboard/subscription-growth"
      );
      return res.data?.subscription_growth_last_week ?? [];
    },
  });

  // transform API data for recharts
  const chartData =
    data?.map((item: any) => ({
      day: new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short",
      }),
      newSubscribers: item.new_subscribers,
      cancellations: item.cancellations,
    })) ?? [];


    console.log(chartData ?? "no data");
  return (
    <div className="bg-[#131824] rounded-lg p-4 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">
          Subscription Growth
        </h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-slate-800 gap-2"
            >
              Last week
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-slate-800 border-slate-700">
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
              Last week
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
              Last month
            </DropdownMenuItem>
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
              Last quarter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 0,
              right: 10,
              left: 0,
              bottom: 0,
            }}
            barCategoryGap="28%"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />

            <Legend content={<CustomLegend />} />

            <Bar
              dataKey="newSubscribers"
              fill="#7A24BC"
              radius={[10, 10, 0, 0]}
              maxBarSize={40}
            />

            <Bar
              dataKey="cancellations"
              fill="#1814F3"
              radius={[10, 10, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}