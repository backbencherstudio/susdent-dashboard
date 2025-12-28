"use client";
import { useState } from "react";

export default function CreatorInfoTabs() {
  // 1. Track the active tab using state
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Personal Info", content: <PersonalInfo /> },
    { name: "Security Settings", content: <SecuritySettings /> },
    { name: "Billings", content: <Billings /> },
    { name: "Notifications", content: <Notifications /> },
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex items-center gap-4  overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`py-[10px] px-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 -mb -[2px] ${
              activeTab === index
                ? "border-b-2 border-primary-color text-white"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 rounded-lg shadow-sm">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

// Simple placeholder components for clarity
const PersonalInfo = () => <div>Name: John Doe <br /> Email: john@example.com</div>;
const SecuritySettings = () => <div>Password and 2FA settings go here.</div>;
const Billings = () => <div>Your billing history and invoices.</div>;
const Notifications = () => <div>Manage your email and push alerts.</div>;