import NavBar from "../components/NavBar"
import { CalendarDateRangeIcon, MapPinIcon, ClockIcon, SparklesIcon, UserIcon } from "@heroicons/react/24/solid"
export default function RSVPPage(){
  return(
    <>
      <div className="justify-center items-center">
        <NavBar />
        <div className="bg-[#e8eefe] h-full">
          <div className="px-64 py-8">
            <img
              src="https://via.placeholder.com/400x200" // Replace with actual image
              alt="Event"
              className="w-full h-96 object-cover rounded-xl mb-4"
            />
            <div className="bg-[#ffffff] rounded-xl shadow-md p-6 flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-[#46007a]">
                Insert Event name here
              </h2>
              <div className="flex items-center text-sm text-gray-700">
                <CalendarDateRangeIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
                <p>Fri, Mar 21 2025 at 10:00 AM - Sun, Mar 23 2025 at 5:00 PM IST</p> {/* Replace it with the event date from the backend. May integrate it with google calendar*/}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <MapPinIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
                <p>Replace it with the event location from the backend. May integrate it with google map</p>
              </div>
              <h3 className="text-2xl text-[#46007a]">
                About this event
              </h3>
              <div className="flex items-center text-sm">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,     {/* Replace it with the event description from the backend */}
                  sed do eiusmod tempor incididunt ut labore et dolore magna 
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit 
                  esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
                  occaecat cupidatat non proident, sunt in culpa qui officia 
                  deserunt mollit anim id est laborum.
                </p>
              </div>

              {/* Agenda section. Replace it with a data in the backend*/}
              <div>
                <div className="flex items-center text-sm">
                  <ClockIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
                  <h3 className="text-xl font-semibold text-[#46007a]">Agenda</h3>
                </div>
                <ul className="mt-4 text-sm text-gray-700 list-disc list-inside">
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
              <div className="flex justify-between items-center mt-8">
                {/* RSVP Count */}
                <div className="flex items-center text-sm text-gray-700">
                  <UserIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
                  <p>
                    <span className="font-bold">150</span> people have RSVP&apos;d for this event {/* Replace the number from the backend*/}
                  </p>
                </div>
                
                {/* RSVP Button */}
                <button className=" flex bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] text-white font-semibold py-2 px-6 rounded-lg shadow-md gap-2">
                  <SparklesIcon className="w-5 h-5"/>
                  RSVP Now
                </button>
              </div>
            </div>

            {/* Organizers Section (Replace it with the actual organizers) */}
            <div className="bg-[#ffffff] rounded-xl shadow-md px-6 pb-6 flex flex-col gap-6 mt-4">
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-[#46007a]">Organizers</h3>
                <div className="mt-4 flex items-center gap-4">
                  {/* Organizer 1 */}
                  <div className="flex items-center gap-3">
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

                  {/* Organizer 2 */}
                  <div className="flex items-center gap-3">
                    <img
                      src="https://via.placeholder.com/50" // Replace with organizer image
                      alt="Organizer 2"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div>
                      <p className="font-medium">Organizer Name 2</p>
                      <p className="text-sm text-gray-600">Position/Role</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          
      </div>
    </>
  )
}