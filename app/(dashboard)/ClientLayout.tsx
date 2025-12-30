"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SideBar from "@/components/layout/SideBar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Importing Lucide Icons
import { Menu, MessageCircleQuestionMark } from "lucide-react";

import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/icons/SearchIcon";
import BellIcon from "@/components/icons/BellIcon";

import Logout from "@/components/icons/Logout";
import { useAuth } from "@/provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import useGetDifference from "@/hooks/useGetDifference";


export default function ClientLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const { logout, isNotification } = useAuth();

  // Fake user data (since we're not fetching real data)
  const user = {
    data: {
      avatar_url: "/images/user-profile.svg",
      name: "John Doe",
      email: "john.doe@example.com",
    },
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Last 4 Notification
  const {
    isLoading,
    error,
    data: notificationData = [],
  } = useQuery({
    queryKey: ["notificationData"],
    queryFn: async () => {
      const res = await privateAxios.get("/users/getAllNotifications");
      return res.data.data;
    },
  });

  const [page, setPage] = useState(1);
  const pageSize = 4; // Number of items per page
  const lastFourNotifications = notificationData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Don't block rendering while notifications load — show layout immediately.
  // Notifications will render when `notificationData` becomes available.

  // Toggle the notification modal
  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
  };

  // Handle Logout
  const handleLogout = () => {
    logout();
  };

  const TopBar = () => {
    return (
      <div className="lg:p-4 flex items-center justify-between">
        <div className="font-semibold text-2xl hidden lg:block">
          {"Welcome, Admin"}
        </div>

        <div className="flex items-center ">
          <div className="relative mr-8 hidden sm:block">
            <Input
              className="flex w-auto lg:w-[330px] justify-between items-center border border-[color:var(--Line-Color,#1B202C)] px-4 py-[9px] rounded-lg border-solid h-[44px] shadow-none outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              placeholder="Search"
            />
            <SearchIcon className="absolute bottom-[12.5px] right-4" />
          </div>
          <div className="mr-4 relative">
            {/* Notification */}
            <DropdownMenu>
              <DropdownMenuTrigger className="shadow-none outline-0 cursor-pointer">
                <div className="relative flex w-12 h-12 items-center gap-2.5 bg-[#7A24BC33] justify-center rounded-3xl cursor-pointer">
                  <BellIcon />
                  {isNotification && (
                    <div className="absolute top-3 right-3 h-[8px] w-[8px] rounded-full bg-red-600"></div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-gray3-bg border-gray3-border text-white mr-2 sm:mr-14"
                style={{ width: "300px" }}
              >
                {/* Top */}
                <div className="flex justify-between gap-2 p-4 border-b border-[#1F2430]">
                  <h1 className="text-base font-semibold">Notification</h1>
                </div>
                {/* Middle */}
                <div>
                  {lastFourNotifications.map((notification: any) => {
                    return (
                      <div
                        key={notification.id}
                        className="p-4 flex items-center justify-between border-b border-[#1F2430]"
                      >
                        <div className="flex flex-col gap-1">
                          <h1 className="text-sm font-medium">
                            {notification.text}
                          </h1>
                          <p className="text-xs mt-1">
                            {useGetDifference(notification.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Bottom */}
                <div className="p-4">
                  <Link
                    href="/dashboard/setting/notification"
                    className="bg-primary-color text-sm font-medium py-3 px-3 rounded w-full block text-center"
                  >
                    View All Notifications
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="shadow-none outline-0 cursor-pointer">
              <div>
                <div className="flex-shrink-0 rounded-full">
                  <Image
                    className="w-12 h-12 rounded-full"
                    src={user?.data?.avatar_url || "/images/user-profile.svg"}
                    width={48}
                    height={48}
                    alt="User"
                  />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-fit bg-gray3-bg border-gray3-border text-white mr-4">
              <DropdownMenuLabel
                className="flex items-center justify-center gap-1 cursor-pointer"
                onClick={handleLogout}
              >
                <Logout className="w-[18px] h-[18px]" />
                <span>Log Out</span>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };

  return (
    <div className="flex  min-h-screen bg-[#0D121E] text-white">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto lg:ml-64 ">
        <div className="p-4 lg:hidden flex justify-between">
          <button
            onClick={toggleSidebar}
            className="text-main focus:outline-none"
          >
            <Menu />
          </button>

          <div className="lg:hidden">
            <TopBar />
          </div>
        </div>
        <div className="hidden lg:block mx-4 px-0 border-b border-[#1B202C]">
          <TopBar />
        </div>
        <div className="p-4 ">{children}</div>
      </div>
    </div>
  );
}
