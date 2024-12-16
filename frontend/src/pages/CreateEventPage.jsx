import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { DateTimePicker } from "@/components/ui/date-time-picker/date-time-picker";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

export default function CreateEventPage() {
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([])
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    photo: "",
    dateTime: new Date(),
    location: "",
    description: "",
  })

  // const handleAddAgenda = () => setAgendas([...agendas, ""]);
  // const handleRemoveAgenda = (index) =>
  //   setAgendas(agendas.filter((_, i) => i !== index));

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:3000/api/events/create-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          category: formData.category,
          photo: formData.photo,
        }),

      })
    } catch (error) {
      setError("Cannot create event:", error.message);
    }
  }
  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#fbf3ff]">
        <NavBar />
        <div className="flex-grow p-4 sm:p-8 flex flex-col items-center">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-4 sm:p-8">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Create New Event
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Event Name and Category */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {/* Event Name */}
                <div className="flex-1">
                  <Label htmlFor="eventName" className="text-sm font-medium text-gray-700">
                    Event Name
                  </Label>
                  <Input
                    id="eventName"
                    type="text"
                    placeholder="Enter event name"
                    className="mt-1 block rounded-md border-gray-300 shadow-inner w-full"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                {/* Event Category */}
                <div className="flex-1">
                  <Label htmlFor="eventCategory" className="text-sm font-medium text-gray-700">
                    Event Category
                  </Label>
                  <Popover open={isCategoryOpen} onOpenChange={setCategoryOpen} onChange={handleChange}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={isCategoryOpen}
                        className="bg-[#f7f7f7] mb-4 mt-1 py-5 w-full rounded-md border flex items-center justify-between"
                      >
                        {eventCategory
                          ? categories.find((category) => category.value === eventCategory)?.label
                          : "Select Category..."}
                        <ChevronDown className="text-[#7b00d4]" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full sm:w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Search Category..." />
                        <CommandList>
                          <CommandEmpty>No categories found...</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.value}
                                value={category.value}
                                onSelect={() => handleChange(category.value)}
                              >
                                {category.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    category === category.value ? "opacity-100" : "opacity-0"
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
              <div className="flex-1">
                <Label htmlFor="eventPhoto" className="block text-sm font-medium text-gray-700">
                  Event Photo
                </Label>
                <input
                  id="eventPhoto"
                  type="file"
                  accept="image/*"
                  value={formData.photo}
                  onChange={handleChange}
                  className="mt-1 block w-auto text-sm text-gray-500"
                />
                {formData.photo && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Preview:</p>
                    <img
                      src={formData.photo}
                      alt="Event Preview"
                      className="rounded-md w-auto max-h-64 object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Event Date Range */}
              <div>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <div className="flex-1">
                    <Label htmlFor="eventFrom" className="block text-sm font-medium text-gray-700">
                      Event Date and Time <span className="font-normal"></span>
                    </Label>
                    <DateTimePicker hourCycle={12} value={formData.dateTime} onChange={handleChange} />
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
                  value={formData.location} 
                  onChange={handleChange}
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
                  value={formData.description} 
                  onChange={handleChange}
                />
              </div>

              {/* Agendas
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
                  className="mt-2 inline-flex items-center px-4 py-2 bg-[#7b00d4] text-white rounded-md hover:brightness-110 transition"
                >
                  <PlusIcon className="w-5 h-5 mr-1" /> Add Agenda
                </button>
              </div> */}

              {/* Submit Button */}
              <div className="flex justify-end pt-12">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition"
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