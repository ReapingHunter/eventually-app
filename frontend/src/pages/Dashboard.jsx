import Footer from "@/components/Footer";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Core Swiper styles
import "swiper/css/navigation"; // Navigation styles
import { Navigation } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { QueueListIcon as QueueListIconSolid, 
         Squares2X2Icon as Squares2x2IconSolid, 
         ViewColumnsIcon as ViewColumnsIconSolid, 
         SparklesIcon, 
         FireIcon } from "@heroicons/react/24/solid";
import { QueueListIcon as QueueListIconOutline, 
         Squares2X2Icon as Squares2x2IconOutline, 
         ViewColumnsIcon as ViewColumnsIconOutline } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Dashboard() {
  // const locationOptions = ["Cebu City", "Bohol"];
  const [activeTab, setActiveTab] = useState("upcoming");
  const [viewMode, setViewMode] = useState("carousel")

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#efefef]">
        {/* Navbar */}
        <NavBar />
        <div
          style={{ backgroundImage: "url('/images/dashboard-img.png')" }}
          className="relative h-96 sm:h-[400px] lg:h-[500px] bg-cover bg-center z-0"
        >
          {/* Welcome Text, Logo, and Subtitle */}
          <div className="absolute bottom-12 left-0 w-full h-full flex flex-col items-center justify-center text-[#ffffff] text-center">
            {/* Welcome Text and Logo */}
            <div className="font-normal text-4xl sm:text-5xl flex items-center justify-center mb-4">
              <div>Welcome to</div>
              <img
                src="/images/dashboard-logo.svg" // Replace with actual image
                alt="Event"
                className="ml-4 w-48 sm:w-72 object-cover"
              />
            </div>

            {/* Subtitle */}
            <div className="text-xl sm:text-2xl font-normal px-4 mb-8">
              Create and join events today, celebrate tomorrow.
            </div>

            {/* Register Button */}
            <a href="/signup">
              <Button className="flex bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] hover:from-[#5a00a8] hover:to-[#c42cf0] transition text-white font-semibold py-2 px-6 rounded-lg shadow-md gap-2">
                <SparklesIcon className="w-5 h-5" />
                Register now
              </Button>
            </a>
          </div>
        </div>
        {/* Main content with flex-grow */}
        <div className="flex-grow">
          
          <div className="px-24 py-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FireIcon className="w-14 h-auto text-[#7b00d4]"/>
              <h1 className="font-bold text-5xl"><span className="text-[#7b00d4]">Top </span>Events</h1>
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
            <div className="px-8 py-4">
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                breakpoints={{
                  // Responsive breakpoints
                  640: { slidesPerView: 1 }, // 1 slide for small screens
                  768: { slidesPerView: 2 }, // 2 slides for medium screens
                  1024: { slidesPerView: 3 }, // 3 slides for large screens
                }}
              >
                {/* Each event as a slide */}
                <SwiperSlide>
                  <EventCard />
                </SwiperSlide>
                <SwiperSlide>
                  <EventCard />
                </SwiperSlide>
                <SwiperSlide>
                  <EventCard />
                </SwiperSlide>
                <SwiperSlide>
                  <EventCard />
                </SwiperSlide>
                {/* Add more slides as needed */}
              </Swiper>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

