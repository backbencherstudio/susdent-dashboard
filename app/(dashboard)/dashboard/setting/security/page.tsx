
"use client";
import React from 'react'
import { Switch } from "@/components/ui/switch"

import Tabs from "@/components/pages/setting/Tabs";
import DeactiveAccount from '@/components/pages/setting/DeactiveAccount';
import ChangePassword from '@/components/pages/setting/ChangePassword';

export default function Setting() {

  return (
    <>
    {/* Tabs */}
    <Tabs/>

    {/* Security Details */}
    <div className='bg-secondary-bg p-4 rounded-[8px] mt-4'>
        {/* Password */}
        <ChangePassword/>

        {/* Google Authentication */}
        <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B202C]">
            <div className="w-full sm:w-[60%]">
                <h6 className="text-base font-medium text-white mb-4">Google Authentication <small className="text-[#2ECC71]">Connected</small></h6>
                <p className="text-sm font-normal text-[#A5A5AB]">Connect to Google</p>
            </div>

            <Switch  checked className="cursor-pointer custom-switch"/>
        </div>

        {/* Deactivate Account */}
        <DeactiveAccount/>
    </div>
    
    </>
  )
}


