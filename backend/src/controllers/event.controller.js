import Event from '../models/event.model.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, photo } = req.body;
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
    const eventsWithFullImagePaths = events.map(event => ({
      ...event,
      photo: `http://localhost:3000/images/${event.photo}`,
    }));
    res.status(200).send(eventsWithFullImagePaths);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).send({ message: "Error fetching events", error: err });
  }
};

export const getTopEvents = async (req, res) => {
  try {
    const topEvents = await Event.findTopEvents();
    const eventsWithFullImagePaths = topEvents.map(event => ({
      ...event,
      photo: `http://localhost:3000/images/${event.photo}`,
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
    event.photo = `http://localhost:3000/images/${event.photo}`;
    res.status(200).send(event);
  } catch (err) {
    console.error("Error fetching event by ID:", err);
    res.status(500).send({ message: "Error fetching event", error: err });
  }
};

export const getEventByFilter = async (req, res) => {
  try {
    const { eventName, dateFrom, dateTo, category, location } = req.query;
    const filteredEvents = await Event.findByFilter(eventName, dateFrom, dateTo, category, location);
    if (filteredEvents.length === 0) {
      return res.status(404).send({ message: "No events found matching the criteria." });
    }
    const eventsWithFullImagePaths = filteredEvents.map(event => ({
      ...event,
      photo: `http://localhost:3000/images/${event.photo}`,
    }));
    res.status(200).send(eventsWithFullImagePaths);
  } catch (err) {
    console.error("Error fetching event by filter:", err);
    res.status(500).send({ message: "Error fetching event", error: err });
  }
};

export const getEventByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const events = await Event.findByUser(userId);
    if (events.length === 0) {
      return res.status(404).send({ message: "User has not created any events." });
    }
    const eventsWithFullImagePaths = events.map(event => ({
      ...event,
      photo: `http://localhost:3000/images/${event.photo}`,
    }));
    res.status(200).send(eventsWithFullImagePaths);
  } catch (err) {
    console.error("Error fetching event by user:", err);
    res.status(500).send({ message: "Error fetching event", error: err });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, location, photo } = req.body;
    if (!title || !description || !date || !location) {
      return res.status(400).send({ message: "Missing required fields" });
    }
    const updatedEvent = await Event.updateById(id, { title, description, date, location, photo });
    res.status(200).send({ message: "Event updated successfully", event: updatedEvent });
  } catch (err) {
    console.error("Error updating event:", err);
    if (err.message === "Event not found or no changes made") {
      return res.status(404).send({ message: "Event not found or no changes made" });
    }
    res.status(500).send({ message: "Error updating event", error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Event.deleteById(id);
    res.status(200).send({ message: result.message });
  } catch (err) {
    console.error("Error soft deleting event:", err);
    if (err.message === "Event not found or already deleted") {
      return res.status(404).send({ message: "Event not found or already deleted" });
    }
    res.status(500).send({ message: "Error soft deleting event", error: err.message });
  }
};
