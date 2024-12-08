import SearchBar from "../components/SearchBar";
import { WrenchIcon, BellIcon, UserIcon } from "@heroicons/react/24/solid";

export default function NavBar() {
  return (
    <>
      <nav className="px-6 sm:px-10 flex justify-between items-center bg-[#ffffff] text-white shadow-lg z-10">
        {/* Dashboard Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/images/dashboard-logo-2.png"
            className="w-32 h-auto"
            alt="Dashboard Logo"
          />
        </a>

        {/* Action Buttons */}
        <div className="flex items-center gap-8">
          <a href="/">
            <button className="bg-white hover:bg-[#7b00d4] hover:text-white text-black font-medium transition px-6 py-6 text-center">
              HOME
            </button>
          </a>
          <a href="/events">
            <button className="bg-white hover:bg-[#7b00d4] hover:text-white text-black font-medium transition px-6 py-6 text-center">
              EVENTS
            </button>
          </a>
          <div className="border-l-2 border-[#9b9b9b] h-14"></div>
          <a href="/manageevent">
            <button className="bg-[#7b00d4] text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 hover:brightness-110 transition">
              <WrenchIcon className="w-5 h-5" />
              <span>Manage Events</span>
            </button>
          </a>

          {/* Notifications Button */}
          <button className="bg-[#7b00d4] text-white font-sm p-3 rounded-full hover:opacity-90 hover:brightness-110 transition shadow-md">
            <BellIcon className="w-5 h-5" />
          </button>

          {/* User Button */}
          <a href="/login">
            <button className="bg-[#7b00d4] text-white font-sm rounded-full hover:opacity-90 hover:brightness-110 p-3 transition shadow-sm">
              <UserIcon className="w-5 h-5" />
            </button>
          </a>
        </div>
      </nav>
    </>
  );
}
