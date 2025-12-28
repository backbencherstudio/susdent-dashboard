import React from "react";
import {
  Edit2,
  Ban,
  User,
  Calendar,
  Video,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import CreatorInfoTabs from "./CreatorInfoTabs";

const VideoCreatorDetails = () => {
  const creator = {
    name: "John Doe",
    id: "78945",
    joined: "15 Mar 2023",
    totalVideos: 142,
    totalEarnings: "$3142",
    plan: "Most Popular",
    avatar: "https://i.pravatar.cc/150?u=john",
    username: "johndoe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dob: "15 June 1985",
    gender: "Male",
    country: "United States",
  };

  return (
    <div className="min-h-screen bg-[#0D121E] text-white p-8 space-y-4">
      <header>
        <h1 className="text-sm font-medium text-gray-400 mb-6">
          Video creator Details
        </h1>
      </header>

      {/* Profile Header with Stats */}
      <div className="bg-[#111723] rounded-xl p-8 border border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="relative w-31 h-31">
            <div className="absolute inset-0 rounded-full border-2 border-purple-600"></div>
            <img
              src={creator.avatar}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover p-1"
            />
          </div>

          <div className="space-y-4">
            <div className="flex  flex-col gap-4">
              <h2 className="text-2xl font-bold">{creator.name}</h2>

              <div className="flex gap-6">
                <span className="text-emerald-500 text-xs font-medium flex items-center gap-1">
                  Active
                </span>
                <span className="bg-[#7A24BC] text-[10px] px-2 py-0.5 rounded text-white font-semibold">
                  {creator.plan}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" /> Creator ID:{" "}
                <span className="text-white">{creator.id}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Joined:{" "}
                <span className="text-white">{creator.joined}</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4" /> Total Videos:{" "}
                <span className="text-white">{creator.totalVideos}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" /> Total Earnings:{" "}
                <span className="text-white">{creator.totalEarnings}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 self-start">
          <button className="flex items-center gap-2 bg-[#1C212D] border border-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-all">
            <Edit2 className="w-4 h-4" /> Edit
          </button>
          <button className="flex items-center gap-2 bg-[#1C212D] border border-gray-700 text-[#D4183D] px-4 py-2 rounded-lg text-sm hover:bg-red-950/20 transition-all">
            <Ban className="w-4 h-4" /> Suspend
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <CreatorInfoTabs />
    </div>
  );
};

export default VideoCreatorDetails;
