"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import logo from "@/public/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Importing Lucide Icons
import {
  Menu,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/icons/SearchIcon";
import BellIcon from "@/components/icons/BellIcon";
import Dashboard from "@/components/icons/Dashboard";
import Content from "@/components/icons/Content";
import Categories from "@/components/icons/Categories";
import Users from "@/components/icons/Users";
import Subscription from "@/components/icons/Subscription";
import Streaming from "@/components/icons/Streaming";
import Setting from "@/components/icons/Setting";
import Logout from "@/components/icons/Logout";
import TrashBin from "@/components/icons/TrashBin";
import { useAuth } from "@/provider/AuthProvider";

// Menu and Bottom items
const menuItems = [
  { 
    href: "/dashboard", 
    icon: <Dashboard className="w-[18px] h-[18px]"/>,
    label: "Dashboard" },
  {
    href: "/dashboard/content-management",
    icon: <Content className="w-[18px] h-[18px]"/>,
    label: "Content Management",
  },
  {
    href: "/dashboard/categories",
    icon: <Categories className="w-[18px] h-[18px]"/>,
    label: "Categories",
  },
  {
    href: "/dashboard/users",
    icon: <Users className="w-[18px] h-[18px]"/>,
    label: "Users",
  },
  {
    href: "/dashboard/subscriptions",
    icon: <Subscription className="w-[18px] h-[18px]"/>,
    label: "Subscription",
  },
  /* {
    href: "/dashboard/live-streaming",
    icon: <Streaming className="w-[18px] h-[18px]"/>,
    label: "Live Streaming",
  }, */
  {
    href: "/dashboard/setting",
    icon: <Setting className="w-[18px] h-[18px]"/>,
    label: "Setting",
  },
];

const bottomMenu = [
  {
    href: "/logout",
    icon: <Logout className="w-[18px] h-[18px]"/>,
    label: "Log out",
  },
];

interface NotificationData {
  id: number,
  image: string,
  name: string,
  time: string
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const {logout} = useAuth();

  const pathname = usePathname();

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

  // Notification Data
  const notificationData: NotificationData[] = [
    {
      id: 1,
      image: "/images/user-profile.svg",
      name: "Darrell Steward",
      time: "30 mn ago",
    },
     {
      id: 2,
      image: "/images/user-profile.svg",
      name: "Darrell Steward",
      time: "30 mn ago",
    },
     {
      id: 3,
      image: "/images/user-profile.svg",
      name: "Darrell Steward",
      time: "30 mn ago",
    }
  ]


  // Toggle the notification modal
  const toggleNotification = (event: any) => {
    event.stopPropagation();
    setNotificationOpen((prev) => !prev);
  };


  const TopBar = () => {
    return (
      <div className="lg:p-4 flex items-center justify-between">
        <div className="font-semibold text-2xl hidden lg:block">{"Welcome, Admin"}</div>

        <div className="flex items-center ">
          <div className="relative mr-8 hidden sm:block">
            <Input
              className="flex w-auto lg:w-[330px] justify-between items-center border border-[color:var(--Line-Color,#1B202C)] px-4 py-[9px] rounded-lg border-solid h-[44px] shadow-none outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              placeholder="Search"
            />
            <SearchIcon className="absolute bottom-[12.5px] right-4" />
          </div>
          <div className="mr-4 relative">
            <div className="flex w-12 h-12 items-center gap-2.5 bg-[#7A24BC33] justify-center rounded-3xl cursor-pointer" onClick={toggleNotification}>
              <BellIcon/>
            </div>

            <div>
            {/* Notification Modal */}
            {
              notificationOpen && (
                <div className="absolute top-[115%] -right-18 sm:right-0 w-[300px] sm:w-[400px] bg-gray3-border border border-[#1F2430] rounded-sm">
                  {/* Top */}
                  <div className="flex justify-between gap-2 p-4 border-b border-[#1F2430]">
                    <h1 className="text-base font-semibold">Notification</h1>
                    <p><span className="py-[7px] px-3 rounded-[2px] bg-[#7A24BC1F] text-xs font-medium">5 Unread</span></p>
                  </div>
                  {/* Middle */}
                  <div>
                    {
                      notificationData.map((notification) =>  {
                        return (
                          <div key={notification.id} className="p-4 flex items-center justify-between border-b border-[#1F2430]">
                            <div className="flex items-center gap-2">
                              <Image src={notification.image} height={300} width={300} alt="Profile" className="h-12 w-12 rounded-full" />
                              <div>
                                <h1 className="text-sm font-medium">{notification.name}</h1>
                                <p className="text-xs mt-1">{notification.time}</p>
                              </div>
                            </div>
                            <button className="cursor-pointer">
                              <TrashBin/>
                            </button>
                          </div>
                        )
                      })
                    }
                  </div>
                  {/* Bottom */}
                  <div className="p-4">
                    <Link href='/dashboard/setting/notification' className="bg-primary-color text-sm font-medium py-3 px-3 rounded w-full block text-center">View All Notifications</Link>
                  </div>
                </div>
              )
            }
            </div>
          
          </div>

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
        </div>
      </div>
    );
  };


  // Handle Logout
  const handleLogout = () => {
    logout();
  }

  return (
    <div className="flex  min-h-screen bg-[#0D121E] text-white">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-30 h-screen w-64 transform bg-[#131824]  transition-transform duration-300 ease-in-out text-white ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center py-8 pl-12">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-full"
            />
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="mt-4 px-4">
          {menuItems.map((item, index) => {
            const isActive = (() => {
              if (item.href === "/dashboard") {
                return pathname === "/dashboard";
              }
              return pathname.startsWith(item.href);
            })();
            return (
              <div className="mb-2" key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center text-base font-medium px-4 py-3 rounded-md gap-1 ${
                    isActive
                      ? "bg-[#7A24BC] primary-text font-medium"
                      : "text-[#A5A5AB] hover:bg-[#7A24BC]/50"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Bottom menu */}
        <div className="absolute bottom-0 w-full">
          {bottomMenu.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <div className="px-2 py-1" key={index}>
                <button
                  onClick={handleLogout}
                  className={`cursor-pointer w-full flex items-center text-base font-medium px-4 py-3 rounded-md gap-1 ${
                    isActive
                      ? "bg-[#7A24BC] primary-text font-medium"
                      : "text-[#A5A5AB] hover:bg-[#7A24BC]/50"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </div>
            );
          })}

          {/* <div className="flex items-center p-4">
            <div className="flex-shrink-0">
              <Image
                className="w-10 h-10 rounded-full"
                src={user?.data?.avatar_url || "/images/profile.png"}
                width={40}
                height={40}
                alt="User"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.data?.name}</p>
              <p className="text-xs text-gray-500">{user?.data?.email}</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto lg:ml-64 ">
        <div className="p-4 lg:hidden flex justify-between">
          <button
            onClick={toggleSidebar}
            className="text-main focus:outline-none"
          ><Menu /></button>

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
