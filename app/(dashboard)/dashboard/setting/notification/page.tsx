"use client";
import TrashBin from "@/components/icons/TrashBin";
import Tabs from "@/components/pages/setting/Tabs";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import TrashRed from "@/components/icons/TrashRed";
import { useState } from "react";
import { Paginations } from "@/components/reusable/pagination";

interface Notification {
    id: number;
    type: string;
    user: {
        name: string;
        profileImage: string;
        message: string;
        time: string;
    };
}

export default function Notification() {

    // Notification Data
    const notifications: Notification[] = [
        {
            id: 1, 
            type: "Today",
            user: {
                name: "Kathryn Murphy",
                profileImage: "/images/user-profile.svg",
                message: "“User ID 6571: Payment failed, but money deducted from account. Needs urgent help.”",
                time: "3 hours ago"
            }
        },
         {
            id: 2, 
            type: "Today",
            user: {
                name: "Kathryn Murphy",
                profileImage: "/images/user-profile.svg",
                message: "“User ID 6571: Payment failed, but money deducted from account. Needs urgent help.”",
                time: "3 hours ago"
            }
        },
         {
            id: 3, 
            type: "Today",
            user: {
                name: "Kathryn Murphy",
                profileImage: "/images/user-profile.svg",
                message: "“User ID 6571: Payment failed, but money deducted from account. Needs urgent help.”",
                time: "3 hours ago"
            }
        },
         {
            id: 4, 
            type: "Yesterday",
            user: {
                name: "Kathryn Murphy",
                profileImage: "/images/user-profile.svg",
                message: "“User ID 6571: Payment failed, but money deducted from account. Needs urgent help.”",
                time: "3 hours ago"
            }
        },
         {
            id: 5, 
            type: "Yesterday",
            user: {
                name: "Kathryn Murphy",
                profileImage: "/images/user-profile.svg",
                message: "“User ID 6571: Payment failed, but money deducted from account. Needs urgent help.”",
                time: "3 hours ago"
            }
        },
        {
            id: 6, 
            type: "Last Week",
            user: {
                name: "Kathryn Murphy",
                profileImage: "/images/user-profile.svg",
                message: "“User ID 6571: Payment failed, but money deducted from account. Needs urgent help.”",
                time: "3 hours ago"
            }
        },
    ]

    const groupedNotifications = notifications.reduce((groups: { [key: string]: Notification[] }, notification) => {
        const { type } = notification;
        if (!groups[type]) groups[type] = [];
        groups[type].push(notification);
        return groups;
    }, {});


    // Handle delete notification
    const handleDelete = () => {
        return (
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <button className="cursor-pointer h-6 w-6 rounded hover:bg-gray-50 hover:text-black">
                            <TrashBin className="w-5 h-5 hover:fill-current mx-auto" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[315px] sm:max-w-[315px] w-[96%] bg-gray3-bg border-gray3-border notification-dialog">
                        <div className="h-10 w-10 bg-white p-2 rounded flex items-center justify-center mx-auto mb-4">
                            <TrashRed className="w-10 h-10" />
                        </div>
                        <h1 className="text-base font-semibold text-white text-center">Confirm Delete</h1>
                        <p className="text-sm font-normal text-center text-[#A5A5AB]">You want to delete all the marked items, this cant be undone once you delete.</p>
                    <DialogFooter className="justify-center sm:justify-center">
                        <DialogClose asChild>
                        <Button variant="outline" className="py-3 px-4 bg-[#202632] border-transparent text-white font-sm font-medium cursor-pointer  rounded">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className="py-3 px-4 bg-red-bg text-white font-sm font-medium cursor-pointer hover:bg-red-bg rounded">Delete</Button>
                    </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        )
    };
  return (
    <>
     {/* Tabs */}
     <Tabs/>

     {/* Notifications */}
     <div className='bg-secondary-bg p-4 rounded-[8px] mt-4'>

        {Object.keys(groupedNotifications).map((group) => (
            <div key={group}>
                <h1 className="text-base font-medium text-white mb-4">{group}</h1>
                {groupedNotifications[group].map((notification) => (
                    <div
                        key={notification.id}
                        className="py-4 my-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-5 border-b border-[#1F2430]"
                    >
                        <div className="flex items-center gap-6">
                            <input
                                type="checkbox"
                                className="h-4 w-4 accent-primary-color cursor-pointer"
                            />
                            <div className="flex items-center gap-3">
                                <Image
                                    src={notification.user.profileImage}
                                    height={300}
                                    width={300}
                                    alt="User Profile"
                                    className="h-12 w-12 rounded-full"
                                />
                                <div>
                                    <h3 className="text-sm font-medium mb-3">{notification.user.name}</h3>
                                    <p className="text-xs font-normal">{notification.user.message}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end w-full md:w-fit gap-3">
                            <p className="text-xs font-normal whitespace-nowrap">{notification.user.time}</p>
                            { handleDelete() }
                        </div>
                    </div>
                ))}
            </div>
        ))}

     </div>
    </>
  )
}
