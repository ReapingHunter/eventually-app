import NavBar from "@/components/NavBar";
import EventCard from "@/components/EventCard";
import FilterEvents from "@/components/FilterEvents";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllEventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([]);
  const eventsPerPage = 28;

  // Calculate current events for display
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent)
  
  useEffect(() => {

    // Fetch events from backend
    const fetchAllEvents = async() => {
      try {
        const response = await axios.get("http://localhost:3000/api/events/all-event")
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error.message)
      }
    }
    fetchAllEvents()
  }, [])
  // Total pages calculation
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Function to handle pagination
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate dynamic pagination buttons with ellipsis
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const ellipsisThreshold = 2;

    // Add first page and ellipsis
    if (currentPage > ellipsisThreshold + 2) {
      pageNumbers.push(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => paginate(1)}>1</PaginationLink>
        </PaginationItem>
      );
      pageNumbers.push(<PaginationEllipsis key="ellipsis-start" />);
    }

    // Add dynamic middle pages
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

    // Add last page and ellipsis
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
        <FilterEvents />

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {currentEvents.map((event) => (
            <Link key={event.event_id} to={`/rsvp/${event.event_id}`}>
              <EventCard event={event} />
            </Link>
          ))}
        </div>

        {/* Pagination Controls */}
        <Pagination>
          <PaginationContent className="flex flex-wrap justify-center items-center mt-8 gap-2">
            {/* Previous Button */}
            <PaginationPrevious asChild
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage <= 1}
              className={`px-3 py-2 sm:px-4 sm:py-2 bg-transparent rounded ${
                currentPage <= 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-[#7b00d4] text-[#000000] hover:text-white"
              }`}
            />

            {/* Dynamic Page Numbers */}
            {renderPageNumbers()}

            {/* Next Button */}
            <PaginationNext asChild 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`px-3 py-2 sm:px-4 sm:py-2 bg-transparent rounded ${
                currentPage >= totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-[#7b00d4] text-[#000000] hover:text-white"
              }`}
            />

          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

