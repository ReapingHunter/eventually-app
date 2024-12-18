"use client";

import React from "react";
import { add, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "./time-picker-demo";

export function DateTimePicker({ value, onChange }) {
  const [date, setDate] = React.useState(value);

  // Handle date selection and pass the updated date to the parent component
  const handleSelect = (newDay) => {
    if (!newDay) return;
    if (!date) {
      setDate(newDay);
      onChange(newDay);  // Notify parent of the change
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
    onChange(newDateFull);  // Notify parent of the change
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-1/2 max-md:w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
          classNames={{
            day_selected: "bg-[#7b00d4] text-white hover:bg-[#8800f0] hover:text-white focus:bg-[#7b00d4] focus:text-white",
            day_today: "bg-accent text-[#000000]",
          }}
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
