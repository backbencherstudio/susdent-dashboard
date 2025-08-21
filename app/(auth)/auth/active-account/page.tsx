"use client";

import { publicAxios } from "@/components/axiosInstance/axios";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeSlash from "@/components/icons/EyeSlash";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/provider/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { useForm } from "react-hook-form"
import { toast } from "sonner";

interface formData {
  email: string,
  password: string,
}

export default function ActiveAccount() {
  const [type, setType] = React.useState<'password' | 'text'>('password');
  const [formError, setFormError] = useState("");
  const [formSuccess, setformSuccess] = useState<React.ReactNode>("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<formData>();

  const onSubmit = async (data: formData) => {
    try {
      const response = await publicAxios.post("/admin/settings/activate", data);
      if(response.data)
      {
        
        const successMsg = (
          <>
            Account activated successfully.{" "}
            <Link href='/auth' className="text-blue-400 underline">Sign In</Link>
          </>
        );
        setformSuccess(successMsg);
        setFormError("");
        reset();
      }
    } catch (errorData: any) {
      const errorRes = errorData.response.data;
      if(errorRes.error)
      {
         setFormError(errorRes.error);
      }
      else if(errorRes.message)
      {
        setFormError(errorRes.message);
      }
      else 
      {
        setFormError('Something went wrong! Try again')
      }
      setformSuccess("");
    }

  }


  return (
     <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
        <div className="text-white py-10 max-w-[500px] lg:max-w-full mx-auto lg:mx-0">

            <Link href='/auth'>
               <Image src='/images/logo.png' height={300} width={300} alt="Logo" className="w-[216px] h-[80px] block mx-auto" />
            </Link>

            <div className="h-10 lg:h-20"></div>

            <div className="mt-4 mb-8">
                <h1 className="text-[28px] font-medium">Activate to </h1>
                <p className="text-base font-normal">Please activate to continue to your account.</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-4">
                    <Label className="font-base font-medium mb-3">Email</Label>
                    <Input  {...register("email", { required: "Email is required",   pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address"}})} className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter Email Address"/>

                    {errors.email && (
                      <p className="error-msg">{errors.email.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Label className="font-base font-medium mb-3">Password</Label>
                    <div className="relative">
                      <Input  type={type} {...register("password", { required: "Password is required",  'minLength': {value: 8, 'message': "Password should be at least 8 characters"}})} className="h-[40px] w-full px-4 pr-10 py-3 text-sm font-normal border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter your password"/>
                     
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

                    {errors.password && (
                      <p className="error-msg">{errors.password.message}</p>
                    )}
                </div>

                <div className="mb-6">
                  {
                    formError ? <p className="error-msg text-center">{formError}</p> :
                    formSuccess && <p className="success-msg text-center">{formSuccess}</p>
                  }
                </div>

                <button type="submit" className="h-11 w-full rounded bg-primary-color font-base font-medium cursor-pointer">Log In</button>
            </form>
          

        </div>
        <div className="hidden lg:block">
            <Image src='/images/sign-in-img.png' height={1000} width={1000} alt="Sign In Image" className="h-full w-full object-cover" />
        </div>
    </div>
  )
}
