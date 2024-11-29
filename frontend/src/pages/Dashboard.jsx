import ListInput from "../components/ListInput"
import DateInput from "../components/DateInput";
import { useState } from "react";
export default function Dashboard(){

  const locationOptions = ["Cebu City", "Bohol"]
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });
  const handleDateChange = (field, value) => {
    setDateRange((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return(
    <>
      <div className="">
        <nav>
          <div className="pt-8 pl-10 mb-4">
            <a href="/">
              <img 
                src="/images/dashboard-logo.png" 
                className="w-40 h-auto" 
                alt="Dashboard Logo" />
            </a>
          </div>
        </nav>
        <div className="flex">
          <div className="pt-4 pl-10">
            <ListInput
              type="text"
              label="Location"
              id="event-location"
              options={locationOptions}
              placeholder="Select event location..."
            />
            <ListInput
              type="text"
              label="Event Type"
              id="event-type"
              options={locationOptions}
              placeholder="Select event type..."
            />
            <DateInput
              fromLabel="Start Date"
              toLabel="End Date"
              fromDate={dateRange.from}
              toDate={dateRange.to}
              onChange={handleDateChange}
            />
          </div>
          <div className="bg-[#f0f0f0] rounded ml-10">Event List</div>
        </div>
      </div>
    </>
  )
}