import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    value: "networking",
    label: "Networking",
  },
  {
    value: "wedding",
    label: "Wedding",
  },
]

export default function CreateEventPage() {
  const [eventFrom, setEventFrom] = useState("");
  const [eventTo, setEventTo] = useState("");
  const [error, setError] = useState("");
  const [agendas, setAgendas] = useState([""]);
  const [eventPhoto, setEventPhoto] = useState(null);
  const [eventCategory, setEventCategory] = useState("");

  const [isCategoryOpen, setCategoryOpen] = useState(false)
  const [categoryValue, setCategoryValue] = useState("")

  const validateDateRange = (from, to) => {
    if (to && new Date(to) < new Date(from)) {
      setError("End date cannot be before start date.");
    } else {
      setError("");
    }
  };

  const handleEventFromChange = (value) => {
    setEventFrom(value);
    validateDateRange(value, eventTo);
  };

  const handleEventToChange = (value) => {
    setEventTo(value);
    validateDateRange(eventFrom, value);
  };

  const handleAddAgenda = () => setAgendas([...agendas, ""]);
  const handleRemoveAgenda = (index) =>
    setAgendas(agendas.filter((_, i) => i !== index));

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#fbf3ff]">
        <NavBar />
        <div className="flex-grow p-8 flex flex-col items-center">
          <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Event</h1>

            <form className="space-y-6">
              
              <div className="flex justify-stretch w-full">

                {/* Event Name */}
                <div>
                  <Label htmlFor="eventName" className="text-sm font-medium text-gray-700">
                    Event Name
                  </Label>
                  <Input
                    id="eventName"
                    type="text"
                    placeholder="Enter event name"
                    className="mt-1 block w-1/2 rounded-md border-gray-300 shadow-inner"
                  />
                </div>

                {/* Event Category */}
                <div>
                  <Label htmlFor="eventCategory" className="text-sm font-medium text-gray-700">
                    Event Category
                  </Label>
                  <Popover open={isCategoryOpen} onOpenChange={setCategoryOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isCategoryOpen}
                        className="bg-[#f7f7f7] mb-4 rounded-md border flex flex-none"
                      >
                        {categoryValue
                          ? categories.find((category) => category.value === categoryValue)?.label
                          : "Select Category..."}
                        <ChevronDown className="text-[#7b00d4]" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Category..." />
                        <CommandList>
                          <CommandEmpty>No categories found...</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.value}
                                value={category.value}
                                onSelect={(currentVal) => {
                                  setCategoryValue(currentVal === categoryValue ? "" : currentVal);
                                  setCategoryOpen(false);
                                }}
                              >
                                {category.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    categoryValue === category.value ? "opacity-100" : "opacity-0"
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
              </div>

              {/* Event Photo */}
              <div>
                <label htmlFor="eventPhoto" className="block text-sm font-medium text-gray-700">
                  Event Photo
                </label>
                <input
                  id="eventPhoto"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="mt-1 block w-full text-sm text-gray-500"
                />
                {eventPhoto && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Preview:</p>
                    <img
                      src={eventPhoto}
                      alt="Event Preview"
                      className="rounded-md w-full max-h-64 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Event Date Range */}
              <div>
                <div className="flex gap-4 mt-2">
                  {/* Event From */}
                  <div className="flex-1">
                    <label htmlFor="eventFrom" className="block text-sm font-medium text-gray-700">
                      Event Start
                    </label>
                    <Input
                      id="eventFrom"
                      type="date"
                      value={eventFrom}
                      onChange={(e) => handleEventFromChange(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                  {/* Event To */}
                  <div className="flex-1">
                    <label htmlFor="eventTo" className="block text-sm font-medium text-gray-700">
                      Event End
                    </label>
                    <Input
                      id="eventTo"
                      type="date"
                      value={eventTo}
                      onChange={(e) => handleEventToChange(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                    />
                  </div>
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter location"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>

              {/* Event Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Event Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="Enter event description"
                  className="bg-transparent outline-none border-2 border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
                />
              </div>

              {/* Agendas */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Agendas</label>
                {agendas.map((agenda, index) => (
                  <div key={index} className="flex items-center gap-2 mt-2">
                    <Input
                      type="text"
                      placeholder={`Agenda ${index + 1}`}
                      value={agenda}
                      onChange={(e) => {
                        const newAgendas = [...agendas];
                        newAgendas[index] = e.target.value;
                        setAgendas(newAgendas);
                      }}
                      className="flex-1 rounded-md border-gray-300 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAgenda(index)}
                      className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddAgenda}
                  className="mt-2 inline-flex items-center px-4 py-2 bg-[#7b00d4] text-white rounded-md hover:bg-[#5a00a8]"
                >
                  <PlusIcon className="w-5 h-5 mr-1" /> Add Agenda
                </button>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:from-[#5a00a8] hover:to-[#c42cf0] transition"
                  disabled={!!error}
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
