import { BookmarkIcon as BookmarkIconSolid } from "@heroicons/react/24/solid"
import { BookmarkIcon as BookmarkIconOutline } from "@heroicons/react/24/outline"
import { useState } from "react";

export default function EventCard(){
  const [bookmarked, setBookmarked] = useState(false)
  return (
    <>
      <a href="/rsvp">
        <div className="max-w-sm mx-auto bg-white m-8 rounded-lg shadow-lg overflow-hidden border border-gray-200">
          {/* Event Image Section */}
          <div className="relative">
            <img
              src="https://via.placeholder.com/400x200" // Replace with actual image
              alt="Event"
              className="w-full h-48 object-cover"
            />
            <a className="absolute top-2 right-2 cursor-pointer" onClick={() => setBookmarked(!bookmarked)}>
              {bookmarked ? <BookmarkIconSolid className="w-6 h-6 text-yellow-400" />
                          : <BookmarkIconOutline className="w-6 h-6 text-yellow-400" />}
            </a>
            <div className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-bold py-1 px-2 rounded">
              Online Event or not
            </div>
          </div>

          {/* Event Content Section */}
          <div className="p-4">
            <p className="text-xs text-gray-500 mb-2">By Rocky Mountain Roasting Co.</p>
            <h3 className="text-lg font-semibold text-gray-800">
              Event_name
            </h3>
            <div className="text-sm text-gray-600 mt-2">
              <p>
                <span className="font-medium">From:</span> from_date
              </p>
              <p>
                <span className="font-medium">To:</span> to_date
              </p>
              <p>
                <span className="font-medium">Location:</span> Location_data
              </p>
            </div>
          </div>

          {/* Event Metrics Section */}
          <div className="p-4 border-t border-gray-200 text-sm">
            <div className="flex justify-between items-center mb-2">
              <span>Rating</span>
              <span>50%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] h-2 rounded-full" style={{ width: "50%" }}></div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Recommended</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] h-2 rounded-full" style={{ width: "100%" }}></div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Going</span>
              <span>Insert data here</span>
            </div>
          </div>
        </div>
      </a>
    </>
  );
}
