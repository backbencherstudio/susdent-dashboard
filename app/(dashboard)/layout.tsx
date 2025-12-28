import React, { ReactNode } from "react";
import ClientLayout from "./ClientLayout";
import PrivateRoute from "@/components/private/private";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>
    <ClientLayout>{children}</ClientLayout>
  </>
 
  ;
}
