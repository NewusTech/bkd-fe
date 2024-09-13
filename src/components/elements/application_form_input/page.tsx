import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function ApplicationFormInputPages({
  value,
  onChange,
  name,
  id,
  placeholder,
  type,
  label,
}: any) {
  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="w-full focus-within:text-primary-70 flex flex-col gap-y-2">
        <Label
          htmlFor={id}
          className="focus-within:text-primary-70 font-normal text-sm">
          {label}
        </Label>

        <Input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          className="w-full focus-visible:text-black-70 focus-visible:border focus-visible:border-primary-70"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
