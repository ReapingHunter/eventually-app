import Event from '../models/event.model.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, photo } = req.body; // Include photo field if it's part of the request
    const newEvent = await Event.create({ title, description, date, location, photo });
    res.status(201).send({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).send({ message: "Error creating event", error: err });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    // Ensure that the image paths are absolute URLs
    const eventsWithFullImagePaths = events.map(event => ({
      ...event,
      photo: `http://localhost:3000/public/images/${event.photo}`,
    }));
    res.status(200).send(eventsWithFullImagePaths);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).send({ message: "Error fetching events", error: err });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }
    // Add full URL to photo path
    event.photo = `http://localhost:3000/public/images/${event.photo}`;
    res.status(200).send(event);
  } catch (err) {
    console.error("Error fetching event by ID:", err);
    res.status(500).send({ message: "Error fetching event", error: err });
  }
};

export const getEventByFilter = async (req, res) => {
  try {
    const { eventName, dateFrom, dateTo, category, location } = req.query
    const filteredEvents =  await Event.getEventByFilter(eventName, dateFrom, dateTo, category, location)
    if (filteredEvents.length === 0) {
      return res.status(404).send({ message: "No events found matching the criteria." });
    }

    const eventsWithFullImagePaths = filteredEvents.map(event => ({
      ...event,
      photo: `http://localhost:3000/public/images/${event.photo}`,
    }));

    res.status(200).send(eventsWithFullImagePaths);
  } catch (error) {
    console.error("Error fetching event by filter:", err);
    res.status(500).send({ message: "Error fetching event", error: err })
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params; // Get the event ID from the URL params
    const { title, description, date, location, photo } = req.body; // Get updated fields from the request body

    // Check if the required fields are provided
    if (!title || !description || !date || !location) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    // Update the event
    const updatedEvent = await Event.updateById(id, { title, description, date, location, photo });

    res.status(200).send({ message: "Event updated successfully", event: updatedEvent });
  } catch (err) {
    console.error("Error updating event:", err);

    // Handle case where event ID is invalid or not found
    if (err.message === "Event not found or no changes made") {
      return res.status(404).send({ message: "Event not found or no changes made" });
    }

    res.status(500).send({ message: "Error updating event", error: err.message });
  }
};