import { useState, useEffect } from "react";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "./ui/separator";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { BellIcon, X } from "lucide-react";
import { isAuthenticated } from "@/utils/auth";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);  // Default as empty array
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user ID
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userSession = await isAuthenticated();
        setUserId(userSession.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error.message);
        setError("Failed to fetch user ID");
      }
    };
    fetchUserId();
  }, []);

  // Fetch notifications when userId is set
  useEffect(() => {
    if (userId) {
      const fetchNotifications = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/notification/${userId}`);
          // Ensure response is an array
          setNotifications(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
          console.error("Error fetching notifications:", err);
          setError("Failed to fetch notifications");
        } finally {
          setLoading(false);
        }
      };
      fetchNotifications();
    }
  }, [userId]);

  // Mark as read
  const handleClearNotification = (notificationId) => {
    axios.put(`/notification/${notificationId}/read`)
      .then(() => {
        setNotifications((prev) =>
          prev.filter((notification) => notification.notification_id !== notificationId)
        );
      })
      .catch((err) => console.error("Error marking notification as read:", err));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="relative bg-[#7b00d4] text-white font-sm p-3 w-11 h-11 rounded-full hover:brightness-110 transition shadow-md">
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
          {loading ? (
            <div className="px-4 py-6 text-center text-sm text-gray-500">
              Loading notifications...
            </div>
          ) : error ? (
            <div className="px-4 py-6 text-center text-sm text-red-500">
              {error}
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.notification_id} className="flex items-center justify-between px-4 py-3">
                <p className="text-sm text-gray-700 flex-1">{notification.message}</p>
                <button
                  onClick={() => handleClearNotification(notification.notification_id)}
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
  );
}
