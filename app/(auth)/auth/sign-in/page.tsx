"use client";

import { publicAxios } from "@/components/axiosInstance/axios";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeSlash from "@/components/icons/EyeSlash";
import SocialBtn from "@/components/pages/auth/SocialBtn";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/provider/AuthProvider";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"

interface formData {
  email: string,
  password: string,
  remember_me: boolean
}

//get cookie if there
function getCookie(name: string): string {
  if (typeof document === "undefined") return "";

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || "";
  return "";
}

export default function SignIn() {
  const {error, login, user, isLoading} = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  // if user already login redirect to dashboard
  if(!isLoading && user)
  {  
    router.push("/dashboard");
  }


  const [type, setType] = React.useState<'password' | 'text'>('password');

  const [savedEmail, setSavedEmail] = useState("");
  const [savedPassword, setSavedPassword] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue
  } = useForm<formData>();

  // Load saved email and password from cookie
  useEffect(() => {
    const email = getCookie("email");
    const password = getCookie("password");
    if (email) {
      setSavedEmail(email);
      setSavedPassword(password);

      setValue("email", email);
      setValue("password", password);
      setValue("remember_me", true);
    }
  }, [setValue]);

  const onSubmit = async (data: formData) => {
    try {
      const response = await login(data);
      if(response !== undefined)
      {
        router.push('/dashboard');
        const {email, password, remember_me} = data;

        //If remember me, value setting into cookie for show next time (30days)
        if (remember_me) {
          function setCookie(name: string, value: string, days: number) {
            const expires = new Date();
            expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
            const expiresString = `expires=${expires.toUTCString()}`;
            document.cookie = `${name}=${value}; ${expiresString}; path=/`;
          }
          setCookie("email", email, 30);
          setCookie("password", password, 30);
        } else {
          function deleteCookie(name: string) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
          }
          deleteCookie("email");
          deleteCookie("password");
        }
      }
    } catch (errorData: any) {
      console.log(errorData);
    }

  }

  // Handle Google OAuth token after redirect
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Save token to localStorage
      localStorage.setItem('authToken', token);
      console.log('User token saved:', token);
      
      // Redirect to dashboard
      router.push('/dashboard');
    }
  }, [searchParams, router]);

    const handleGoogleLogin = () => {
    window.location.href = 'https://decisions-spanish-protecting-anime.trycloudflare.com/api/users/auth/google';
  };
  

  return (
     <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
        <div className="text-white py-10 max-w-[500px] w-full lg:max-w-full mx-auto lg:mx-0">

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
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-4">
                    <Label className="font-base font-medium mb-3">Email</Label>
                    <Input defaultValue={savedEmail} {...register("email", { required: "Email is required",   pattern: {value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter a valid email address"}})} className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter Email Address"/>

                    {errors.email && (
                      <p className="error-msg">{errors.email.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <Label className="font-base font-medium mb-3">Password</Label>
                    <div className="relative">
                      <Input defaultValue={savedPassword} type={type} {...register("password", { required: "Password is required",  'minLength': {value: 8, 'message': "Password should be at least 8 characters"}})} className="h-[40px] w-full px-4 pr-10 py-3 text-sm font-normal border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter your password"/>
                     
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

                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-3">
                            <Label htmlFor="terms" className="cursor-pointer">

                                <Controller
                                  name="remember_me"
                                  control={control}
                                  defaultValue={false}
                                  render={({ field }) => (
                                  <input type="checkbox"  
                                  checked={field.value}
                                  onChange={field.onChange} id="terms" className="cursor-pointer h-4 w-4 accent-primary-color"/>
                                  )}
                                />

                                <span className="text-sm font-[300]">Remember Me</span>
                            </Label>
                        </div>
                    </div>
                    <Link href="/auth/forgot-password" className="text-sm font-[300] underline">Forgot Password?</Link>
                </div>

                <div className="mb-6">
                  {
                    error && <p className="error-msg text-center">{error}</p>
                  }
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
              <SocialBtn handleGoogleLogin = {handleGoogleLogin} image="/icons/google.png" label="Google" />
            </div>

        </div>
        <div className="hidden lg:block">
            <Image src='/images/sign-in-img.png' height={1000} width={1000} alt="Sign In Image" className="h-full w-full object-cover" />
        </div>
    </div>
  )
}
