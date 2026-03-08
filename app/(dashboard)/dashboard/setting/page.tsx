"use client";
import { useEffect, useState } from "react";
import Image from 'next/image'
import React from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Tabs from "@/components/pages/setting/Tabs";
import { useAuth } from "@/provider/AuthProvider";

import { useForm } from "react-hook-form";
import { privateAxios } from "@/components/axiosInstance/axios";
import { toast } from "sonner";

interface CityData {
  label: string,
  value: string
}

interface CountryData {
  label: string,
  value: string
}

interface StateData {
  label: string,
  value: string
}

interface FormData {
  name: string,
  email: string,
  date_of_birth: string,
  address: string,
  phone_number: string,
  country: string | null,
  state: string | null,
  city: string | null,
  postal_code: string,
  bio: string
}

export default function Setting() {

  const { user } = useAuth();

  const [image, setImage] = useState<File | undefined>();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Image Preview Show
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm<FormData>();

  // Set form default values when user data is available
  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        email: user.email || '',
        date_of_birth: user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString('en-CA') : '',
        address: user.address || '',
        phone_number: user.phone_number || '',
        country: user.country || null,
        state: user.state || null,
        city: user.city || null,
        postal_code: user.postal_code || '',
        bio: user.bio || ''
      });
    }
  }, [user, reset]);

  // Handle file selection and show the image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  // Handle image upload separately (you can trigger this with a button)
  const handleImageUpload = async () => {
    if (!image) {
      toast.error("Please select an image first", {
        position: "top-right",
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("profilePicture", image);

    try {
      const response = await privateAxios.put("/users/update-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data) {
        toast.success("Image updated successfully", {
          position: "top-right",
          style: {
            backgroundColor: "#4CAF50",
            color: "#fff",
          },
        });
        // Optionally refresh user data or update local state
        setImagePreview(null); // Clear preview after successful upload
        setImage(undefined);
      }
    } catch (errorData: any) {
      toast.error(errorData.response?.data?.message || "Image upload failed", {
        position: "top-right",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
        },
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Handle delete action (reset the image preview)
  const handleDelete = () => {
    setImagePreview(null);
    setImage(undefined);
  };

  // City
  const cities: CityData[] = [
    {
      label: "Dhaka",
      value: "Dhaka"
    },
    {
      label: "Chittagong",
      value: "Chittagong",
    },
    {
      label: "Feni",
      value: "Feni",
    },
  ]

  // Country
  const countries: CountryData[] = [
    {
      label: "USA",
      value: "USA"
    },
    {
      label: "France",
      value: "France",
    },
    {
      label: "England",
      value: "England",
    },
  ]

  // State
  const states: StateData[] = [
    {
      label: "8080 Railroad St.",
      value: "8080 Railroad St."
    },
    {
      label: "States 2",
      value: "States 2",
    },
  ]

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // Format date properly
      const formattedData = {
        ...data,
        date_of_birth: data.date_of_birth ? new Date(data.date_of_birth).toISOString().split('T')[0] : null,
      };

      const response = await privateAxios.put("/users/update-user-details", formattedData);

      if (response.data) {
        toast.success("Profile updated successfully", {
          position: "top-right",
          style: {
            backgroundColor: "#4CAF50",
            color: "#fff",
          },
        });
      }
    } catch (errorData: any) {
      toast.error(errorData.response?.data?.message || "Update failed", {
        position: "top-right",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* Tabs */}
      <Tabs />

      {/* Image Upload */}
      <div className='flex flex-wrap items-center gap-2 sm:gap-5 '>
        <div>
          <div className="h-[100px] w-[100px] rounded-full overflow-hidden">
            <img
              src={imagePreview || user?.imageUrl || "/images/admin.avif"}
              alt="Admin"
              className="h-[100px] w-[100px] object-cover"
              width={100}
              height={100}
            />
          </div>
        </div>

        <label htmlFor="profileImage" className='cursor-pointer py-[14px] px-5 border border-white rounded-[100px]'>
          <input type="file" hidden id="profileImage" accept="image/*" onChange={handleImageChange} />
          <span className='text-sm font-medium'>Choose New Picture</span>
        </label>

        {image && (
          <>
            <button
              type="button"
              onClick={handleImageUpload}
              disabled={isUploading}
              className='text-sm font-medium px-5 py-[14px] rounded-[100px] bg-green-600 text-white cursor-pointer disabled:opacity-50'
            >
              {isUploading ? 'Uploading...' : 'Upload Image'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className='text-sm font-medium px-5 py-[14px] rounded-[100px] bg-red-600 text-white cursor-pointer'
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal Details Form */}
        <div className='bg-secondary-bg p-4 rounded-[8px] mt-4'>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="mb-4">
              <Label className="text-base font-medium mb-3">Name</Label>
              <Input
                {...register("name", { required: "Name is required" })}
                className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                placeholder="Enter name"
              />
              {errors.name && (
                <p className="error-msg text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label className="text-base font-medium mb-3">Email</Label>
              <Input
                readOnly
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address"
                  }
                })}
                className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="error-msg text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <Label className="text-base font-medium mb-3">Date of Birth</Label>
              <div className="relative">
                <Input
                  {...register("date_of_birth")}
                  type="date"
                  className="block h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label className="text-base font-medium mb-3">Address</Label>
              <Input
                {...register("address")}
                className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                placeholder="Enter your address"
              />
            </div>

            {/* Phone */}
            <div>
              <Label className="text-base font-medium mb-3">Phone</Label>
              <Input
                {...register("phone_number")}
                className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                placeholder="Enter phone"
              />
            </div>

            {/* Country */}
            <div>
              <Label className="text-base font-medium mb-3">Country</Label>
              <Select
                onValueChange={(val) => setValue("country", val)}
                defaultValue={user?.country || undefined}
              >
                <SelectTrigger className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-bg text-white border border-slate-700 rounded">
                  {
                    countries.map((country, idx) => {
                      return (
                        <SelectItem key={idx} value={country.value} className="cursor-pointer">
                          {country.label}
                        </SelectItem>
                      )
                    })
                  }
                </SelectContent>
              </Select>
            </div>

            {/* States */}
            <div>
              <Label className="text-base font-medium mb-3">State</Label>
              <Select
                onValueChange={(val) => setValue("state", val)}
                defaultValue={user?.state || undefined}
              >
                <SelectTrigger className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-bg text-white border border-slate-700 rounded">
                  {
                    states.map((state, idx) => {
                      return (
                        <SelectItem key={idx} value={state.value} className="cursor-pointer">
                          {state.label}
                        </SelectItem>
                      )
                    })
                  }
                </SelectContent>
              </Select>
            </div>

            {/* City */}
            <div>
              <Label className="text-base font-medium mb-3">City</Label>
              <Select
                onValueChange={(val) => setValue("city", val)}
                defaultValue={user?.city || undefined}
              >
                <SelectTrigger className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent className="bg-secondary-bg text-white border border-slate-700 rounded">
                  {
                    cities.map((city, idx) => {
                      return (
                        <SelectItem key={idx} value={city.value} className="cursor-pointer">
                          {city.label}
                        </SelectItem>
                      )
                    })
                  }
                </SelectContent>
              </Select>
            </div>

            {/* Postal Code */}
            <div>
              <Label className="text-base font-medium mb-3">Postal Code</Label>
              <Input
                {...register("postal_code")}
                className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                placeholder="Enter postal code"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4 mb-6">
            <Label className="text-base font-medium mb-3">Bio</Label>
            <Textarea
              {...register("bio")}
              className="h-[100px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              placeholder="Enter your bio"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>

        </div>
      </form>
    </>
  )
}