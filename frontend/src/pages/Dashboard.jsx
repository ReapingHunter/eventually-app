import Footer from "@/components/Footer";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { SparklesIcon, FireIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Dashboard() {
  const [events, setEvents] = useState([])

  useEffect(() => {

    // Fetch top events
    const fetchTopEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/events/dashboard")
        setEvents(response.data)
      } catch (error) {
        console.error("Error fetching top events:", error.message)
      }
    }

    fetchTopEvents()
  }, [])
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#efefef]">
        {/* Navbar */}
        <NavBar />
        {/* Hero Section */}
        <div
          style={{ backgroundImage: "url('/images/dashboard-img.png')" }}
          className="relative h-64 sm:h-96 lg:h-[500px] bg-cover bg-center z-0"
        >
          {/* Padding added to prevent text overlap */}
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-center px-4 py-16 sm:py-20 lg:py-24">
            {/* Welcome Text and Logo */}
            <div className="font-normal text-2xl sm:text-4xl lg:text-5xl flex flex-col sm:flex-row items-center justify-center mb-4">
              <div>Welcome to</div>
              <img
                src="/images/dashboard-logo.svg" // Replace with actual image
                alt="Event"
                className="mt-2 sm:mt-0 sm:ml-4 w-36 sm:w-48 lg:w-72 object-cover"
              />
            </div>
            {/* Subtitle */}
            <div className="text-sm sm:text-xl lg:text-2xl font-normal mb-6">
              Create and join events today, celebrate tomorrow.
            </div>
            {/* Register Button */}
            <Link to="/signup">
              <Button className="flex bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] hover:brightness-110 transition text-white font-semibold py-2 px-4 sm:px-6 rounded-lg shadow-md gap-2">
                <SparklesIcon className="w-5 h-5" />
                Register now
              </Button>
            </Link>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-grow">
          {/* Top Events Section */}
          <div className="px-6 sm:px-12 lg:px-24 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <FireIcon className="w-10 h-10 sm:w-14 sm:h-14 text-[#7b00d4]" />
              <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl">
                <span className="text-[#7b00d4]">Top </span>Events
              </h1>
            </div>
          </div>

          {/* Event Cards Carousel */}
          <div className="px-4 sm:px-16 lg:px-32 py-6 sm:py-8">
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {events.map((event) => (
                  <CarouselItem key={event.event_id} className="basis-full sm:basis-1/2 lg:basis-1/3">
                    <div className="p-2">
                      <Link key={event.event_id} to={`/rsvp/${event.event_id}`}>
                        <EventCard event={event} /> 
                      </Link>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex bg-[#7b00d4] hover:bg-[#7b00d4] text-xl hover:brightness-90 transition text-white hover:text-white" />
              <CarouselNext className="hidden sm:flex bg-[#7b00d4] hover:bg-[#7b00d4] hover:brightness-90 transition text-white hover:text-white" />
            </Carousel>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
