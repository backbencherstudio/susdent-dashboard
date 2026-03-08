import React, { ReactNode } from "react";
import ClientLayout from "./ClientLayout";
import PrivateRoute from "@/components/private/private";
import toast, { Toaster } from 'react-hot-toast';


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (


    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <PrivateRoute>
        <ClientLayout>{children}</ClientLayout>
      </PrivateRoute>
    </>
  );
}
