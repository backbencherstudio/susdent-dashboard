import React from "react";
import StatsCard from "./StatsCard";
import UsersTable from "./UsersTable";

export default function DashboardContent() {
  return (
    <div className="space-y-4">
      <StatsCard />
      <UsersTable/>
      
    </div>
  );
}
