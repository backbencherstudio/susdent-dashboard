import React from "react";
import { CircleCheck, CircleX, PlayCircle } from "lucide-react";
import { VideoPreviewModal } from "./PreviewVideo";

const RequestDetailsPage = () => {
  // Mock data for the specific Request
  const Request = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    plan: "Most Popular",
    category: "Entertainment",
    channelName: "John Doe (Channel Name)",
    bio: "Tell us about yourself and your content...",
    avatar: "https://i.pravatar.cc/150?u=john", // Matches your second image style
  };

  return (
    <div className=" text-white space-y-6">
      <header>
        <h1 className="text-sm font-medium text-gray-400 mb-6">Video Request Details</h1>
      </header>

      {/* Profile Header Card */}
      <div className="bg-[#111723] rounded-xl p-6 flex items-center justify-between border border-gray-800">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-purple-600"></div>
            <img
              src={Request.avatar}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover p-1"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">{Request.name}</h2>
              <span className="bg-[#7A24BC] text-[10px] px-2 py-0.5 rounded text-white font-semibold">
                {Request.plan}
              </span>
            </div>
            <p className="text-sm text-gray-400">Email: <span className="text-gray-200">{Request.email}</span></p>
            <p className="text-sm text-gray-400">Phone Number: <span className="text-gray-200">{Request.phone}</span></p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-[#7A24BC] hover:bg-[#6a1fa3] px-4 py-2 rounded-lg text-sm transition-all">
            <CircleCheck className="w-4 h-4" />
            Approve
          </button>
          <button className="flex items-center gap-2 bg-[#D4183D] hover:bg-[#b81535] px-4 py-2 rounded-lg text-sm transition-all">
            <CircleX className="w-4 h-4" />
            Reject
          </button>
        </div>
      </div>

      {/* Channel & Bio Section */}
      <div className="bg-[#111723] rounded-xl p-6 border border-gray-800 space-y-4">
        <h3 className="text-lg font-semibold italic text-gray-100">
          {Request.channelName}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {Request.bio}
        </p>
      </div>

      {/* Category Section */}
      <div className="bg-[#111723] rounded-xl p-6 border border-gray-800 space-y-4">
        <h3 className="text-lg font-semibold">Content Category *</h3>
        <p className="text-sm text-gray-400">{Request.category}</p>
      </div>

      {/* Sample Video Section */}
      <div className="bg-[#111723] rounded-xl p-6 border border-gray-800 space-y-4">
        <h3 className="text-lg font-semibold">Sample Video :</h3>
        <div className="relative w-24 h-16 rounded overflow-hidden group cursor-pointer border border-gray-700">
          <img 
            src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop" 
            alt="Video Thumbnail" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
            <PlayCircle className="w-8 h-8 text-white opacity-80" />
          </div>

        
        </div>

        <VideoPreviewModal/>
      </div>
    </div>
  );
};

export default RequestDetailsPage;