import { DataTable } from '@/components/reusable/data-table';


import React from 'react';
import ActiveVideoTable from './ActivityTable';

const Statistics: React.FC = () => {
    return (

        <div className='space-y-4'>

            <div className="bg-[#111723] rounded-xl border border-gray-800/50 p-4 space-y-4 animate-in fade-in duration-500">
                <h3 className="text-white text-base font-medium leading-[160%]">Statistics</h3>
                <hr className='border-t  border-gray-600/50' />
                <div className="flex flex-wrap gap-6">
                    <InfoField label="Total Video" value="142" />
                    <InfoField label="Favorite Genre" value="Action" />
                    <InfoField label="Average weekly upload" value="3" />
                    <InfoField label="Maximal upload" value="35" />
                </div>

            </div>


            <ActiveVideoTable />
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

export default Statistics;


