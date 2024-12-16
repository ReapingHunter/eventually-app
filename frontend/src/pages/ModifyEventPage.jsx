import NavBar from "../components/NavBar"
import { CalendarDateRangeIcon, MapPinIcon, ClockIcon, WrenchIcon, TrashIcon, UserIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
export default function ModifyEventPage({id, event}){
  const [showDeletePopup, setShowDeletePopup] = useState(false)

  useEffect(() => {
    const deleteEvent = async () => {

    }

    deleteEvent()
  }, [])

  const handleDelete = () => {
    setShowDeletePopup(false)
  }
  return(
    <>
      <div className="bg-[#fbf3ff] min-h-screen">
        <NavBar />
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-8">
          {/* Event Banner */}
          <img
            src={event.photo} // Replace with actual image
            alt="Event"
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
              <p>{event.event_date}</p>
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

            <div className="flex justify-between items-center space-x-2 max-md:pt-8">
              <Link to="/update-event">
                <Button className=" flex bg-yellow-600 hover:brightness-110 transition text-white font-semibold py-2 px-6 rounded-lg shadow-md gap-2">
                  <WrenchIcon className="w-5 h-5"/>
                  Update
                </Button>
              </Link>
              <Button className=" flex bg-red-500 hover:brightness-110 transition text-white font-semibold py-2 px-6 rounded-lg shadow-md gap-2" onClick={setShowDeletePopup(true)}>
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
                  onClick={handleDelete}
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
  )
}

ModifyEventPage.propTypes = {
  id: PropTypes.number.isRequired,
  event: PropTypes.shape({
    photo: PropTypes.string,
    title: PropTypes.string.isRequired,
    event_date: PropTypes.string.isRequired,
    event_time: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired

  }).isRequired,
}