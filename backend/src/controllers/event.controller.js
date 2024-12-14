import Event from '../models/event.model.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const newEvent = await Event.create({ title, description, date, location });
    res.status(201).send({ message: "Event created successfully", event: newEvent });
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).send({ message: "Error creating event", error: err });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).send(events);
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
    res.status(200).send(event);
  } catch (err) {
    console.error("Error fetching event by ID:", err);
    res.status(500).send({ message: "Error fetching event", error: err });
  }
};