import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Check, ChevronDown, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { addDays, format } from "date-fns";

const locations = [
  {
    value: "cebu",
    label: "Cebu",
  },
  {
    value: "bohol",
    label: "Bohol",
  },
];

const categories = [
  {
    value: "networking",
    label: "Networking",
  },
  {
    value: "wedding",
    label: "Wedding",
  },
];

export default function FilterEvents() {
  const [isLocationOpen, setLocationOpen] = useState(false);
  const [locationValue, setLocationValue] = useState("");

  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  return (
    <>
      <div className="flex bg-[#fdfdfd] border-2 px-4 py-4 items-center justify-center drop-shadow-xl w-full mb-4 gap-4">
        {/* Event Name Filter */}
        <Input
          className="bg-[#f7f7f7] border-0 rounded-none shadow-inner w-1/2"
          placeholder="Search Event name"
        />

        {/* Event Location Filter */}
        <Popover open={isLocationOpen} onOpenChange={setLocationOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isLocationOpen}
              className="bg-[#f7f7f7] mb-4 rounded-none border"
            >
              {locationValue
                ? locations.find((location) => location.value === locationValue)?.label
                : "Select Location..."}
              <ChevronDown className="text-[#7b00d4]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Location..." />
              <CommandList>
                <CommandEmpty>No locations found...</CommandEmpty>
                <CommandGroup>
                  {locations.map((location) => (
                    <CommandItem
                      key={location.value}
                      value={location.value}
                      onSelect={(currentVal) => {
                        setLocationValue(currentVal === locationValue ? "" : currentVal);
                        setLocationOpen(false);
                      }}
                    >
                      {location.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          locationValue === location.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Event Category Filter */}
        <Popover open={isCategoryOpen} onOpenChange={setCategoryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isCategoryOpen}
              className="bg-[#f7f7f7] mb-4 rounded-none border"
            >
              {categoryValue
                ? categories.find((category) => category.value === categoryValue)?.label
                : "Select Category..."}
              <ChevronDown className="text-[#7b00d4]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Category..." />
              <CommandList>
                <CommandEmpty>No categories found...</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category.value}
                      value={category.value}
                      onSelect={(currentVal) => {
                        setCategoryValue(currentVal === categoryValue ? "" : currentVal);
                        setCategoryOpen(false);
                      }}
                    >
                      {category.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          categoryValue === category.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "bg-[#f7f7f7] mb-4 rounded-none border w-[300px] justify-start text-left font-normal",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Select a date range...</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
