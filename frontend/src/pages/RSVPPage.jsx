import NavBar from "../components/NavBar";
import {
  CalendarDateRangeIcon,
  MapPinIcon,
  ClockIcon,
  SparklesIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function RSVPPage() {
  const { id } = useParams()

  const [ event, setEvent ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    if(id){
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/events/${id}`);
          setEvent(response.data)
        } catch (error) {
          console.error("Error fetching event:", error.message)
        } finally {
          setLoading(false)
        }
      }
      fetchEvent()
    }
  }, [id])

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
              <p>{event.event_date.split("T")[0]}</p>
            </div>

            {/* Event Time */}
            <div className="flex items-center text-sm text-gray-700">
              <ClockIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>{event.event_time}</p>
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

          {/* Agenda Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="flex items-center text-sm">
              <ClockIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <h3 className="text-lg md:text-xl font-semibold text-[#46007a]">Agenda</h3>
            </div>
            <ul className="mt-4 text-sm text-gray-700 list-disc list-inside space-y-2">
              <li>
                <span className="font-bold">10:00 AM:</span> Registration and Welcome Speech
              </li>
              <li>
                <span className="font-bold">11:00 AM:</span> Keynote Presentation: *Future of Automotive Design*
              </li>
              <li>
                <span className="font-bold">12:30 PM:</span> Networking Lunch
              </li>
              <li>
                <span className="font-bold">2:00 PM:</span> Panel Discussion: *Sustainability in the Automotive Industry*
              </li>
              <li>
                <span className="font-bold">4:00 PM:</span> Workshop: *Hands-on with Luxury Vehicles*
              </li>
              <li>
                <span className="font-bold">5:30 PM:</span> Closing Remarks and Thank You
              </li>
            </ul>
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

            {/* RSVP Button */}
            <button className="mt-4 sm:mt-0 flex bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] hover:brightness-110 transition text-white font-semibold py-2 px-6 rounded-lg shadow-md gap-2">
              <SparklesIcon className="w-5 h-5" />
              RSVP Now
            </button>
          </div>

          {/* Organizer Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h3 className="text-lg md:text-xl font-semibold text-[#46007a]">Organizer</h3>
            <div className="mt-4 flex flex-wrap gap-6">
              {/* Organizer 1 */}
              <div className="flex items-center gap-4">
                <img
                  src="https://via.placeholder.com/50" // Replace with organizer image
                  alt="Organizer 1"
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div>
                  <p className="font-medium">Organizer Name 1</p>
                  <p className="text-sm text-gray-600">Position/Role</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
