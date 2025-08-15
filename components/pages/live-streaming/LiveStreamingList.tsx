"use client";

import EyeIcon from "@/components/icons/EyeIcon";
import { Paginations } from "@/components/reusable/pagination";
import Image from "next/image";
import { useState } from "react";

// Formate Number
function formatNumber(num: any): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'm';  
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';   
  } else {
    return num.toString();
  }
}

interface LiveStramList {
  id: number;
  views: number;
  isLive: boolean;
  thumbnail: string; 
  name: string;
  profileImage: string;
  followers: string;
}

const liveStramList: LiveStramList[] = [
  {
    id: 1,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-1.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-1.png",
    followers: "12k Followers",
  },
  {
    id: 2,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-2.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-2.png",
    followers: "12k Followers",
  },
  {
    id: 3,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-1.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-1.png",
    followers: "12k Followers",
  },
  {
    id: 4,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-2.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-2.png",
    followers: "12k Followers",
  },
  {
    id: 5,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-1.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-1.png",
    followers: "12k Followers",
  },
  {
    id: 6,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-2.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-2.png",
    followers: "12k Followers",
  },
  {
    id: 7,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-1.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-1.png",
    followers: "12k Followers",
  },
  {
    id: 8,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-2.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-2.png",
    followers: "12k Followers",
  },
  {
    id: 9,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-1.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-1.png",
    followers: "12k Followers",
  },
  {
    id: 10,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-2.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-2.png",
    followers: "12k Followers",
  },
  {
    id: 11,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-1.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-1.png",
    followers: "12k Followers",
  },
  {
    id: 12,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-2.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-2.png",
    followers: "12k Followers",
  },
    {
    id: 13,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-1.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-1.png",
    followers: "12k Followers",
  },
  {
    id: 14,
    views: 100000,
    isLive: true,
    thumbnail: "/images/streamer-2.png",
    name: "Lorri Warf",
    profileImage: "/images/streamer-profile-2.png",
    followers: "12k Followers",
  },


];


export default function LiveStreamingList() {
  const [page, setPage] = useState(1);
  const pageSize = 12; // Number of items per page
  const total = liveStramList.length;
  const paginatedData = liveStramList.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {/* streamer profile  */}
      {
        paginatedData.map((stream) => (
          <div key={stream.id}>
            {/* top */}
            <div className="relative">
              <Image src={stream.thumbnail} height={400} width={400} alt="Thumbnail" className="w-full object-cover object-top rounded" />
              {/* Views */}
              <div className="absolute top-2 left-2 bg-[#0000004D] text-white text-xs font-medium px-2 py-1 rounded flex items-center gap-1">
                <EyeIcon className="w-4 h-4"/>
                <p>{formatNumber(stream.views)}</p>
              </div>
              {/* Live */}
              {
                stream.isLive &&  (<div className="absolute top-2 right-2 bg-[#0000004D] rounded flex  gap-1 items-center px-2 py-1 text-white text-xs font-medium ">
                  <div className="bg-[#FB4A59] h-2 w-2 rounded-full"></div>
                  <p>Live</p>
                </div>)
              }
            </div>
            {/* bottom */}
            <div className="flex items-center gap-2 mt-3">
              <div>
                <Image src={stream.profileImage} height={300} width={300} alt="Profile Image" className="w-12 h-12 rounded-full object-cover" />
              </div>
              <div>
                <h2 className="text-base font-medium">{stream.name}</h2>
                <p className="text-sm font-normal text-[#FFFFFF99]">{stream.followers}</p>
              </div>
            </div>
          </div>
        ))
      }
    </div>
    
    <div className="flex justify-end">
      <div className="my-6">
          <Paginations
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={setPage}
          />
      </div>
    </div>

    </>
  )
}
