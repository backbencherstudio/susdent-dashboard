import React from 'react';

const CurrentPlan: React.FC = () => {
    return (
        <div className="bg-[#111723] rounded-xl border border-gray-800/50 p-4 space-y-4 animate-in fade-in duration-500">
            <h3 className="text-white text-base font-medium leading-[160%]">Current Plan</h3>
            <hr className='border-t  border-gray-600/50' />
            <div className="flex flex-wrap gap-6">
                <div className="flex flex-wrap gap-6">
                    <InfoField label="Plan Name" value="Most Popular" />
                    <InfoField label="Price" value="$14.99/month" />
                    <InfoField label="Billing Cycle" value="Monthly" />
                    <InfoField label="Start Date" value="12 Nov 2023" />
                </div>
                <div className="flex flex-wrap gap-6">
                    <InfoField label="Plan Expiry" value="12 Dec 2025" />
                    <InfoField label="Monthly Upload Limit" value="35" />
                    <InfoField label="Payment Method" value="VISA **** 4242" />
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

export default CurrentPlan;
