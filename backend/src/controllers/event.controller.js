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