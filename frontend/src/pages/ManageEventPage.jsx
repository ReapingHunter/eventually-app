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
import FilterEvents from "@/components/FilterEvents";
import { isAuthenticated } from "@/utils/auth";
import { PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function MyEventsPage() {
  const [isHovered, setIsHovered] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([])
  const eventsPerPage = 12;

  // Total pages calculation
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Calculate current events for display
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  useEffect(() => {
    // Fetch events according to user
    const fetchEventsByUser = async () => {
      try {
        const userSession = await isAuthenticated()
        if(!userSession || !userSession.userId){
          return;
        }
        
        const response = await axios.get(`http://localhost:3000/api/events/user/${userSession.userId}`)
        
        setEvents(response.data)
      } catch (error) {
        console.error("Error fetching events:", error.message)
      }
    }
    fetchEventsByUser()
  }, [])
  // Pagination function
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold">Your Events</h1>
          <a href="/createevent">
            <button
                className={`bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] rounded-full p-3 flex items-center gap-2 text-white font-semibold transition-all duration-300 ease-in-out
                        ${isHovered ? "px-6" : "px-3 justify-center"}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <PlusIcon className="w-6 h-6" />
                {isHovered && (
                  <span className="transition-opacity duration-300 delay-100">
                    Create Event
                  </span>
                )}
            </button>
          </a>
        </div>
        <FilterEvents />
        {/* Display message if no events */}
        {events.length === 0 ? (
          <p className="text-gray-500 text-center">
            You haven&apos;t created any events yet.
          </p>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
}
