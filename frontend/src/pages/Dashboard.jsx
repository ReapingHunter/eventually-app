import ListInput from "../components/ListInput";
import DateInput from "../components/DateInput";
import NavBar from "../components/NavBar";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Dashboard() {
  const locationOptions = ["Cebu City", "Bohol"];
  const [activeTab, setActiveTab] = useState("upcoming")
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  const handleDateChange = (field, value) => {
    setDateRange((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <>
      <div>
        
        <NavBar />
        <div className="flex">
          {/* Filters Section - Flex Column Layout */}
          <div className="pt-4 pl-10 flex flex-col justify-between h-full">
            {/* Filter Inputs */}
            <p className="font-bold mb-16">Filter Events</p>
            <div className="flex-1">
              <ListInput
                type="text"
                label="Location"
                id="event-location"
                options={locationOptions}
                placeholder="Select event location..."
              />
              <ListInput
                type="text"
                label="Event Type"
                id="event-type"
                options={locationOptions}
                placeholder="Select event type..."
              />
              <DateInput
                fromLabel="Start Date"
                toLabel="End Date"
                fromDate={dateRange.from}
                toDate={dateRange.to}
                onChange={handleDateChange}
              />
              
            </div>

            {/* Filter Event Button centered at the bottom */}
            <div className="mt-auto">
              <button className="bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 transition mx-auto">
                <FunnelIcon className="w-5 h-5" />
                <span>Filter Event</span>
              </button>
            </div>
          </div>

          {/* Event List Section */}
          <div className="bg-[#f0f0f0] rounded-2xl ml-10 p-6 flex-1 shadow-inner">
            <div className="w-full max-w-4xl mx-auto border-b border-gray-300">
              <div className="flex space-x-16 text-sm font-medium">
                <button className={`pb-2 ${
                  activeTab === "upcoming" 
                    ? "text-[#7b00d4] border-b-2 border-[#7b00d4] "
                    : "text-gray-500 hover:text-gray-700"
                    }`} onClick={()=> setActiveTab("upcoming")}>
                    Upcoming Events
                </button>
                <button className={`pb-2 ${
                  activeTab === "past" 
                    ? "text-[#7b00d4] border-b-2 border-[#7b00d4] "
                    : "text-gray-500 hover:text-gray-700"
                    }`} onClick={()=> setActiveTab("past")}>
                      Past Events
                </button>
                <button className={`pb-2 ${
                  activeTab === "bookmarked" 
                    ? "text-[#7b00d4] border-b-2 border-[#7b00d4]"
                    : "text-gray-500 hover:text-gray-700"
                    }`} onClick={()=> setActiveTab("bookmarked")}>
                      Bookmarked
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
