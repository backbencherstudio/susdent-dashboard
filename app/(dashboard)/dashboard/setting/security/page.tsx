
"use client";
import React from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Tabs from "@/components/pages/setting/Tabs";
import { Button } from "@/components/ui/button";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeSlash from "@/components/icons/EyeSlash";

import DeactiveAccount from '@/components/pages/setting/DeactiveAccount';
import ChangePassword from '@/components/pages/setting/ChangePassword';

interface Activity {
  device: string;
  date: string;
  location: string;
  ipAddress: string;
  isActive: boolean;
}


export default function Setting() {

    const [type, setType] = React.useState<'password' | 'text'>('password');

    const  activityList: Activity[] = [
        {
            device: "Chrome - Windows",
            date: "5 May 2025, 10:30 AM",
            location: "New York / USA",
            ipAddress: "232.222.12.72",
            isActive: true
        },
         {
            device: "Firefox Windows",
            date: "15 May 2025, 10:30 AM",
            location: "New York / USA",
            ipAddress: "232.222.12.72",
            isActive: true
        },
         {
            device: "Chrome - Windows",
            date: "5 May 2025, 10:30 AM",
            location: "New York / USA",
            ipAddress: "232.222.12.72",
            isActive: true
        },
         {
            device: "Chrome - Windows",
            date: "5 May 2025, 10:30 AM",
            location: "New York / USA",
            ipAddress: "232.222.12.72",
            isActive: true
        }
    ]
    
    // Change Phone Number
    const handleChangePhoneNumber = () =>
    {
        return (
            <Dialog>
            <form>
                <DialogTrigger asChild>
                 <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Change</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[530px] bg-gray3-bg border-gray3-border settingDialog" >
                <DialogHeader className="pb-4 border-b border-[#222733]">
                    <DialogTitle className="text-base font-semibold text-white">Change Phone Number</DialogTitle>
                </DialogHeader>
                <div>

                    {/* Current Phone Number */}
                    <div className="mb-4">
                        <Label className="font-base font-medium mb-3 text-white">Current Phone Number</Label>
                        <Input className="w-full px-4 py-3 text-sm font-normal bg-[#181E2A] border border-[#222733] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color text-white" placeholder="Current Phone Number"/>
                    </div>

                    {/* New Phone Number */}
                    <div className="mb-4">
                        <Label className="font-base font-medium mb-3 text-white">New Phone Number<span className="text-red-500">*</span></Label>
                        <Input className="w-full px-4 py-3 text-sm font-normal bg-[#181E2A] border border-[#222733] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color text-white" placeholder="New Phone Number"/>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <Label className="font-base font-medium mb-3 text-white">Password<span className="text-red-500">*</span></Label>
                        <div className="relative">
                          <Input type={type} className="w-full px-4 py-3 text-sm font-normal bg-[#181E2A] border border-[#222733] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color text-white" placeholder="Current Password"/>

                          <button
                                type="button"
                                onClick={() => setType(type === "password" ? "text" : "password")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
                            >
                                {
                                    type === "password" ?
                                    <EyeIcon className="h-5 w-5" /> :  <EyeSlash className="h-5 w-5"/>
                                }
                            </button>
                        </div>
                    </div>
                
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline" className="py-3 px-4 bg-transparent border border-primary-color text-white font-sm font-medium cursor-pointer hover:bg-primary-color hover:text-white rounded">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="py-3 px-4 bg-primary-color text-white font-sm font-medium cursor-pointer hover:bg-primary-color rounded">Change Number</Button>
                </DialogFooter>
                </DialogContent>
            </form>
            </Dialog>
        )
    }

    // Change Email
    const handleChangeEmail = () =>
    {
        return (
            <Dialog>
            <form>
                <DialogTrigger asChild>
                  <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Change</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[530px] bg-gray3-bg border-gray3-border settingDialog" >
                <DialogHeader className="pb-4 border-b border-[#222733]">
                    <DialogTitle className="text-base font-semibold text-white">Change Email</DialogTitle>
                </DialogHeader>
                <div>

                    {/* Current Email Address */}
                    <div className="mb-4">
                        <Label className="font-base font-medium mb-3 text-white">Current Email Address</Label>
                        <Input className="w-full px-4 py-3 text-sm font-normal bg-[#181E2A] border border-[#222733] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color text-white" placeholder="Current Email Address"/>
                    </div>

                    {/* New Phone Number */}
                    <div className="mb-4">
                        <Label className="font-base font-medium mb-3 text-white">New Email Address<span className="text-red-500">*</span></Label>
                        <Input className="w-full px-4 py-3 text-sm font-normal bg-[#181E2A] border border-[#222733] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color text-white" placeholder="New Email Address"/>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <Label className="font-base font-medium mb-3 text-white">Password<span className="text-red-500">*</span></Label>
                        <div className="relative">
                          <Input type={type} className="w-full px-4 py-3 text-sm font-normal bg-[#181E2A] border border-[#222733] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color text-white" placeholder="Current Password"/>

                          <button
                                type="button"
                                onClick={() => setType(type === "password" ? "text" : "password")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
                            >
                                {
                                    type === "password" ?
                                    <EyeIcon className="h-5 w-5" /> :  <EyeSlash className="h-5 w-5"/>
                                }
                            </button>
                        </div>
                    </div>
                
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button variant="outline" className="py-3 px-4 bg-transparent border border-primary-color text-white font-sm font-medium cursor-pointer hover:bg-primary-color hover:text-white rounded">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" className="py-3 px-4 bg-primary-color text-white font-sm font-medium cursor-pointer hover:bg-primary-color rounded">Change Number</Button>
                </DialogFooter>
                </DialogContent>
            </form>
            </Dialog>
        )
    }

    // Account Activity
    const handleAccountActivity = () =>
    {
        return (
            <Dialog>
            <form>
                <DialogTrigger asChild>
                  <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">View</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[785px] bg-gray3-bg border-gray3-border settingDialog" >
                <DialogHeader className="pb-4 border-b border-[#222733]">
                    <DialogTitle className="text-base font-semibold text-white">Account Activity</DialogTitle>
                </DialogHeader>
                <div className='overflow-x-auto'>
                  <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-white">Device</TableHead>
                            <TableHead className="text-white">Date</TableHead>
                            <TableHead className="text-white">Location</TableHead>
                            <TableHead className="text-white">IP Address</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            activityList.map((activity, index) => (
                                <TableRow key={index} className={`text-white ${activity.isActive ? 'bg-[#1B202C]' : ''}`}>
                                    <TableCell className="py-4">{activity.device}</TableCell>
                                    <TableCell className="py-4">{activity.date}</TableCell>
                                    <TableCell className="py-4">{activity.location}</TableCell>
                                    <TableCell className="py-4">
                                        {activity.ipAddress} 
                                        {" "}
                                        {activity.isActive && <span className="text-[#2ECC71]">Connect</span>}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    </Table>
                </div>
                
                </DialogContent>
            </form>
            </Dialog>
        )
    }

  return (
    <>
    {/* Tabs */}
    <Tabs/>

    {/* Security Details */}
    <div className='bg-secondary-bg p-4 rounded-[8px] mt-4'>
        {/* Password */}
        <ChangePassword/>

        {/* Two Factor Authentication */}
     {/*    <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B202C]">
            <div className="w-full sm:w-[60%]">
                <h6 className="text-base font-medium text-white mb-4">Two Factor Authentication</h6>
                <p className="text-sm font-normal text-[#A5A5AB]">Receive codes via SMS or email every time you login</p>
            </div>
            <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Enable</button>
        </div> */}

        {/* Google Authentication */}
        <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B202C]">
            <div className="w-full sm:w-[60%]">
                <h6 className="text-base font-medium text-white mb-4">Google Authentication <small className="text-[#2ECC71]">Connected</small></h6>
                <p className="text-sm font-normal text-[#A5A5AB]">Connect to Google</p>
            </div>

            <Switch  checked className="cursor-pointer custom-switch"/>
        </div>

        {/* Phone number verification */}
        {/* <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B202C]">
            <div className="w-full sm:w-[60%]">
                <h6 className="text-base font-medium text-white mb-4">Phone Number Verification</h6>
                <p className="text-sm font-normal text-[#A5A5AB]">The Phone Number associated with the account Verified Mobile Number : (704) 555-0127</p>
            </div>
            <div className="flex gap-3">
               <button className="hover:bg-primary-color border border-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Remove</button>
                {handleChangePhoneNumber()}
            </div>
        </div> */}

        {/* Email verification */}
       {/*  <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B202C]">
            <div className="w-full sm:w-[60%]">
                <h6 className="text-base font-medium text-white mb-4">Email Verification</h6>
                <p className="text-sm font-normal text-[#A5A5AB]">The email address associated with the account Verified Email : cameron.graham@example.com</p>
            </div>
            <div className="flex gap-3">
               <button className="hover:bg-primary-color border border-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Remove</button>
               {handleChangeEmail()}
            </div>
        </div> */}

        {/* Device Management */}
       {/*  <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B202C]">
            <div className="w-full sm:w-[60%]">
                <h6 className="text-base font-medium text-white mb-4">Device Management</h6>
                <p className="text-sm font-normal text-[#A5A5AB]">The devices associated with the account</p>
            </div>
            <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Manage</button>
        </div> */}

        {/* Account Activity */}
        {/* <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B202C]">
            <div className="w-full sm:w-[60%]">
                <h6 className="text-base font-medium text-white mb-4">Account Activity</h6>
                <p className="text-sm font-normal text-[#A5A5AB]">The activities of the account</p>
            </div>
            {handleAccountActivity()}
        </div> */}

        {/* Deactivate Account */}
        <DeactiveAccount/>

        {/* Delete Account */}
        {/* <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B202C]">
            <div className="w-full sm:w-[60%]">
                <h6 className="text-base font-medium text-white mb-4">Delete Account</h6>
                <p className="text-sm font-normal text-[#A5A5AB]">Your account will be permanently deleted</p>
            </div>
            <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Delete</button>
        </div> */}
    </div>
    
    </>
  )
}


