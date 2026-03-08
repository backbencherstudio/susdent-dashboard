'use client';

// CreatorFilters.tsx
import CustomSelect from "@/components/reusable/CustomSelect";
export default function CreatorFilters({
    filters,
    handleFilterChange,
  }: {
    filters: { status: string; plan: string };
    handleFilterChange: (key: "status" | "plan") => (value: string) => void;
  }) {
    return (
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Permission Request</h2>
        <div className="flex items-center gap-4">
          <CustomSelect
            placeholder="Status"
            defaultValue={filters.status || "all"}
            onValueChange={handleFilterChange("status")}
            options={[
              { label: "All Status", value: "all" },
              { label: "Active",    value: "active" },
              { label: "Suspended",   value: "suspended" },
            ]}
          />
          <CustomSelect
            placeholder="Plans"
            defaultValue={filters.plan || "all"}
            onValueChange={handleFilterChange("plan")}
            options={[
              { label: "All Plans",    value: "all" },
              { label: "Basic",        value: "basic" },
              { label: "Family",       value: "family" },
              { label: "Most Popular", value: "most-popular" },
            ]}
          />
        </div>
      </div>
    );
  }