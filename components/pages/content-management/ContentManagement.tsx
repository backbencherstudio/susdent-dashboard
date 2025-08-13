import React from "react";
import ContentTable from "./ContentTable";
import Link from "next/link";

export default function ContentManagement() {
  return (
    <div className="space-y-4">
      {/* title */}
      <ContentManagementTitle />

      {/* filter and table  */}
      <div>
        <ContentTable />
      </div>
    </div>
  );
}

export const ContentManagementTitle = () => {
  return (
    <div className="flex items-center  justify-between">
      <h2 className="text-lg font-medium leading-[160%] text-white">
        Content Management
      </h2>

      <Link href={"content-management/add-content"}>
        <button className="text-base font-medium leading-[100%] text-white flex justify-center items-center gap-2.5 [background:var(--Primary-color,#7A24BC)] px-5 py-2.5 rounded-lg cursor-pointer">
          + Add new content
        </button>
      </Link>
    </div>
  );
};
