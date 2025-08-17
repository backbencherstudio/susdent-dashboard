"use client";
import { useState } from "react";
import Image from 'next/image'
import React from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Tabs from "@/components/pages/setting/Tabs";

export default function Setting() {

  // Image Preview Show
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle file selection and show the image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      
      // Read the file as a data URL (base64 string)
      reader.onloadend = () => {
        setImagePreview(reader.result as string);  // Update image preview state
      };

      if (file) {
        reader.readAsDataURL(file);  // Convert the file to a data URL
      }
    }
  };

  // Handle delete action (reset the image preview)
  const handleDelete = () => {
    setImagePreview(null);  // Reset the preview image
  };

  return (
    <>
    {/* Tabs */}
    <Tabs/>

    {/* Image Upload */}
    <div className='flex flex-wrap items-center gap-2 sm:gap-5 '>
       <div>
          <div className="h-[100px] w-[100px]">
          {imagePreview ? (
            <Image src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-full" width={100} height={100} />
          ) : (
            <Image src="/images/user.svg" alt="Admin" className="h-[100px] w-[100px]" width={100} height={100} />
          )}
        </div>
       </div>
       <label htmlFor="profileImage" className='cursor-pointer py-[14px] px-5 border border-white rounded-[100px]'>
        <input type="file" className='hidden' name="image" id="profileImage" accept="image/*" onChange={handleImageChange}/>
        <span className='text-sm font-medium'>Upload New Picture</span>
       </label>
       <button className='text-sm font-medium px-5 py-[14px] rounded-[100px] bg-btn-secondary-bg cursor-pointer'>Delete</button>
    </div>

    {/* Personal Details Form */}
    <div className='bg-secondary-bg p-4 rounded-[8px] mt-4'>
        <div className="grid sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="mb-4">
              <Label className="text-base font-mediumd mb-3">Name</Label>
              <Input className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter name" />
            </div>

            {/* Email */}
            <div>
              <Label className="text-base font-mediumd mb-3">Email</Label>
              <Input className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter email address" />
            </div>

            {/* Date of Birth */}
            <div>
              <Label className="text-base font-mediumd mb-3">Date of Birth</Label>
              <div className="relative">
                <Input type="date" className="block h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" id="datepicker" />
              </div>
            </div>

            {/* Language */}
            <div>
              <Label className="text-base font-mediumd mb-3">Language</Label>

              <Select>
                <SelectTrigger className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-bg text-white border border-slate-700 rounded">
                  <SelectItem value="English" className="cursor-pointer">English</SelectItem>
                  <SelectItem value="French" className="cursor-pointer">French</SelectItem>
                  <SelectItem value="German" className="cursor-pointer">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Address */}
            <div>
              <Label className="text-base font-mediumd mb-3">Address</Label>
              <Input className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter your address" />
            </div>

            {/* Phone */}
            <div>
              <Label className="text-base font-mediumd mb-3">Phone</Label>
              <Input className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter phone" />
            </div>

            {/* City */}
            <div>
              <Label className="text-base font-mediumd mb-3">City</Label>

              <Select>
                <SelectTrigger className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-bg text-white border border-slate-700 rounded">
                  <SelectItem value="Dhaka" className="cursor-pointer">Dhaka</SelectItem>
                  <SelectItem value="Chittagong" className="cursor-pointer">Chittagong</SelectItem>
                  <SelectItem value="Feni" className="cursor-pointer">Feni</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Postal Code */}
            <div>
              <Label className="text-base font-mediumd mb-3">Postal Code</Label>
              <Input className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter postal code" />
            </div>
        </div> 

        {/* Bio */}
        <div className="mt-4 mb-6">
          <Label className="text-base font-mediumd mb-3">Bio</Label>
          <Textarea className="h-[100px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter postal code"/>
        </div>

        <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Save</button>

    </div>
    
    </>
  )
}
