"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FileText, ChevronDown, ChevronUp } from "lucide-react";
import logo from "@/public/logo.svg";

import Dashboard from "@/components/icons/Dashboard";
import Content from "@/components/icons/Content";
import Categories from "@/components/icons/Categories";
import Users from "@/components/icons/Users";
import Subscription from "@/components/icons/Subscription";
import Setting from "@/components/icons/Setting";
import Logout from "@/components/icons/Logout";
import VideoCreatorIcon from "@/components/icons/VideoCreatorIcon";
import LiveIcon from "@/components/icons/LiveIcon";
import { useAuth } from "@/provider/AuthProvider";

const menuItems = [
    {
        href: "/dashboard",
        icon: <Dashboard className="w-[18px] h-[18px]" />,
        label: "Dashboard",
    },
    {
        href: "/dashboard/content-management",
        icon: <Content className="w-[18px] h-[18px]" />,
        label: "Content Management",
    },
    {
        href: "/dashboard/categories",
        icon: <Categories className="w-[18px] h-[18px]" />,
        label: "Categories",
    },
    {
        href: "/dashboard/users",
        icon: <Users className="w-[18px] h-[18px]" />,
        label: "Users",
    },
    {
        href: "/dashboard/subscriptions",
        icon: <Subscription className="w-[18px] h-[18px]" />,
        label: "Subscriptions",
        subItems: [
            {
                href: "/dashboard/subscriptions/viewer",
                label: "Viewer",
            },
            {
                href: "/dashboard/subscriptions/uploader",
                label: "Uploader",
            },
        ],
    },

    {
        href: "/dashboard/permission-requests",
        icon: <FileText className="w-[18px] h-[18px]" />,
        label: "Permission Requests",
    },
    {
        href: "/dashboard/video-creator",
        icon: <VideoCreatorIcon className="w-[18px] h-[18px]" />,
        label: "Video Creator",
    },
    {
        href: "/dashboard/live-streaming",
        icon: <LiveIcon className="w-[18px] h-[18px]" />,
        label: "Live Streaming",
    },
    {
        href: "/dashboard/setting",
        icon: <Setting className="w-[18px] h-[18px]" />,
        label: "Setting",
    },
];

const bottomMenu = [
    {
        href: "/logout",
        icon: <Logout className="w-[18px] h-[18px]" />,
        label: "Log out",
    },
];

interface SideBarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function SideBar({ sidebarOpen, setSidebarOpen }: SideBarProps) {
    const pathname = usePathname();
    const { logout } = useAuth();
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

    const toggleSubmenu = (label: string) => {
        setExpandedMenu((prev) => (prev === label ? null : label));
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div
            className={`fixed z-30 h-screen w-64 transform bg-[#131824]  transition-transform duration-300 ease-in-out text-white ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
        >
            {/* Logo */}
            <div className="flex items-center py-8 pl-12">
                <Link href="/dashboard">
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

                    // @ts-ignore
                    const hasSubItems = item.subItems && item.subItems.length > 0;
                    const isExpanded = expandedMenu === item.label;

                    return (
                        <div className="mb-2 " key={index}>
                            {hasSubItems ? (
                                <div>
                                    <button
                                        onClick={() => toggleSubmenu(item.label)}
                                        className={`w-full flex items-center justify-between text-base font-medium px-4 py-3 rounded-md transition-colors ${isActive || isExpanded
                                            ? "bg-[#7A24BC] text-white"
                                            : "text-[#A5A5AB] hover:bg-[#7A24BC]/50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-1">
                                            {item.icon}
                                            {item.label}
                                        </div>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {isExpanded && (
                                        <div className="mt-1 ml-4 space-y-1">
                                            {/* @ts-ignore */}
                                            {item.subItems.map((subItem: any, subIndex: number) => {
                                                const isSubActive = pathname === subItem.href;
                                                return (
                                                    <Link
                                                        key={subIndex}
                                                        href={subItem.href}
                                                        onClick={() => setSidebarOpen(false)}
                                                        className={`block px-4 py-2 text-sm rounded-md transition-colors ${isSubActive
                                                            ? "text-[#7A24BC] font-medium"
                                                            : "text-[#A5A5AB] hover:text-white"
                                                            }`}
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center text-base font-medium px-4 py-3 rounded-md gap-1  ${isActive
                                        ? "bg-[#7A24BC] primary-text font-medium"
                                        : "text-[#A5A5AB] hover:bg-[#7A24BC]/50"
                                        }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            )}
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
                                onClick={() => {
                                    handleLogout();
                                    setSidebarOpen(false);
                                }}
                                className={`cursor-pointer w-full flex items-center text-base font-medium px-4 py-3 rounded-md gap-1 ${isActive
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
            </div>
        </div>
    );
}
