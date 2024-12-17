import { useState, useEffect } from "react";
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
import axios from "axios";
import { addDays, format } from "date-fns";

export default function FilterEvents() {
  const [events, setEvents] = useState([]);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    eventName: "",
    location: "",
    dateRange: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
    category: "",
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories/all-categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };
    fetchAllCategories();
  }, []);

  // Fetch events when filters change
  useEffect(() => {
    const fetchFilteredEvents = async () => {
      try {
        const { eventName, location, dateRange, category } = filters;

        const params = {
          title: eventName || undefined,
          address: location || undefined,
          from_date: dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : undefined,
          to_date: dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : undefined,
          category_id: category || undefined,
        };

        console.log(params)
        const response = await axios.get(
          "http://localhost:3000/api/events/filter",
          { params }
        );

        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };

    fetchFilteredEvents();
  }, [filters]);

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      {/* Filter UI */}
      <div className="flex flex-col lg:flex-row bg-[#fdfdfd] border-2 px-4 sm:px-5 py-5 items-center justify-center drop-shadow-xl w-full rounded-lg mb-4 gap-4">
        {/* Event Name Filter */}
        <Input
          className="bg-[#f7f7f7] border-0 rounded-md shadow-inner w-full mb-0"
          placeholder="Search Event name"
          value={filters.eventName}
          onChange={(e) => handleInputChange("eventName", e.target.value)}
        />

        {/* Event Location Filter */}
        <Input
          className="bg-[#f7f7f7] border-0 rounded-md shadow-inner w-full mb-0"
          placeholder="Search Event location"
          value={filters.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />

        {/* Date Range Picker */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "bg-[#f7f7f7] rounded-md border w-full lg:w-1/2 justify-start text-left font-medium",
                !filters.dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="text-[#7b00d4]" />
              {filters.dateRange?.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                    {format(filters.dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(filters.dateRange.from, "LLL dd, y")
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
              defaultMonth={filters.dateRange?.from}
              selected={filters.dateRange}
              onSelect={(range) =>
                handleInputChange("dateRange", range || { from: null, to: null })
              }
              numberOfMonths={1}
              classNames={{
                day_selected:
                  "bg-[#7b00d4] text-white hover:bg-[#8800f0] hover:text-white focus:bg-[#7b00d4] focus:text-white",
                day_today: "bg-accent text-[#000000]",
                day_range_middle: "bg-[#f3e2ff] text-[#000000]",
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
              {filters.category
                ? categories.find(
                    (category) => category.category_id === filters.category
                  )?.category_name
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
                      onSelect={() =>
                        handleInputChange(
                          "category",
                          category.category_id === filters.category
                            ? ""
                            : category.category_id
                        )
                      }
                    >
                      {category.category_name}
                      <Check
                        className={cn(
                          "ml-auto",
                          filters.category === category.category_id
                            ? "opacity-100"
                            : "opacity-0"
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

      {/* Event List */}
      <div>
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.event_id} className="border p-4 rounded mb-4">
              <h3 className="font-bold text-lg">{event.title}</h3>
              <p>{event.address}</p>
              <p>{format(new Date(event.event_datetime), "PPP")}</p>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
}
