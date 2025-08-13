"use client";
import TrashBin from "@/components/icons/TrashBin";
import Tabs from "@/components/pages/setting/Tabs";
import Image from "next/image";

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
        
        
    ]

  return (
    <>
     {/* Tabs */}
     <Tabs/>

     {/* Notifications */}
     <div className='bg-secondary-bg p-4 rounded-[8px] mt-4'>
        <h1 className="text-base font-medium text-white mb-4">Today</h1>
        {
           notifications.map((notification) => (
           <>
            <div key={notification.id} className="py-4 my-4 flex items-center justify-between gap-5 border-b border-[#1F2430]">
                <div className="flex items-center gap-6">
                    <input type="checkbox" className="h-4 w-4 accent-primary-color cursor-pointer" name="" id="" />
                    <div className="flex items-center gap-3">
                        <Image src={notification.user.profileImage} height={300} width={300} className="h-12 w-12 rounded-full" alt="User Profile"/>
                        <div>
                            <h3 className="text-sm font-medium mb-3">{notification.user.name}</h3>
                            <p className="text-xs font-normal">{notification.user.message}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <p className="text-xs font-normal">{notification.user.time}</p>
                    <button className="cursor-pointer h-6 w-6 rounded hover:bg-gray-50 hover:text-black">
                        <TrashBin className="w-5 h-5 hover:fill-current" />
                    </button>
                </div>
            </div>
            </>
           ))
        }
       

     </div>
    </>
  )
}
