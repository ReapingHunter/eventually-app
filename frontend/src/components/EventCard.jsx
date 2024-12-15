
import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/solid"
import { ClockIcon } from "@heroicons/react/24/outline"
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import PropTypes from 'prop-types'

export default function EventCard({event}){
  return (
    <>
      <a href="/rsvp"> {/* Change to link to rsvp if event is not owned or modifyevent if owned */}
        <Card className="max-w-sm mx-auto bg-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 overflow-hidden border border-gray-200 transition">
          {/* Event Image Section */}
          <div className="relative">
            <img
              src={event.photo || "https://via.placeholder.com/400x200"}
              alt="Event"
              className="w-full h-48 object-cover"
            />
          </div>

          {/* Event Content Section */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {event.title}
            </h3>
            <div className="text-md my-2">
              <div className="flex gap-2 my-3">
                <CalendarIcon className="w-6 h-6 text-[#7b00d4]" />
                {event.event_date}
              </div>
              <div className="flex gap-2 my-3">
                <ClockIcon className="w-6 h-6 text-[#7b00d4]" />
                {event.event_time}
              </div>
              <div className="flex gap-2 my-3">
                <MapPinIcon className="w-6 h-6 text-[#7b00d4]" />
                {event.address}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <Button className="bg-[#7b00d4] font-bold hover:bg-[#7b00d4] w-full">View Event</Button>
            </div>
          </div>

        </Card>
      </a>
    </>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    photo: PropTypes.string,
    title: PropTypes.string.isRequired,
    event_date: PropTypes.string.isRequired,
    event_time: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
}
