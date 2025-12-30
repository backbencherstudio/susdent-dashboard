import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"; // Standard Shadcn utility

interface SelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  defaultValue?: string;
}

const CustomSelect = ({
  options,
  placeholder,
  onValueChange,
  className,
  defaultValue,
}: CustomSelectProps) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger
        className={cn(
          "bg-[#0D121E] border-[#E9E9EA] text-gray-300 hover:text-white transition-colors ",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-[#0D121E] border-gray-800 text-white  min-w-fit ">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="focus:bg-[#311B52] focus:text-white cursor-pointer rounded-sm mb-1 last:mb-0 "
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;