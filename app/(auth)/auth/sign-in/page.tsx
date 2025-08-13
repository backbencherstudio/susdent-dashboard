"use client";

import EyeIcon from "@/components/icons/EyeIcon";
import EyeSlash from "@/components/icons/EyeSlash";
import SocialBtn from "@/components/pages/auth/SocialBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignIn() {

  const [type, setType] = React.useState<'password' | 'text'>('password');


  return (
     <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
        <div className="text-white py-10 max-w-[500px] lg:max-w-full mx-auto lg:mx-0">

            <Link href='/auth'>
               <Image src='/images/logo.png' height={300} width={300} alt="Logo" className="w-[216px] h-[80px] block mx-auto" />
            </Link>

            <div className="h-10 lg:h-20"></div>
            <p className="text-sm font-normal">Hey! Welcome</p>

            <div className="mt-4 mb-8">
                <h1 className="text-[28px] font-medium">Login to </h1>
                <p className="text-base font-normal">Please login to continue to your account.</p>
            </div>

            {/* Login Form */}
            <form>
                <div className="mb-4">
                    <Label className="font-base font-medium mb-3">Email</Label>
                    <Input className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter Email Address"/>
                </div>

                <div className="mb-4">
                    <Label className="font-base font-medium mb-3">Password</Label>
                    <div className="relative">
                      <Input type={type} className="h-[40px] w-full px-4 pr-10 py-3 text-sm font-normal border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter your password"/>
                     
                      <button
                        type="button"
                        onClick={() => setType(type === "password" ? "text" : "password")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        {
                            type === "password" ?
                            <EyeIcon className="h-5 w-5" /> :  <EyeSlash className="h-5 w-5"/>
                        }
                      </button>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-3">
                            <Label htmlFor="terms" className="cursor-pointer">
                                <input type="checkbox" id="terms" className="cursor-pointer h-4 w-4 accent-primary-color"/>
                                <span className="text-sm font-[300]">Remember Me</span>
                            </Label>
                        </div>
                    </div>
                    <Link href="/auth/forgot-password" className="text-sm font-[300] underline">Forgot Password?</Link>
                </div>

                <button type="submit" className="h-11 w-full rounded bg-primary-color font-base font-medium cursor-pointer">Log In</button>
            </form>

            {/* Separator */}
            <div className="my-6 lg:my-12 flex items-center justify-center gap-4">
                <div className="w-[60px] sm:w-[100px] h-[1px] bg-[#FFFFFF40]"></div>
                <p className="text-sm font-normal whitespace-nowrap">Or continue with</p>
                <div className="w-[60px] sm:w-[100px] h-[1px] bg-[#FFFFFF40]"></div>
            </div>

            {/* Social Login */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <SocialBtn image="/icons/google.png" label="Google" />
              <SocialBtn image="/icons/apple.svg" label="Apple" />
              <SocialBtn image="/icons/facebook.svg" label="Facebook" />
            </div>

        </div>
        <div className="hidden lg:block">
            <Image src='/images/sign-in-img.png' height={1000} width={1000} alt="Sign In Image" className="h-full w-full object-cover" />
        </div>
    </div>
  )
}
