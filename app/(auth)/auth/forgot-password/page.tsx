import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
        <div className="text-white py-10 max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            
            <Link href='/auth'>
               <Image src='/images/logo.png' height={300} width={300} alt="Logo" className="w-[216px] h-[80px] block mx-auto" />
            </Link>

            <div className="h-10 lg:h-20"></div>

            <div className="mt-4 mb-12">
                <h1 className="text-[28px] font-medium">Forgot Password?</h1>
                <p className="text-base font-normal">No worries, we’ll send you reset instructions.</p>
            </div>

            {/* Form */}
            <form>
                <div className="mb-12">
                    <Label className="font-base font-medium mb-3">Email</Label>
                    <Input className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 focus-visible:border-primary-color" placeholder="Enter Email Address"/>
                </div>

                <Link href='/auth/verify-code'>
                  <button type="submit" className="h-11 w-full rounded bg-primary-color font-base font-medium cursor-pointer">Send Email</button>
                </Link>
            </form>
        

        </div>
        <div className="hidden lg:block">
            <Image src='/images/forgot-password-img.png' height={1000} width={1000} alt="Sign In Image" className="h-full w-full object-cover" />
        </div>
    </div>
  )
}
