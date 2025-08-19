"use client";
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import GreenSheild from '@/components/icons/GreenSheild';

export default function ResetSuccessfull() {
  return (
     <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
        <div className="text-white py-10 max-w-[500px] lg:max-w-full mx-auto lg:mx-0">

            <Link href='/auth'>
               <Image src='/images/logo.png' height={300} width={300} alt="Logo" className="w-[216px] h-[80px] block mx-auto" />
            </Link>

            <div className="h-10 lg:h-20"></div>

            <div className="mt-4 mb-12 space-y-4">
                <GreenSheild />
                <h1 className="text-[28px] font-medium">Password reset done!</h1>
                <p className="text-base font-normal">Your password has been successfully reset. Click below to log in.</p>
            </div>
         

            <Link href='/auth'>
              <button type="submit" className="h-11 w-full rounded bg-primary-color font-base font-medium cursor-pointer">Continue</button>
            </Link>

        </div>
        <div className="hidden lg:block">
            <Image src='/images/sign-in-img.png' height={1000} width={1000} alt="Sign In Image" className="h-full w-full object-cover" />
        </div>
    </div>
  )
}
