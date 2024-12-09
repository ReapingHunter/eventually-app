
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid"
import { ClockIcon } from "@heroicons/react/24/outline"
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export default function EventCard(){
  return (
    <>
      <a href="/rsvp">
        <Card className="max-w-sm mx-auto bg-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 overflow-hidden border border-gray-200 transition">
          {/* Event Image Section */}
          <div className="relative">
            <img
              src="https://via.placeholder.com/400x200" // Replace with actual image
              alt="Event"
              className="w-full h-48 object-cover"
            />
          </div>

          {/* Event Content Section */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Event_name
            </h3>
            <div className="text-md my-2">
              <div className="flex gap-2 my-3">
                <CalendarIcon className="w-6 h-6 text-[#7b00d4]" />
                from_date
                <span className="text-[#7b00d4]">To</span> {/* Display if event has to_date data */}
                to_date
              </div>
              <div className="flex gap-2 my-3">
                <ClockIcon className="w-6 h-6 text-[#7b00d4]" />
                event_time
              </div>
              <div className="flex gap-2 my-3">
                <MapPinIcon className="w-6 h-6 text-[#7b00d4]" />
                Location_data
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button className="bg-[#7b00d4] font-bold hover:bg-[#7b00d4] w-full">RSVP Now</Button>
            </div>
          </div>

        </Card>
      </a>
    </>
  );
}
