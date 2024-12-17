import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Link } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import axios from "axios";
import { format } from "date-fns";
import { isAuthenticated } from "@/utils/auth";
import NavBar from "@/components/NavBar";
import EventCard from "@/components/EventCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AllEventsPage() {
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const eventsPerPage = 28;
  const [filters, setFilters] = useState({
    eventName: "",
    location: "",
    dateRange: {
      from: undefined,
      to: undefined,
    },
    category: "",
  });

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Fetch categories
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

  // Fetch user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userSession = await isAuthenticated();
        setUserId(userSession.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error.message);
      }
    };
    fetchUserId();
  }, []);

  // Fetch events based on filters
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

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsisThreshold = 2;

    if (currentPage > ellipsisThreshold + 2) {
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => paginate(1)}>1</PaginationLink>
        </PaginationItem>
      );
      pageNumbers.push(<PaginationEllipsis key="ellipsis-start" />);
    }

    for (
      let i = Math.max(1, currentPage - ellipsisThreshold);
      i <= Math.min(totalPages, currentPage + ellipsisThreshold);
      i++
    ) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => paginate(i)}
            className={`px-3 py-1 rounded border ${
              currentPage === i ? "bg-[#7b00d4] text-white" : ""
            }`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (currentPage < totalPages - (ellipsisThreshold + 1)) {
      pageNumbers.push(<PaginationEllipsis key="ellipsis-end" />);
      pageNumbers.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => paginate(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8 text-center sm:text-left">
          All Events
        </h1>
        <div className="flex flex-col lg:flex-row bg-[#fdfdfd] border-2 px-4 sm:px-5 py-5 items-center justify-center drop-shadow-xl w-full rounded-lg mb-4 gap-4">
          <Input
            className="bg-[#f7f7f7] border-0 rounded-md shadow-inner w-full mb-0"
            placeholder="Search Event name"
            value={filters.eventName}
            onChange={(e) => handleInputChange("eventName", e.target.value)}
          />

          <Input
            className="bg-[#f7f7f7] border-0 rounded-md shadow-inner w-full mb-0"
            placeholder="Search Event location"
            value={filters.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />

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
                      {format(filters.dateRange.from, "LLL dd, y")} - {format(filters.dateRange.to, "LLL dd, y")}
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

          <Popover open={isCategoryOpen} onOpenChange={setCategoryOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={isCategoryOpen}
                className="bg-[#f7f7f7] rounded-md border w-full lg:w-1/2 justify-between"
              >
                {filters.category
                  ? categories.find((category) => category.category_id === filters.category)?.category_name
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
                            category.category_id === filters.category ? "" : category.category_id
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {currentEvents.length === 0 ? (
          <p>No events found</p>  // You can display a message if no events are returned
        ) : (
          currentEvents.map((event) => (
            <Link key={event.event_id} to={userId === event.user_id ? `/modify-event/${event.event_id}` : `/rsvp/${event.event_id}`}>
              <EventCard event={event} />
            </Link>
          ))
        )}
        </div>

        <Pagination>
          <PaginationContent className="flex flex-wrap justify-center items-center mt-8 gap-2">
            <PaginationPrevious
              asChild
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage <= 1}
            />
            {renderPageNumbers()}
            <PaginationNext
              asChild
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage >= totalPages}
            />
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}