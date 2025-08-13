import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  return (
     <div className="grid lg:grid-cols-2 gap-16 items-center px-4 h-auto md:min-h-screen">
        <div className="text-white py-10 max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <Image src='/images/logo.png' height={300} width={300} alt="Logo" className="w-[216px] h-[80px] block mx-auto" />
            <div className="h-10 lg:h-20"></div>
            <p className="text-sm font-normal">Hey! Welcome</p>

            <div className="mt-4 mb-8">
                <h1 className="text-[28px] font-medium">Login to </h1>
                <p className="text-base font-medium">Please login to continue to your account.</p>
            </div>

            {/* Login Form */}
            <form action="">
                <div className="mb-4">
                    <Label className="font-base font-medium mb-3">Email</Label>
                    <Input className="h-[40px] w-full px-4 py-3 text-sm font-medium border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0" placeholder="Enter Email Address"/>
                </div>

                <div className="mb-4">
                    <Label className="font-base font-medium mb-3">Password</Label>
                    <Input className="h-[40px] w-full px-4 py-3 text-sm font-medium border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 " placeholder="Enter your password"/>
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
               <button className="bg-[#E9EEFA] flex items-center gap-2 justify-center text-gray-900 px-[35px] lg:px-[25px] xl:px-[35px] py-[10px] rounded cursor-pointer">
                   <Image src='/icons/google.png' height={20} width={20} alt="Google Icon" />
                   <span>Google</span>
                </button> 
               <button className="bg-[#E9EEFA]  flex items-center gap-2 justify-center text-gray-900 px-[35px] lg:px-[25px] xl:px-[35px] py-[10px] rounded cursor-pointer">
                   <Image src='/icons/apple.svg' height={20} width={20} alt="Google Icon" />
                   <span>Apple</span>
                </button> 
               <button className="bg-[#E9EEFA]  flex items-center gap-2 justify-center text-gray-900 px-[35px] lg:px-[25px] xl:px-[35px] py-[10px] rounded cursor-pointer">
                    <Image src='/icons/facebook.svg' height={20} width={20} alt="Google Icon" />
                   <span>Facebook</span>
                </button> 
            </div>

        </div>
        <div className="hidden lg:block">
            <Image src='/images/sign-in-img.png' height={1000} width={1000} alt="Sign In Image" className="h-full w-full object-cover" />
        </div>
    </div>
  )
}
