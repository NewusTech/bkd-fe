"use client";

import { Textarea } from "@/components/ui/textarea";
import { UserApplicationHistoryFormServiceInputJsonDataInterface } from "@/types/interface";
import { Label } from "@radix-ui/react-label";
import React from "react";

interface LayoutInputProps {
  title: string;
  value: string;
  placeholder: string;
  type: string;
  required: boolean;
  name: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  error?: string;
  options?: UserApplicationHistoryFormServiceInputJsonDataInterface[];
  opacity: boolean;
}

const LayoutInput: React.FC<LayoutInputProps> = ({
  title,
  value,
  placeholder,
  type,
  required,
  name,
  onChange,
  error,
  options,
  opacity,
}) => {
  return (
    <div className="space-y-2 flex flex-col w-full">
      <Label className="text-[14px] md:text-[16px] text-black-80 font-normal mb-[8px]">
        {title} {required && <span className="text-error-50">*</span>}
      </Label>

      {type === "textarea" ? (
        <Textarea
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className={`flex w-full border border-line-20 pl-[16px] text-[14px] md:text-[16px] rounded-xl placeholder:text-[16px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed ${
            error ? "border-error-50" : "border-line-20"
          }`}
        />
      ) : type === "radio" ? (
        <>
          <div className="grid grid-cols-2 w-full justify-between">
            {options?.map((item, idx) => (
              <div key={idx} className="flex flex-row items-center space-x-2">
                <input
                  type="radio"
                  name={name}
                  value={item.id}
                  checked={value === item.id.toString()}
                  onChange={onChange}
                  className="flex w-[15px] border border-line-20 h-[15px] text-[14px] rounded-[50px] placeholder:text-[16px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed"
                />
                <label className="text-black-80 text-[14px] md:text-[16px] font-normal">
                  {item.key}
                </label>
              </div>
            ))}
          </div>
          {required && <div className="text-error-50">Data Wajib Diisi!</div>}
        </>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className={`flex flex-col bg-transparent justify-center pr-2 w-full md:h-[50px] border placeholder:opacity-[50%] ${
            opacity
              ? "text-black-80 text-[14px] md:text-[16px]"
              : "text-black-80"
          } border-line-20 pl-[16px] h-[36px] text-[14px] rounded-[50px] placeholder:text-[16px] font-normal file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed ${
            error ? "border-error-50" : "border-line-20"
          }`}
        />
      )}
      {error && (
        <p className="text-error-50 text-[14px] md:text-[16px]">{error}</p>
      )}
    </div>
  );
};

export default LayoutInput;
