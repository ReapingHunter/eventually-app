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
import { Button } from "@/components/ui/button";
import { useState } from "react";

const events = new Array(150).fill(null).map((_, index) => ({
  id: index,
  name: `Event ${index + 1}`,
})); // Sample events data (150 events)

export default function AllEventsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 28;

  // Total pages calculation
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Calculate current events for display
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

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
        <h1 className="text-5xl font-bold mb-8">All Events</h1>
        <FilterEvents />

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {currentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Pagination Controls */}
        <Pagination>
          <PaginationContent className="flex justify-center mt-4 gap-2">
            {/* Previous Button */}
            <PaginationPrevious asChild>
              <Button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border ${
                  currentPage === 1 ? "text-gray-400 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </Button>
            </PaginationPrevious>

            {/* Dynamic Page Numbers */}
            {renderPageNumbers()}

            {/* Next Button */}
            <PaginationNext asChild>
              <Button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border ${
                  currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : ""
                }`}
              >
                Next
              </Button>
            </PaginationNext>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}
