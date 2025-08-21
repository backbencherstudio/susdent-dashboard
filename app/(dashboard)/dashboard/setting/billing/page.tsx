"use client";
import Tabs from "@/components/pages/setting/Tabs";
import Image from "next/image";

import StripeIcon from "@/components/icons/StripeIcon";
import VisaCardIcon from "@/components/icons/VisaCardIcon";
import Paypal from "@/components/icons/Paypal";
import MasterCard from "@/components/icons/MasterCard";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface PaymentMethod {
    id: number; 
    name: string;
    last4: string;
    expiry: string;
    icon: React.ReactNode;
}

export default function Billing() {

    const paymentMethods: PaymentMethod[] = [
        {
            id: 1,
            name: "Stripe",
            last4: "8092",
            expiry: "12/32",
            icon: <StripeIcon />
        },
    ];

  return (
    <>
        {/* Tabs */}
        <Tabs/>

        {/* Payment Method */}
        <div className="bg-secondary-bg p-4 rounded-sm">
        <h2 className="text-lg font-medium mb-4">Payment method</h2>

            <div className="grid sm:grid-cols-2 gap-5">
                {
                    paymentMethods.map((method) => (
                        <div key={method.id} className="bg-[#0D121E] py-8 px-4 rounded-[8px] border border-[#1B202C] flex items-center justify-between gap-5">
                            <label htmlFor={`paymentMethod${method.id}`} className="flex items-center gap-3">
                                <div className="flex items-center gap-3">
                                    {method.icon}
                                    <div>
                                        <p className="text-xs font-normal">{method.name} **** {method.last4}</p>
                                        <p className="text-xs text-[#AEB9E1] font-normal">Expires on {method.expiry}</p>
                                    </div>
                                </div>
                            </label>
                        </div>
                    ))
                }
            </div>

            <p className="text-sm mt-2 px-3 py-2 rounded border border-[#f8fafc36] w-fit">Stripe accept all the type of payments (Visa, MasterCard, Paypal and more)</p>
        </div>

        {/* Billing Details */}
        <h1 className="text-lg font-medium text-white my-3">Billing Details</h1>

        <div className='bg-secondary-bg p-4 rounded-[8px] mt-4'>
        <div className="grid sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="mb-4">
                <Label className="text-base font-mediumd mb-3">Full Name</Label>
                <Input className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter full name" />
            </div>

            {/* Date of Birth */}
            <div>
                <Label className="text-base font-mediumd mb-3">Date of Birth</Label>
                <div className="relative">
                <Input type="date" className="block h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" id="datepicker" />
                </div>
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

            {/* Country */}
            <div>
                <Label className="text-base font-mediumd mb-3">Country</Label>

                <Select>
                <SelectTrigger className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-bg text-white border border-slate-700 rounded">
                    <SelectItem value="USA" className="cursor-pointer">USA</SelectItem>
                    <SelectItem value="Mexico" className="cursor-pointer">Mexico</SelectItem>
                    <SelectItem value="France" className="cursor-pointer">France</SelectItem>
                </SelectContent>
                </Select>
            </div>

            {/* State */}
            <div>
                <Label className="text-base font-mediumd mb-3">State</Label>

                <Select>
                <SelectTrigger className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color">
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-bg text-white border border-slate-700 rounded">
                    <SelectItem value="State 1" className="cursor-pointer">State 1</SelectItem>
                    <SelectItem value="State 2" className="cursor-pointer">State 2</SelectItem>
                    <SelectItem value="State 3" className="cursor-pointer">State 3</SelectItem>
                </SelectContent>
                </Select>
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

            {/* Zip Code */}
            <div>
                <Label className="text-base font-mediumd mb-3">Zip Code</Label>
                <Input className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter postal code" />
            </div>
        </div> 

        {/* Space */}
        <div className="mt-4 mb-6"></div>

        <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Save</button>

        </div>
    </>
  )
}
