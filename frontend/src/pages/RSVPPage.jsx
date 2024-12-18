import NavBar from "../components/NavBar";
import {
  CalendarDateRangeIcon,
  MapPinIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import axios from "axios";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Check, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

const rsvpStatus = [
  {
    label: "Going",
    value: 1
  },
  {
    label: "Maybe",
    value: 2
  },
  {
    label: "Not Going",
    value: 3
  },
]
export default function RSVPPage() {
  const { id } = useParams()
  const [ event, setEvent ] = useState(null)
  const [ category, setCategory ] = useState()
  const [ loading, setLoading ] = useState(true)
  const [ isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [ currentStatus, setCurrentStatus ] = useState(null)
  const [rsvpMessage, setRsvpMessage] = useState("")

  useEffect(() => {
    if(id){
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/events/${id}`);
          setEvent(response.data)
        } catch (error) {
          console.error("Error fetching event:", error.message)
        } finally {
          setLoading(false)
        }
      }
      fetchEvent()
    }
  }, [id])

  useEffect(() => {
    const fetchCategoryName = async () => {
      if (event && event.category_id) { // Ensure event and category_id exist
        try {
          const response = await axios.get("http://localhost:3000/api/categories/category-name", {
            params: { category_id: event.category_id }, // Pass category_id properly
          });
          setCategory(response.data);
        } catch (error) {
          console.error("Error fetching category name:", error.message);
        }
      }
    };
    fetchCategoryName();
  }, [event]);

  useEffect(() => {
    const checkRSVPStatus = async () => {
      try {
        const authData = await isAuthenticated();
        if (authData && authData.userId) {
          const userId = authData.userId;
          const response = await axios.get(
            `http://localhost:3000/api/rsvp/rsvp-exists/${id}/${userId}`
          );
          if (response.data.length > 0) {
            setCurrentStatus(response.data[0].status);  // Set the current status to the response status
          }
        }
      } catch (error) {
        console.error("Error fetching RSVP status:", error.message);
      }
    };
  
    checkRSVPStatus();
  }, [id]);  // Only run once when the component mounts (or when `id` changes)
  const handleRSVP = async (status) => {
    try {
      const authData = await isAuthenticated()
      if(!authData || !authData.userId) {
        setRsvpMessage("You must be logged in to RSVP.")
        return
      }
      const userId = authData.userId

      const checkResponse = await axios.get(
        `http://localhost:3000/api/rsvp/rsvp-exists/${id}/${userId}`
      )
      if(checkResponse.data.length !== 0){
        const rsvpId = checkResponse.data[0].rsvp_id;
        const updateResponse = await axios.put(`http://localhost:3000/api/rsvp/update/${rsvpId}`, { status: status })
        if (updateResponse.status === 200) {
          setRsvpMessage("RSVP status updated successfully!");
          setCurrentStatus(status)
        } else {
          setRsvpMessage("Failed to update RSVP. Please try again.");
        }
      } else {
        const rsvpData = {
          event_id: Number(id),
          user_id: authData.userId,
          status: status,
        }
        const response = await axios.post("http://localhost:3000/api/rsvp/create-rsvp", rsvpData)
        if (response.status === 201) {
          setRsvpMessage("RSVP status created successfully!");
          setCurrentStatus(status)
        } else {
          setRsvpMessage("Failed to update RSVP. Please try again.");
        }
      }
      
    } catch (error) {
      console.error("Error RSVPing:", error.message)
    }
  }

  // Loading or error states
  if (loading) {
    return <div className="text-center mt-16">Loading event details...</div>;
  }

  if (!event) {
    return <div className="text-center mt-16 text-red-500">Event not found.</div>;
  }
  return (
    <>
      <div className="bg-[#fbf3ff] min-h-screen">
        <NavBar />
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 py-8">
          {/* Event Banner */}
          <img
            src={event.photo || "https://via.placeholder.com/400x200"}
            alt={event.title || "Event"}
            className="w-full h-64 sm:h-72 md:h-96 object-cover rounded-xl mb-4"
          />

          {/* Event Details */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#46007a]">
              {event.title}
            </h2>

            {/* Event Category */ }
            <div className="flex items-center text-sm text-gray-700">
              <Layers className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>{category}</p>
            </div>
            {/* Event Date */}
            <div className="flex items-center text-sm text-gray-700">
              <CalendarDateRangeIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>{event.event_datetime.split("T")[0]}</p>
            </div>

            {/* Event Time */}
            <div className="flex items-center text-sm text-gray-700">
              <ClockIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>{event.event_datetime.split("T")[1].split('.')[0]}</p>
            </div>

            {/* Event Location */}
            <div className="flex items-center text-sm text-gray-700">
              <MapPinIcon className="w-5 h-5 text-[#7b00d4] mr-2" />
              <p>{event.address}</p>
            </div>

            {/* About the Event */}
            <h3 className="text-lg md:text-2xl font-semibold text-[#46007a]">About this Event</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* RSVP Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6 flex flex-col sm:flex-row justify-end items-center">
            {/* RSVP Button */}
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
              <button className="mt-4 sm:mt-0 flex bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] hover:brightness-110 transition text-white font-semibold py-2 px-6 rounded-lg shadow-md gap-2">
                <SparklesIcon className="w-5 h-5" />
                {currentStatus ? "Update RSVP" : "RSVP Now"}
              </button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandList>
                    <CommandEmpty>No RSVP status found...</CommandEmpty>
                    <CommandGroup>
                      {rsvpStatus.map((status) => (
                        <CommandItem
                        key={status.value}
                        value={status.value}
                        onSelect={() => {
                          handleRSVP(status.label);
                          setIsPopoverOpen(false);
                        }}
                      >
                        {status.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            currentStatus === status.label ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          {rsvpMessage && <p className="text-center mt-4 text-sm text-green-600">{rsvpMessage}</p>}
        </div>
      </div>
    </>
  );
}
