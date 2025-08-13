"use client";
import { useState, useRef } from "react";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function VerifyCode() {

    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    // Handle change and move to the next input field
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (value.length === 1) {
        // Update OTP state
        const updatedOtp = [...otp];
        updatedOtp[index] = value;
        setOtp(updatedOtp);

        // Move focus to the next input field
        if (index < 3) {
        inputsRef.current[index + 1]?.focus();
        }
    }
    };

    // Handle backspace and move to the previous input field
    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "") {
        // Move focus to the previous input field when backspace is pressed
        if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        }
    }
    };

    // Handle delete behavior when input is filled
    const handleDelete = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (value === "") {
        // When the value is deleted, update OTP state and focus management
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);

        // Move focus to the previous input if deleting
        if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        }
    }
    };


  return (
   <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
        <div className="text-white py-10 max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            
            <Link href='/auth'>
               <Image src='/images/logo.png' height={300} width={300} alt="Logo" className="w-[216px] h-[80px] block mx-auto" />
            </Link>

            <div className="h-10 lg:h-20"></div>

            <div className="mt-4 mb-12">
                <h1 className="text-[28px] font-medium">Check Your Email</h1>
                <p className="text-base font-normal">We sent a verification link to olivia@untitledui.com</p>
            </div>

            {/* Form */}
            <form>
                <div className="mb-12 grid grid-cols-4 gap-4">

                    {otp.map((value, index) => (
                    <Input
                        key={index}
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleBackspace(e, index)}
                        onInput={(e: any) => handleDelete(e, index)} 
                        ref={(el: any) => (inputsRef.current[index] = el)}
                        className="w-full h-[60px] lg:h-[80px] text-center text-xl md:text-xl xl:text-2xl font-normal border border-[#4A4C56] rounded-[10px] outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                        placeholder={String(index + 1)}
                    />
                    ))}
                </div>
                <Link href='/auth/set-password'>
                  <button type="submit" className="h-11 w-full rounded bg-primary-color font-base font-medium cursor-pointer">Verify Email</button>
                </Link>
            </form>
        

        </div>
        <div className="hidden lg:block">
            <Image src='/images/verify-code-img.png' height={1000} width={1000} alt="Sign In Image" className="h-full w-full object-cover" />
        </div>
    </div>
  )
}
