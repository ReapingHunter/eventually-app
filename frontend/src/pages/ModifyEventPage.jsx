import NavBar from "../components/NavBar"
import { CalendarDateRangeIcon, MapPinIcon, ClockIcon, WrenchIcon, TrashIcon, UserIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

export default function ModifyEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  
  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/events/${id}`);
          setEvent(response.data);
        } catch (error) {
          console.error("Error fetching event:", error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchEvent();
    }
  }, [id]);

  const handleUpdate = () => {
    navigate("/update-event", {
      state: { event }  // Pass the entire event object, including the dateTime
    });
  }

  const handleDelete = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/events/delete-event/${id}`);
      if (response.status === 200) {
        console.log("Event deleted successfully");
        navigate("/manage-event"); // Redirect to events page after deletion
      }
    } catch (error) {
      console.error("Error deleting event:", error.message);
    } finally {
      setShowDeletePopup(false); // Close the popup after deletion attempt
    }
  };

  // Loading or error states
  if (loading) {
    return <div className="text-center mt-16">Loading event details...</div>;
  }

  if (!event) {
    return <div className="text-center mt-16 text-red-500">Event not found.</div>;
  }

  return (
    <>
      <div className="bg-[#fbf3ff] min-h-screen">
        <NavBar />
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-8">
          {/* Event Banner */}
          <img
            src={event.photo || "https://via.placeholder.com/400x200"}
            alt={event.title || "Event"}
            className="w-full h-64 sm:h-72 md:h-96 object-cover rounded-xl mb-4"
          />

          {/* Event Details */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#46007a]">
              {event.title}
            </h2>

            {/* Event Date */}
            <div className="flex items-center text-sm text-gray-700">
              <CalendarDateRangeIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>{event.event_datetime.split('T')[0]}</p>
            </div>

            {/* Event Time */}
            <div className="flex items-center text-sm text-gray-700">
              <ClockIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>{event.event_datetime.split('T')[1].split('.')[0]}</p>
            </div>

            {/* Event Location */}
            <div className="flex items-center text-sm text-gray-700">
              <MapPinIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>{event.address}</p>
            </div>

            {/* About the Event */}
            <h3 className="text-lg md:text-2xl font-semibold text-[#46007a]">About this Event</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* RSVP Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6 flex flex-col sm:flex-row justify-between items-center">
            {/* RSVP Count */}
            <div className="flex items-center text-sm text-gray-700">
              <UserIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>
                <span className="font-bold">150</span> people have RSVP&apos;d for this event {/* Replace the number from backend */}
              </p>
            </div>

            <div className="flex justify-between items-center space-x-2 max-md:pt-8">
              <Button className="flex bg-yellow-600 hover:brightness-110 transition text-white font-semibold py-2 px-6 rounded-lg shadow-md gap-2"
                      onClick={handleUpdate}
              >
                <WrenchIcon className="w-5 h-5"/>
                Update
              </Button>
              <Button className="flex bg-red-500 hover:brightness-110 transition text-white font-semibold py-2 px-6 rounded-lg shadow-md gap-2" onClick={() => setShowDeletePopup(true)}>
                <TrashIcon className="w-5 h-5"/>
                Delete
              </Button>
            </div>
          </div>
        </div>

        {/* Popup Overlay */}
        {showDeletePopup && (
          <>
            {/* Dimmed Background */}
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>

            {/* Popup */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg z-20 p-6 w-11/12 max-w-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this event? This action cannot be
                undone.
              </p>
              <div className="flex justify-end gap-4">
                <Button
                  onClick={() => setShowDeletePopup(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-md"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}  // Move the delete action here
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
