"use client";
import React from 'react'
import EyeIcon from "@/components/icons/EyeIcon";
import EyeSlash from "@/components/icons/EyeSlash";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import GreenCheck from '@/components/icons/GreenCheck';
import RedCross from '@/components/icons/RedCross';

export default function SetPassword() {
    
   const [type, setType] = React.useState<'password' | 'text'>('password');
   const [type2, setType2] = React.useState<'password' | 'text'>('password');

  return (
      <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
        <div className="text-white py-10 max-w-[500px] lg:max-w-full mx-auto lg:mx-0">

            <Link href='/auth'>
               <Image src='/images/logo.png' height={300} width={300} alt="Logo" className="w-[216px] h-[80px] block mx-auto" />
            </Link>

            <div className="h-10 lg:h-20"></div>
           {/*  <p className="text-sm font-normal">Hey! Welcome</p> */}

            <div className="mt-4 mb-12">
                <h1 className="text-[28px] font-medium">Set new password</h1>
                <p className="text-base font-normal">Your new password must be different to previously used passwords.</p>
            </div>

            {/* Login Form */}
            <form>

                <div className="mb-4">

                    <div className="relative">
                      <Input type={type} className="h-[40px] w-full px-4 pr-10 py-3 text-sm font-normal border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="New password"/>
                     
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

                    <div className='grid sm:grid-cols-2 gap-3 my-6'>
                        <div className='flex items-center gap-2 text-xs font-normal'>
                            <GreenCheck className='h-5 w-5'/>
                            <p className='text-sm font-normal'>8 characters</p>
                        </div>
                         <div className='flex items-center gap-2 text-xs font-normal'>
                            <GreenCheck className='h-5 w-5'/>
                            <p className='text-sm font-normal'>Number (0-9)</p>
                        </div>
                         <div className='flex items-center gap-2 text-xs font-normal'>
                            <GreenCheck className='h-5 w-5'/>
                            <p className='text-sm font-normal'>Uppercase letter (A-Z)</p>
                        </div>
                         <div className='flex items-center gap-2 text-xs font-normal'>
                            <RedCross className='h-5 w-5'/>
                            <p className='text-sm font-normal'>Lowercase letter (a-z)</p>
                        </div>
                    </div>

                </div>

                <div className="mb-12">
                    <div className="relative">
                      <Input type={type2} className="h-[40px] w-full px-4 pr-10 py-3 text-sm font-normal border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Confirm password"/>
                     
                      <button
                        type="button"
                        onClick={() => setType2(type2 === "password" ? "text" : "password")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      >
                        {
                            type2 === "password" ?
                            <EyeIcon className="h-5 w-5" /> :  <EyeSlash className="h-5 w-5"/>
                        }
                      </button>
                    </div>
                </div>

                <Link href='/auth/reset-successful'>
                  <button type="submit" className="h-11 w-full rounded bg-primary-color font-base font-medium cursor-pointer">Reset Password</button>
                </Link>
            </form>

        </div>
        <div className="hidden lg:block">
            <Image src='/images/sign-in-img.png' height={1000} width={1000} alt="Sign In Image" className="h-full w-full object-cover" />
        </div>
    </div>
  )
}
