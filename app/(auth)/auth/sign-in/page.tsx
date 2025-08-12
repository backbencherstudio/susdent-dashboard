import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
  return (
     <div className="grid md:grid-cols-2 gap-16 items-center px-4 h-auto md:min-h-screen">
        <div className="text-white">
            <Image src='/images/logo.png' height={300} width={300} alt="Logo" className="w-[216px] h-[80px] block mx-auto" />
            <div className="h-20"></div>
            <p className="text-sm font-normal">Hey! Welcome</p>

            <div className="mt-4 mb-8">
                <h1 className="text-[28px] font-medium">Login to </h1>
                <p className="text-base font-medium">Please login to continue to your account.</p>
            </div>

            <div className="mb-4">
                <Label className="font-base font-medium mb-3">Email</Label>
                <Input className="h-[40px] w-full px-4 py-3 text-sm font-medium border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0" placeholder="Enter Email Address"/>
            </div>

            <div className="mb-4">
                <Label className="font-base font-medium mb-3">Password</Label>
                <Input className="h-[40px] w-full px-4 py-3 text-sm font-medium border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 " placeholder="Enter your password"/>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-3">
                        <Label htmlFor="terms" className="cursor-pointer">
                            <input type="checkbox" id="terms" className="cursor-pointer h-4 w-4 accent-primary-color"/>
                            <span>Accept terms and conditions</span>
                        </Label>
                    </div>
                </div>
                <Link href="/auth/forgot-password" className="text-sm font-normal underline">Forgot Password?</Link>
            </div>

            <button className="h-10 w-full rounded bg-primary-color font-base font-medium cursor-pointer">Sign In</button>


        </div>
        <div>
            <Image src='/images/sign-in-img.png' height={1000} width={1000} alt="Sign In Image" className="h-full w-full object-cover" />
        </div>
    </div>
  )
}
