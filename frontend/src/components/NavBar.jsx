import SearchBar from "../components/SearchBar";
import { WrenchIcon, BellIcon, UserIcon } from "@heroicons/react/24/solid";

export default function NavBar() {
  return (
    <>
      <nav className="px-6 sm:px-10 mb-4 flex justify-between items-center bg-[#3b006a] text-white shadow-lg">
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
            <button className="bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center gap-2 hover:opacity-90 transition">
              <WrenchIcon className="w-5 h-5" />
              <span>Manage Events</span>
            </button>
          </a>

          {/* Notifications Button */}
          <button className="bg-[#7b00d4] p-3 rounded-full hover:bg-[#5a00a8] transition shadow-md">
            <BellIcon className="w-5 h-5 text-white" />
          </button>

          {/* User Button */}
          <a href="/login">
            <button className="text-[#7b00d4] rounded-full p-3 bg-[#7b00d4] hover:bg-[#5a00a8] transition shadow-sm">
              <UserIcon className="w-5 h-5 text-white" />
            </button>
          </a>
        </div>
      </nav>
    </>
  );
}
