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
import { useState, useEffect } from "react";
import axios from "axios";
import { addDays, format } from "date-fns";


export default function FilterEvents() {

  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([])
  const [categoryValue, setCategoryValue] = useState("");

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories/all-categories")
        setCategories(response.data)
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    }
    fetchAllCategories()
  }, [])
  return (
    <>
      <div className="flex flex-col lg:flex-row bg-[#fdfdfd] border-2 px-4 sm:px-5 py-5 items-center justify-center drop-shadow-xl w-full rounded-lg mb-4 gap-4">
        {/* Event Name Filter */}
        <Input
          className="bg-[#f7f7f7] border-0 rounded-md shadow-inner w-full mb-0"
          placeholder="Search Event name"
        />

        {/* Event Location Filter */}
        <Input
          className="bg-[#f7f7f7] border-0 rounded-md shadow-inner w-full mb-0"
          placeholder="Search Event location"
        />

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "bg-[#f7f7f7] rounded-md border w-full lg:w-1/2 justify-start text-left font-medium",
                !dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="text-[#7b00d4]"/>
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
              numberOfMonths={1}
              classNames={{
                day_selected: "bg-[#7b00d4] text-white hover:bg-[#8800f0] hover:text-white focus:bg-[#7b00d4] focus:text-white",
                day_today: "bg-accent text-[#000000]",
                day_range_middle: "bg-[#f3e2ff] text-[#000000]"
              }}
            />
          </PopoverContent>
        </Popover>

        {/* Event Category Filter */}
        <Popover open={isCategoryOpen} onOpenChange={setCategoryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isCategoryOpen}
              className="bg-[#f7f7f7] rounded-md border w-full lg:w-1/2 justify-between"
            >
              {categoryValue
                ? categories.find((category) => category.category_name === categoryValue)?.category_name
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
                      key={category.category_id}
                      value={category.category_id}
                      onSelect={(currentVal) => {
                        setCategoryValue(currentVal === categoryValue ? "" : currentVal);
                        setCategoryOpen(false);
                      }}
                    >
                      {category.category_name}
                      <Check
                        className={cn(
                          "ml-auto",
                          categoryValue === category.category_name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

