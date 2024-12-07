import Footer from "@/components/Footer";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventCard";
import { Input } from "@/components/ui/input";
import { QueueListIcon as QueueListIconSolid, Squares2X2Icon as Squares2x2IconSolid, ViewColumnsIcon as ViewColumnsIconSolid, SparklesIcon, PlusIcon } from "@heroicons/react/24/solid";
import { QueueListIcon as QueueListIconOutline, Squares2X2Icon as Squares2x2IconOutline, ViewColumnsIcon as ViewColumnsIconOutline } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Dashboard() {
  // const locationOptions = ["Cebu City", "Bohol"];
  const [activeTab, setActiveTab] = useState("upcoming");
  const [viewMode, setViewMode] = useState("carousel")
  const [isHovered, setIsHovered] = useState(false)
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#efefef]">
        {/* Navbar */}
        <NavBar />
        
        {/* Main content with flex-grow */}
        <div className="flex-grow">
          
        <div className="px-24 py-8 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1 className="font-bold text-5xl">Your Events</h1>
          </div>
          <div className="items-center">
            <a href="/createevent">
              <button
                className={`bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] rounded-full p-3 flex items-center gap-2 text-white font-semibold transition-all duration-300 ease-in-out
                        ${isHovered ? "px-6" : "px-3 justify-center"}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <PlusIcon className="w-6 h-6" />
                {isHovered && (
                  <span className="transition-opacity duration-300 delay-100">
                    Create Event
                  </span>
                )}
              </button>
            </a>
          </div>
        </div>
          <div className="px-32 justify-center items-center">
            <div className="w-full border-b justify-between border-gray-300 flex">
              {/* Tabs */}
              <div className="flex space-x-16 text-sm font-medium">
                <button
                  className={`pb-2 ${
                    activeTab === "upcoming"
                      ? "text-[#7b00d4] border-b-2 border-[#7b00d4]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming Events
                </button>
                <button
                  className={`pb-2 ${
                    activeTab === "past"
                      ? "text-[#7b00d4] border-b-2 border-[#7b00d4]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("past")}
                >
                  Past Events
                </button>
                <button
                  className={`pb-2 ${
                    activeTab === "bookmarked"
                      ? "text-[#7b00d4] border-b-2 border-[#7b00d4]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("bookmarked")}
                >
                  Bookmarked
                </button>
              </div>
              {/* View mode buttons */}
              <div className="space-x-2">
                <button
                  className="p-2 rounded-lg bg-transparent transition"
                  onClick={() => setViewMode("carousel")}
                >
                  {viewMode === "carousel" ? (
                    <ViewColumnsIconSolid className="w-6 h-6 text-[#000000]" />
                  ) : (
                    <ViewColumnsIconOutline className="w-6 h-6 text-[#000000]" />
                  )}
                </button>
                <button
                  className="p-2 rounded-lg bg-transparent transition"
                  onClick={() => setViewMode("grid")}
                >
                  {viewMode === "grid" ? (
                    <Squares2x2IconSolid className="w-6 h-6 text-[#000000]" />
                  ) : (
                    <Squares2x2IconOutline className="w-6 h-6 text-[#000000]" />
                  )}
                </button>
                <button
                  className="p-2 rounded-lg bg-transparent transition"
                  onClick={() => setViewMode("list")}
                >
                  {viewMode === "list" ? (
                    <QueueListIconSolid className="w-6 h-6 text-[#000000]" />
                  ) : (
                    <QueueListIconOutline className="w-6 h-6 text-[#000000]" />
                  )}
                </button>
              </div>
            </div>
            {/* Event cards */}
            <div className="flex flex-1 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-40 overflow-y-auto max-h-[calc(100vh-200px)] mt-4 p-2">
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

