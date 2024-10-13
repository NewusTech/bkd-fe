"use client";

import React from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar as CalendarIcons } from "@phosphor-icons/react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { id } from "date-fns/locale";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type DateInputProps = {
    value: Date;
    setValue: (value: Date) => void;
    label: React.ReactNode | string;
    disabled?: boolean;
    className?: string;
    onChange?: (value: Date) => void;
    disabledDates?: string[];
};

export default function DateFormInputNew(props: DateInputProps) {
    const { value, setValue, label, disabled, onChange, disabledDates, ...rest } = props;

    const handleDateSelect = (selectedDate: Date | null) => {
        if (selectedDate) {
            setValue(selectedDate);
            if (onChange) {
                onChange(selectedDate);
            }
        }
    };

    const disabledDatesAsDate = disabledDates?.map((date) => parseISO(date));

    return (
        <div className={cn("flex flex-col w-full gap-y-2", rest.className)}>
            {typeof label !== "string" ? (
                label
            ) : (
                <p className="text-[14px] md:text-[16px]">{label}</p>
            )}
            <Popover>
                <PopoverTrigger className="lg:py-4 lg:px-4 px-4" asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-between text-left font-normal text-[14px] md:text-[16px] h-12" ,
                            !value && "text-muted-foreground"
                        )}
                        disabled={disabled}
                    >
                        {value ? format(value, "dd/MM/yyyy", { locale: id }) : <span>Tanggal</span>}
                        {/* <CalendarIcon className="h-4 w-4 text-primary" /> */}
                        <CalendarIcons className="w-6 h-6 text-primary-40" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <DatePicker
                        inline
                        selected={value}
                        onChange={handleDateSelect}
                        showYearDropdown
                        dateFormat="dd/MM/yyyy"
                        className="w-full border border-gray-300 rounded-md text-[14px] md:text-[16px]"
                        yearDropdownItemNumber={15}
                        scrollableYearDropdown
                        locale={id}
                        excludeDates={disabledDatesAsDate}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}