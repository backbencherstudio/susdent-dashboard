"use client";

import React from "react";
import { SeriesUploadForm } from "./SeriesUploadForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { EpisodesUploadForm } from "./EpisodesUploadForm";

export default function AddSeriesPageContent() {
  return (
    <Tabs defaultValue="series" className="w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-medium text-white">Add Series</h1>

{/* 
        <button onClick={() => toast.success("Hello World")}>Show toast</button> */}

        <TabsList className="flex bg-transparent p-0">
          <TabsTrigger
            value="series"
            className="h-11 bg-[rgba(122,36,188,0.15)] text-base font-medium text-white flex items-center justify-center px-4 rounded-l-lg rounded-r-none data-[state=active]:bg-[#7A24BC]"
          >
            Series Upload
          </TabsTrigger>

          <TabsTrigger
            value="episodes"
            className="h-11 bg-[rgba(122,36,188,0.15)] text-base font-medium text-white flex items-center justify-center px-4 rounded-r-lg rounded-l-none data-[state=active]:bg-[#7A24BC]"
          >
            Episodes Upload
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Body Content */}
      <TabsContent value="series">
        <SeriesUploadForm />
      </TabsContent>

      <TabsContent value="episodes">
        <div>
          <EpisodesUploadForm />
        </div>
      </TabsContent>
    </Tabs>
  );
}