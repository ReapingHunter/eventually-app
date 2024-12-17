import Event from '../models/event.model.js';
import RSVP from '../models/rsvp.model.js';
import Notification from '../models/notification.model.js';
import Category from '../models/category.model.js';
import multer from 'multer';

// Set up multer storage and filename configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images');  // Destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
  }
});

const upload = multer({ storage: storage });

export const uploadEventPhoto = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const photoUrl = `/images/${req.file.filename}`; // Path where the file is stored
  res.status(200).json({ photoUrl });
}

export const createEvent = async (req, res) => {
  try {
    const { title, description, event_datetime, address, photo, category_id, user_id } = req.body;

    // Check if a file is uploaded
    if (!photo) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    // Insert the event into the database
    const newEvent = await Event.create({
      title,
      description,
      event_datetime,
      address,
      photo,
      category_id,
      user_id,
    });

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

export const getTopEvents = async (req, res) => {
  try {
    const topEvents = await Event.findTopEvents();
    res.status(200).send(topEvents);
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

export const getEventByFilter = async (req, res) => {
  try {
    const { title, address, from_date, to_date, category_id } = req.query;
    const filteredEvents = await Event.findByFilter(title, address, from_date, to_date, category_id);
    res.status(200).send(filteredEvents || []);
  } catch (error) {
    console.error('Error fetching filtered events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getOrganizer = async (req, res) => {
  try {
    const { event_id } = req.query; // Extract query parameter
    const organizer = await Event.findOrganizer(event_id);
    if (!organizer) {
      return res.status(404).send({ message: "Organizer not found" });
    }
    res.status(200).send({ username: organizer }); // Send the organizer's username
  } catch (error) {
    console.error("Error fetching organizer:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getEventByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const events = await Event.findByUser(userId);
    if (events.length === 0) {
      return res.status(404).send({ message: "User has not created any events." });
    }
    res.status(200).send(events);
  } catch (err) {
    console.error("Error fetching event by user:", err);
    res.status(500).send({ message: "Error fetching event", error: err });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_datetime, address, photo, category_id } = req.body;

    if (!title || !description || !event_datetime || !address || !category_id) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    // Notify all RSVPed users
    const rsvpList = await RSVP.findByEventId(eventId);
    const message = `The event "${title}" has been updated. Check the details.`;

    await Promise.all(
      rsvpList.map(async (rsvp) => {
        await Notification.create({
          rsvp_id: rsvp.rsvp_id,
          message,
        });
      })
    );

    res.status(200).send({
      message: "Event updated and notifications sent",
      event: updatedEvent,
    });

    const updatedEvent = await Event.updateById(id, { title, description, event_datetime, address, photo, category_id });
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
