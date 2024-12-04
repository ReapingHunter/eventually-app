import EventCard from "@/components/EventCard";
import { useState } from "react";

export default function ManageEventPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Tabs Section */}
      <div className="w-full border-b border-gray-300 mb-6">
        <div className="flex space-x-8 sm:space-x-12 justify-center text-sm sm:text-base font-medium">
          {["upcoming", "past", "bookmarked"].map((tab) => (
            <button
              key={tab}
              className={`pb-3 transition-all duration-300 ${
                activeTab === tab
                  ? "text-[#7b00d4] border-b-2 border-[#7b00d4] font-semibold"
                  : "text-gray-600 hover:text-[#7b00d4]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Events
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Event List */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[calc(100vh-220px)] p-4 bg-gray-50 rounded-lg shadow-lg"
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <EventCard />
          </div>
        ))}
      </div>
    </div>
  );
}
