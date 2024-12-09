import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";

export default function CreateEventPage() {

  return (
    <>
      <div className="min-h-screen flex flex-col bg-[#e8eefe]">
        <NavBar />
        
        <Footer />
      </div>
    </>
  );
}
