"use client"

import React from 'react'
import { useRouter } from 'next/navigation'
import CreatorContentTable from './CreatorContentTable'

export default function UploaderPageContent() {

  const router = useRouter()

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium leading-[160%] text-white mb-4">Uploader Content</h1>

        {/* <button onClick={() => router.push('/dashboard/content-management/add-content')} className="text-base font-medium leading-[100%] text-white flex justify-center items-center gap-2.5 [background:var(--Primary-color,#7A24BC)] px-5 py-2.5 rounded-lg cursor-pointer">
          + Add new content
        </button> */}
      </div>

      <CreatorContentTable />
    </div>
  )
}
