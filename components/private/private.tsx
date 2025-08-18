"use client";

import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // console.log("From private",user);

  useEffect(() => {
    if (isLoading) return; // Wait for auth check to finish
    console.log(user);
    if (!user) {
      console.log("User not found");
      router.replace("/auth");
    }
    else if(user?.role !== "admin") {
      console.log("role not matched");
      router.replace("/auth"); // Or another fallback route
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (user?.role !== "admin") {
    return null; // Or a message/component for unauthorized access
  }

  return <>{children}</>;
};

export default PrivateRoute;