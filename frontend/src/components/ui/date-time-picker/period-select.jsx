"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Period, display12HourValue, setDateByType } from "./time-picker-utils";
import PropTypes from "prop-types"

TimePeriodSelect.propTypes = {
  period: PropTypes.oneOf(['AM', 'PM']).isRequired,
  setPeriod: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date),
  setDate: PropTypes.func.isRequired,
  onLeftFocus: PropTypes.func,
  onRightFocus: PropTypes.func,
}

export const TimePeriodSelect = React.forwardRef(({
    period,
    setPeriod,
    date,
    setDate,
    onLeftFocus,
    onRightFocus
}, ref) => {
    const handleKeyDown = (e) => {
        if (e.key === "ArrowRight") onRightFocus?.();
        if (e.key === "ArrowLeft") onLeftFocus?.();
    };

    const handleValueChange = (value) => {
        setPeriod(value);

        /**
         * trigger an update whenever the user switches between AM and PM;
         * otherwise user must manually change the hour each time
         */
        if (date) {
            const tempDate = new Date(date);
            const hours = display12HourValue(date.getHours());
            setDate(setDateByType(tempDate, hours.toString(), "12hours", period === "AM" ? "PM" : "AM"));
        }
    };

    return (
        <div className="flex h-10 items-center">
            <Select defaultValue={period} onValueChange={handleValueChange}>
                <SelectTrigger ref={ref} className="w-[65px] focus:bg-accent focus:text-accent-foreground" onKeyDown={handleKeyDown}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="AM">AM</SelectItem>
                    <SelectItem value="PM">PM</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
});

TimePeriodSelect.displayName = "TimePeriodSelect";
