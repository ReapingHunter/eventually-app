
import NavBar from "@/components/NavBar";
import EventCard from "@/components/EventCard";
import { useState } from "react";

const events = new Array(50).fill(null).map((_, index) => ({ id: index, name: `Event ${index + 1}` })); // Sample events data (50 events)

export default function AllEventsPage() {
  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 30;

  // Calculate the index of the first and last event on the current page
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;

  // Slice the events array to get the events for the current page
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Calculate the total number of pages
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Function to change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">All Events</h1>
        
        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {currentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="flex items-center">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
