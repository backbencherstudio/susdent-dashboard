"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

export function ContentUploadForm() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  return (
    <div className="">
      <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[580px] ">
        {/* Upload Area */}
        <div className="space-y-6 overflow-hidden">
          <div
            className={`border border-dashed flex flex-col items-center  justify-between h-full rounded-lg p-8 text-center transition-colors bg-[#131824] ${
              dragActive
                ? "border-purple-500 bg-purple-500/10"
                : "border-slate-700 hover:border-slate-600"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="h-40"></div>

            <div className="flex flex-col items-center  space-y-4">
              <div className="flex w-[134px] h-[134px] justify-center items-center gap-2.5 bg-[#0D121E] p-[35px] rounded-full ">
                <Upload className="w-12 h-12 text-slate-400" />
              </div>
              <div className="space-y-2">
                <p className="text-slate-300 font-medium">
                  Drag and drop video files to upload
                </p>
                <p className="text-[#A5A5AB] text-sm">
                  Your videos will be private until <br /> you publish them.
                </p>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6">
                Select files
              </Button>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed mt-18">
              By submitting your videos to streaming app, you acknowledge that
              you agree to streaming{" "}
              <span className="text-purple-400 underline cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-purple-400 underline cursor-pointer">
                Community Guidelines
              </span>
              .
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-base font-medium text-slate-300 block">
                Title
              </label>
              <Input
                placeholder="Type your movie name"
                className="bg-[#131824] border-[#1B202C] rounded text-slate-100 placeholder:text-slate-500"
              />
            </div>
            <div className=" space-y-3 w-full ">
              <label className="text-base font-medium text-slate-300 block">
                Genre
              </label>
              <Select defaultValue="comedy">
                <SelectTrigger className="bg-[#131824] border-[#1B202C] rounded text-slate-100 placeholder:text-slate-500 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#131824] border-slate-700 text-white">
                  <SelectItem value="comedy">Comedy</SelectItem>
                  <SelectItem value="drama">Drama</SelectItem>
                  <SelectItem value="action">Action</SelectItem>
                  <SelectItem value="horror">Horror</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-base font-medium text-slate-300">
              Description
            </label>
            <Textarea
              placeholder="Enter a short description"
              className="flex h-[100px] items-start gap-2.5 self-stretch rounded border border-[color:var(--Line-Color,#1B202C)] [background:#131824] px-4 py-3 border-solid"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 w-full">
              <label className="text-base font-medium text-slate-300 block">
                Content type
              </label>
              <Select defaultValue="movie">
                <SelectTrigger className="bg-[#131824] border-[#1B202C] rounded text-slate-100 placeholder:text-slate-500 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#131824] border-slate-700 text-white">
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="series">Series</SelectItem>
                  <SelectItem value="documentary">Documentary</SelectItem>
                  <SelectItem value="short">Short Film</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label className="text-base font-medium text-slate-300 block">
                Content Status
              </label>
              <Select defaultValue="published">
                <SelectTrigger className="bg-[#131824] border-[#1B202C] rounded text-slate-100 placeholder:text-slate-500 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#131824] border-slate-700 text-white">
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-base block font-medium text-slate-300">
              Thumbnail Image
            </label>
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex h-[141px] justify-center items-center gap-2.5 self-stretch rounded border border-[color:var(--Line-Color,#1B202C)] [background:#131824] px-4 py-3 border-solid">
                    <span className="text-black [font-family:Inter] text-sm font-normal leading-[100%] flex justify-center items-center gap-2.5 [background:#FFF] px-2 py-1 rounded">
                      Choose File
                    </span>
                    <span className="text-slate-400">No file chosen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="">
            <Button className="flex justify-center items-center gap-2.5 self-stretch rounded [background:var(--Primary-color,#7A24BC)] px-6 py-[13px]  text-sm font-medium leading-[130%] w-full">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
