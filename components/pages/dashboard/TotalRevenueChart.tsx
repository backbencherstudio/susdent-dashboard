"use client"

import { Area, AreaChart, XAxis, YAxis, ResponsiveContainer, Dot } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, TrendingUp } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { privateAxios } from "@/components/axiosInstance/axios"
import { useState } from "react";
import CustomSelect from "@/components/reusable/CustomSelect"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(280, 100%, 70%)",
  },
} satisfies ChartConfig

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props

  if (payload && payload.month === "Jun") {
    return (
      <Dot
        cx={cx}
        cy={cy}
        r={6}
        fill="hsl(280, 100%, 70%)"
        stroke="hsl(280, 100%, 70%)"
        strokeWidth={2}
      />
    )
  }

  return null
}


const currentYear = new Date().getFullYear();

const yearOptions = Array.from({ length: 4 }, (_, i) => {
  const y = currentYear - i;
  return { label: y.toString(), value: y.toString() };
});

export function RevenueChart() {


  const [year, setYear] = useState<string>("2026");
  const { data, isLoading } = useQuery({
    queryKey: ["revenueChart", year],
    queryFn: async () => {
      const res = await privateAxios.get(
        `/admin/dashboard/revenue?period=yearly&year=${year}`
      );
      return res.data;
    },
  });

  const chartData =
    data?.graph_data?.points?.map((item: any) => ({
      month: item.label,
      revenue: item.revenue,
    })) || []

  const totalRevenue = data?.totals?.revenue ?? 0

  return (
    <Card className="w-full bg-[#131824] border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8">

        {/* Left Section */}
        <div className="space-y-2">
          <CardTitle className="text-2xl font-normal text-slate-200">
            Total revenue
          </CardTitle>

          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-white">
              ${totalRevenue.toLocaleString()}
            </span>

            <div className="flex items-center gap-1 text-emerald-400">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+28.4%</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Legend */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[hsl(280,100%,70%)]" />
              <span className="text-sm text-slate-400">Revenue</span>
            </div>
          </div>

          {/* Date Range */}
          {/* <Button
            variant="outline"
            className="bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50"
          >
            <Calendar className="h-4 w-4 mr-2" />
            {data?.period?.year ?? "Year"}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button> */}

          <CustomSelect
            options={yearOptions}
            defaultValue={year}
            placeholder="Select Year"
            onValueChange={(value: string) => setYear(value)}
            className="w-[140px]"
          />

        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6">

        {isLoading ? (
          <div className="h-[400px] flex items-center justify-center text-slate-400">
            Loading chart...
          </div>
        ) : (

          <ChartContainer config={chartConfig}>
            <ResponsiveContainer width="100%" height={400}>

              <AreaChart
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                  top: 12,
                  bottom: 12,
                }}
              >

                <defs>
                  <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(280,100%,70%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(280,100%,70%)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(215, 25%, 50%)", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(215, 25%, 50%)", fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                  domain={[0, "dataMax"]}
                />

                <ChartTooltip />

                <Area
                  dataKey="revenue"
                  type="monotone"
                  fill="url(#fillRevenue)"
                  fillOpacity={1}
                  stroke="hsl(280,100%,70%)"
                  strokeWidth={2}
                  // dot={<CustomDot />}
                />

              </AreaChart>

            </ResponsiveContainer>
          </ChartContainer>

        )}
      </CardContent>
    </Card>
  )
}