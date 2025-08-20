"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller} from "react-hook-form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { publicAxios } from "@/components/axiosInstance/axios";
import { useRouter } from "next/navigation";


interface FormData {
    otp: string
}

export default function VerifyCode() {

    const router = useRouter();

    const [formError, setFormError] = useState("");

    // otp sent email
    const otpEmail = localStorage.getItem("otp-email");

    // submit
    const {
        formState: { errors },
        handleSubmit,
        control,
        setValue
    } = useForm<FormData>();

    useEffect(() => {
        if (errors.otp?.message) {
        setFormError(""); 
        }
    }, [errors.otp?.message]);

    const onSubmit = async (data: FormData) => {

      const email = otpEmail;
      const updateData = {...data, email};

      try {
        const response = await publicAxios.post("/users/checkForgetPassOtp", updateData);
        if(response.data)
        {
          localStorage.removeItem("otp-email");
          localStorage.setItem("verified_otp", "true");
          localStorage.setItem("otp_token", response.data.token);
          router.push('/auth/set-password');
        }
      } catch (error: any) {
        if (error.response) 
        {
          const errResponse = error.response.data;
          setFormError(errResponse.message);
        } else {
          setFormError('Network error: Failed to reach server');
        }
      } 

    }


  return (
   <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
        <div className="text-white py-10 max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            
            <Link href='/auth'>
               <Image src='/images/logo.png' height={300} width={300} alt="Logo" className="w-[216px] h-[80px] block mx-auto" />
            </Link>

            <div className="h-10 lg:h-20"></div>

            <div className="mt-4 mb-12">
                <h1 className="text-[28px] font-medium">Check Your Email</h1>
                <p className="text-base font-normal">We sent a verification link to <span className="break-all">{otpEmail ? otpEmail : ""}</span></p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-12">

                   <div className="flex justify-center otp-input-wrap">
                        <Controller
                            name="otp"
                            control={control}
                            rules={{
                            required: "OTP is required",
                            minLength: {
                                value: 4,
                                message: "OTP must be 4 digits",
                            },
                            maxLength: {
                                value: 4,
                                message: "OTP must be 4 digits",
                            },
                            pattern: {
                                value: /^\d{4}$/,
                                message: "OTP must contain only numbers",
                            },
                            }}
                            render={({ field }) => (
                            <InputOTP
                                maxLength={4}
                                value={field.value}
                                onChange={(value) => {
                                field.onChange(value);
                                setValue("otp", value);
                                }}
                                  className="caret-white"
                            >
                                <InputOTPGroup>
                                {[...Array(4)].map((_, idx) => (
                                    <InputOTPSlot
                                    key={idx}
                                    index={idx}
                                    className="w-full h-[60px] lg:h-[80px]
                                    text-center text-xl md:text-xl xl:text-2xl
                                    border border-[#4A4C56] rounded-[10px]
                                    outline-none 
                                    data-[state=selected]:ring-0 data-[state=selected]:ring-transparent
                                    data-[state=selected]:shadow-none data-[state=selected]:border-primary-color
                                    !ring-0 !shadow-none "
                                    />
                                ))}

                                {/* w-full h-[60px] lg:h-[80px] text-center text-xl md:text-xl xl:text-2xl border border-[#4A4C56] rounded-[10px] outline-none focus-visible:ring-0 focus-visible:border-primary-color */}


                                </InputOTPGroup>
                            </InputOTP>
                            )}
                        />
                    </div> 

                   {errors.otp?.message ? (
                       <p className="error-msg">{String(errors.otp.message)}</p>
                    ) : (
                    formError && <p className="error-msg">{formError}</p>
                    )}
                </div>


                <button type="submit" className="h-11 w-full rounded bg-primary-color font-base font-medium cursor-pointer">Verify Email</button>
            </form>
        

        </div>
        <div className="hidden lg:block">
            <Image src='/images/verify-code-img.png' height={1000} width={1000} alt="Sign In Image" className="h-full w-full object-cover" />
        </div>
    </div>
  )
}
