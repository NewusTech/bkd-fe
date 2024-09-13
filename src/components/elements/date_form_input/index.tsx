"use client";

import React from "react";
import { Calendar as CalendarIcons } from "@phosphor-icons/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import { ChevronDown } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";

export type DateInputProps = {
  value: Date;
  setValue: (value: Date) => void;
  label: React.ReactNode | string;
  disabled?: boolean;
  className?: string;
  onChange?: (value: Date) => void;
  disabledDates?: string[];
};

export default function DateFormInput(props: DateInputProps) {
  const { value, setValue, label, disabled, onChange, disabledDates, ...rest } =
    props;

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setValue(selectedDate);
      if (onChange) {
        onChange(selectedDate);
      }
    }
  };

  const disabledDatesAsDate = disabledDates?.map((date) => parseISO(date));

  return (
    <div className={twMerge(["flex flex-col w-full gap-y-2", rest.className])}>
      {typeof label !== "string" ? label : <p className="">{label}</p>}
      <div
        className={twMerge([
          `flex flex-row items-center w-full bg-line-10 border border-line-20 rounded-full py-1 px-3 ${disabled ? "opacity-50" : ""}`,
          rest.className,
        ])}>
        <CalendarIcons className="w-6 h-6 text-primary-40" />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className="w-full justify-start text-left text-[14px]"
              disabled={disabled}>
              {value ? format(value, "PPP") : "Pilih Tanggal"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Calendar
              classNames={{
                months:
                  "bg-line-10 flex flex-row justify-center items-center p-4",
                nav_button_previous: "border border-primary-40 absolute left-1",
                nav_button_next: "border border-primary-40 absolute right-1",
                day_today: "bg-primary-40 text-line-10",
              }}
              mode="single"
              selected={value}
              onSelect={(v) => handleDateSelect(v || new Date())}
              initialFocus
              disabled={(date) =>
                disabledDatesAsDate?.some(
                  (disabledDate) => date.getTime() === disabledDate.getTime()
                ) ?? false
              }
            />
          </PopoverContent>
        </Popover>
        <ChevronDown size={16} />
      </div>
    </div>
  );
}
