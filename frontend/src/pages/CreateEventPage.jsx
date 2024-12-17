import { useState, useEffect } from "react";
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
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    photo: "",
    dateTime: new Date(),
    location: "",
    description: "",
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories/all-categories");
        setCategories(response.data);
      } catch (error) {
        setError("Unable to fetch categories.");
      }
    };

    fetchCategories();
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle file input change (for event photo upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      axios.post("http://localhost:3000/api/upload", formData)
        .then(response => {
          setFormData({ ...formData, photo: response.data.filename });
        })
        .catch(error => {
          setError("Failed to upload photo.");
        });
    }
  };

  // Handle form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:3000/api/events/create-event", {
        title: formData.title,
        category: formData.category,
        photo: formData.photo,
        dateTime: formData.dateTime,
        location: formData.location,
        description: formData.description,
      });
      console.log("Event created successfully", response.data);
      // Optionally, reset form or redirect
    } catch (error) {
      setError("Cannot create event: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
};

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf3ff]">
      <NavBar />
      <div className="flex-grow p-4 sm:p-8 flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-4 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
            Create New Event
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="flex-1">
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Event Name
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter event name"
                  className="mt-1 block rounded-md border-gray-300 shadow-inner w-full"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="flex-1">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Event Category
                </Label>
                <Popover open={isCategoryOpen} onOpenChange={setCategoryOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={isCategoryOpen}
                      className="bg-[#f7f7f7] mb-4 mt-1 py-5 w-full rounded-md border flex items-center justify-between"
                    >
                      {formData.category
                        ? categories.find((category) => category.value === formData.category)?.label
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
                              onSelect={() => setFormData({ ...formData, category: category.value })}
                            >
                              {category.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  category.value === formData.category ? "opacity-100" : "opacity-0"
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

            <div className="flex-1">
              <Label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Event Photo
              </Label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
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

            <div>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <div className="flex-1">
                  <Label htmlFor="dateTime" className="block text-sm font-medium text-gray-700">
                    Event Date and Time
                  </Label>
                  <DateTimePicker value={formData.dateTime} onChange={(value) => setFormData({ ...formData, dateTime: value })} />
                </div>
              </div>
            </div>

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

            <div className="flex justify-end pt-12">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#7b00d4] via-[#A255DA] to-[#F03CF9] px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:brightness-110 transition"
                disabled={isSubmitting || !!error}
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
