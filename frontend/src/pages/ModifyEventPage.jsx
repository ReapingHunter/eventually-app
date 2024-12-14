import NavBar from "../components/NavBar"
import { CalendarDateRangeIcon, MapPinIcon, ClockIcon, WrenchIcon, TrashIcon, UserIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/ui/button"
export default function RSVPPage(){
  return(
    <>
      <div className="bg-[#fbf3ff] min-h-screen">
        <NavBar />
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-8">
          {/* Event Banner */}
          <img
            src="https://via.placeholder.com/400x200" // Replace with actual image
            alt="Event"
            className="w-full h-64 sm:h-72 md:h-96 object-cover rounded-xl mb-4"
          />

          {/* Event Details */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#46007a]">
              Insert Event Name Here
            </h2>

            {/* Event Date */}
            <div className="flex items-center text-sm text-gray-700">
              <CalendarDateRangeIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>Mar 21 2025</p>
            </div>

            {/* Event Time */}
            <div className="flex items-center text-sm text-gray-700">
              <ClockIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>10:00 AM - 5:00 PM IST</p>
            </div>

            {/* Event Location */}
            <div className="flex items-center text-sm text-gray-700">
              <MapPinIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>Replace it with the event location from the backend. May integrate it with Google Maps.</p>
            </div>

            {/* About the Event */}
            <h3 className="text-lg md:text-2xl font-semibold text-[#46007a]">About this Event</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
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
              <Button className=" flex bg-yellow-600 hover:brightness-110 transition text-white font-semibold py-2 px-6 rounded-lg shadow-md gap-2">
                <WrenchIcon className="w-5 h-5"/>
                Update
              </Button>
              <Button className=" flex bg-red-500 hover:brightness-110 transition text-white font-semibold py-2 px-6 rounded-lg shadow-md gap-2">
                <TrashIcon className="w-5 h-5"/>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}