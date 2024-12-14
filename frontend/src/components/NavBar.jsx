import { WrenchIcon, UserIcon } from "@heroicons/react/24/solid";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button"; 
import { X } from "lucide-react";
import Notifications from "./Notifications";
import { Separator } from "./ui/separator";
import { useState, useEffect } from "react"

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint (e.g., 768px for mobile)
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [])
  return (
      <>
        {!isMobile && 
          <nav className="px-6 flex justify-between items-center bg-[#ffffff] shadow-lg z-10">
            {/* Dashboard Logo */}
            <a href="/" className="flex items-center">
              <img
                src="/images/dashboard-logo-2.png"
                className="w-32 h-auto"
                alt="Dashboard Logo"
              />
            </a>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 lg:gap-8">
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
              <Notifications />

              {/* User Button */}
              <a href="/login">
                <button className="bg-[#7b00d4] text-white font-sm rounded-full hover:brightness-110 p-3 transition shadow-sm">
                  <UserIcon className="w-5 h-5" />
                </button>
              </a>
            </div>
          </nav>
        }
        {isMobile &&
          <nav className="flex justify-between items-center z-10 px-6 bg-[#ffffff] shadow-lg">
            <div className="flex justify-between items-center space-x-6">
              <Button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`${isSidebarOpen ? "bg-[#7b00d4] text-[#ffffff]" : "text-[#7b00d4] bg-white"} p-3 border rounded-sm hover:opacity-90 transition`}
              >
                <MenuIcon className="w-6 h-6" />
              </Button>
                <a href="/" className="flex items-center">
                  <img
                    src="/images/dashboard-logo-2.png"
                    className="w-32 h-auto"
                    alt="Dashboard Logo"
                  />
              </a>
            </div>
            
            <Notifications />
          </nav>
        }
        {isSidebarOpen && isMobile && (
        <aside
          className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg z-50 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-4 bg-[#7b00d4] text-white flex items-center justify-between">
              <span className="text-lg font-bold">Menu</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-white hover:opacity-80 transition"
              >
                <X />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="flex-grow">
              <ul className="space-y-8">
                <li className="hover:bg-[#adadad] p-4 font-medium transition">
                  <a href="/">
                    HOME
                  </a>
                </li>
                <li className="hover:bg-[#adadad] p-4 font-medium transition">
                  <a href="/events">
                    EVENTS
                  </a>
                </li>
                <Separator />
                <li className="hover:bg-[#adadad] p-4 font-medium transition">
                  <a href="/manageevent">
                    MANAGE EVENTS
                  </a>
                </li>
              </ul>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200">
              <button
                className="w-full bg-[#7b00d4] text-white py-2 rounded-md hover:brightness-110 transition"
              >
                Login / Log out
              </button>
            </div>
          </div>
        </aside>
      )}
      </>
    
  );
}
