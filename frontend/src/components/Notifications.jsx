import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { BellIcon, X } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    "Hello, event_name's start date has changed to new_event_date.",
    "Reminder: Your upcoming event is tomorrow.",
    "Your event registration has been confirmed.",
    "New updates are available for your event.",
  ]);

  const handleClearNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="relative bg-[#7b00d4] text-white font-sm p-3 w-11 h-11 rounded-full hover:opacity-90 hover:brightness-110 transition shadow-md">
            <BellIcon className="w-5 h-5" />
            {notifications.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {notifications.length}
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-xs sm:max-w-md p-0">
          <Card className="rounded-lg overflow-hidden">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div key={index} className="flex items-center justify-between px-4 py-3">
                  <p className="text-sm text-gray-700 flex-1">{notification}</p>
                  <button
                    onClick={() => handleClearNotification(index)}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-sm text-gray-500">
                No new notifications.
              </div>
            )}
            <Separator />
            <div className="px-4 py-3 text-center text-sm text-gray-600">
              {notifications.length} Notification(s)
            </div>
          </Card>
        </PopoverContent>
      </Popover>
    </>
  );
}
