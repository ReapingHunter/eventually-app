import SearchBar from "../components/SearchBar";
import { WrenchIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";

export default function NavBar(){
  return(
    <>
      <nav className="pt-8 px-10 mb-4 flex justify-between items-center bg-[#ffffff]">
        {/* Dashboard Logo */}
        <a href="/">
          <img
            src="/images/dashboard-logo.png"
            className="w-40 h-auto"
            alt="Dashboard Logo"
          />
        </a>

        {/* TextInput on the right */}
        <div>
          <SearchBar placeholder="Search events..." />
        </div>
        <div className="flex items-center gap-3">
          {/* Login Button */}
          <button className="text-white bg-[#7b00d4] font-medium py-2 px-4 rounded-lg hover:bg-[#5a00a8] transition">
            <CalendarDaysIcon className="w-5 h-6" />
          </button>
          <a href="/login">
            <button className="text-[#7b00d4] font-medium py-2 px-4 border border-[#7b00d4] rounded-lg hover:bg-[#7b00d4] hover:text-white transition">
              Login
            </button>
          </a>

          {/* Register Button */}
          <a href="/signup">
            <button className="text-white bg-[#7b00d4] font-medium py-2 px-4 rounded-lg hover:bg-[#5a00a8] transition">
              Register
            </button>
          </a>

          {/* Create Event Button */}
          <button className="bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 transition">
            <WrenchIcon className="w-5 h-5" />
            <span>Manage Events</span>
          </button>
        </div>
      </nav> 
    </>
  )
  
}