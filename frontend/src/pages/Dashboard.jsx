import Footer from "@/components/Footer";
import NavBar from "../components/NavBar";
import EventCard from "../components/EventCard";
import { Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from "@/components/ui/button";
import { SparklesIcon, FireIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {

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
          
          <div className="px-24 pt-8 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FireIcon className="w-14 h-auto text-[#7b00d4]"/>
              <h1 className="font-bold text-5xl"><span className="text-[#7b00d4]">Top </span>Events</h1>
            </div>
          </div>
          <div className="px-32 justify-center items-center">            
            {/* Event cards */}
            <div className="p-8">
              
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

