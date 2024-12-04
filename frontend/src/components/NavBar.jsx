import SearchBar from "../components/SearchBar";
import { WrenchIcon, BellIcon, UserIcon } from "@heroicons/react/24/outline";

export default function NavBar() {
  return (
    <>
      <nav className="px-6 sm:px-10 flex justify-between items-center bg-[#3b006a] text-white shadow-lg">
        {/* Dashboard Logo */}
        <a href="/" className="flex items-center">
          <img
            src="/images/dashboard-logo.png"
            className="w-32 h-auto"
            alt="Dashboard Logo"
          />
        </a>

        {/* Search Bar */}
        <div className="flex-1 mx-8">
          <SearchBar placeholder="Search events..." />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Manage Events Button */}
          <a href="/manageevent">
            <button className="bg-transparent border-2 border-[#9b9b9b] text-white font-sm py-2 px-4 rounded-lg shadow-md flex items-center gap-2 hover:opacity-90 hover:bg-[#300056] transition">
              <WrenchIcon className="w-5 h-5" />
              <span>Manage Events</span>
            </button>
          </a>

          {/* Notifications Button */}
          <button className="bg-transparent border-2 border-[#9b9b9b] text-white font-sm p-3 rounded-full hover:opacity-90 hover:bg-[#300056] transition shadow-md">
            <BellIcon className="w-5 h-5" />
          </button>

          {/* User Button */}
          <a href="/login">
            <button className="bg-transparent border-2 border-[#9b9b9b] text-white font-sm rounded-full  hover:opacity-90 hover:bg-[#300056] p-3 transition shadow-sm">
              <UserIcon className="w-5 h-5" />
            </button>
          </a>
        </div>
      </nav>
    </>
  );
}
