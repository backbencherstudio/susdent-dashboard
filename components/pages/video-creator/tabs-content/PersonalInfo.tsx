import React from 'react';


// Types for better type safety
interface UserData {
  username: string;
  email: string;
  isVerified: boolean;
  phone: string;
  dob: string;
  gender: string;
  country: string;
  lastLogin: string;
  lastLoginIp: string;
  passwordChanged: string;
  language: string;
  preferences: string;
  notifications: string;
  autoplay: boolean;
}

const PersonalInfo: React.FC = () => {
  // Data derived from image details
  const data: UserData = {
    username: "johndoe",
    email: "john.doe@example.com",
    isVerified: true,
    phone: "+1 (555) 123-4567",
    dob: "15 June 1985",
    gender: "Male",
    country: "United States",
    lastLogin: "Today, 10:45 AM",
    lastLoginIp: "192.168.1.45",
    passwordChanged: "1 month ago",
    language: "English (US)",
    preferences: "Action, Sci-Fi, Drama",
    notifications: "Email & Push",
    autoplay: true
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">

      {/* Basic Information Section */}
      <div className="bg-[#111723] rounded-xl border border-gray-800/50 p-4 space-y-4">
        <h3 className="text-white text-base font-medium leading-[160%]">Basic Information</h3>
        <hr className='border-t  border-gray-600/50' />
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-wrap gap-6">
            <InfoField label="Username" value={data.username} />

            <div className="flex flex-wrap items-center gap-1  ">
              <span className="text-sm leading-[100%] text-[#A5A5AB]">Email:</span>
              <span className="text-sm font-medium leading-[100%] text-white">{data.email}</span>
              <span className="text-[#2ECC71] [font-family:Inter] text-[8px] font-normal leading-[100%] mt-1">Verified</span>
            </div>

            <InfoField label="Phone Number" value={data.phone} />
          </div>
          <div className="flex flex-wrap gap-6">
            <InfoField label="Date of Birth" value={data.dob} />
            <InfoField label="Gender" value={data.gender} />
            <InfoField label="Country" value={data.country} />
          </div>
        </div>
      </div>

      {/* Account Security Section */}
      <div className="bg-[#111723] rounded-xl border border-gray-800/50 p-4 space-y-4">
        <h3 className="text-white text-base font-medium leading-[160%]">Account Security</h3>
        <hr className='border-t  border-gray-600/50' />
        <div className="flex flex-wrap gap-6">
          <InfoField label="Last Login" value={data.lastLogin} />
          <InfoField label="Last Login IP" value={data.lastLoginIp} />
          <InfoField label="Password Last Changed" value={data.passwordChanged} />
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-[#111723] rounded-xl border border-gray-800/50 p-4 space-y-4">
        <h3 className="text-white text-base font-medium leading-[160%]">Preferences</h3>
        <hr className='border-t  border-gray-600/50' />
        <div className="flex flex-wrap gap-6">
          <InfoField label="Language" value={data.language} />
          <InfoField label="Content Preferences" value={data.preferences} />
          <InfoField label="Notification Settings" value={data.notifications} />
          <InfoField label="Auto-play" value={data.autoplay ? "Enabled" : "Disabled"} />
        </div>
      </div>



    </div>
  );
};


// Helper component for uniform field styling
const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex flex-wrap  gap-1 ">
    <span className="text-sm leading-[100%] text-[#A5A5AB]">{label}:</span>
    <span className="text-sm font-medium leading-[100%] text-white">{value}</span>
  </div>
);

export default PersonalInfo;