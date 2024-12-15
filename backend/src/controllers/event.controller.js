import Event from '../models/event.model.js';

const getFullImageUrl = (photo) => (photo ? `/images/${photo}` : null);

export const createEvent = async (req, res) => {
  try {
    const { title, description, event_datetime, location, photo } = req.body;

    if (!title || !description || !event_datetime || !location) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    const newEvent = await Event.create({ title, description, event_datetime, location, photo });
    res.status(201).send({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).send({ message: 'Error creating event', error: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    const eventsWithFullImagePaths = events.map(event => ({
      ...event,
      photo: getFullImageUrl(event.photo),
    }));
    res.status(200).send(eventsWithFullImagePaths);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).send({ message: 'Error fetching events', error: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }
    event.photo = getFullImageUrl(event.photo);
    res.status(200).send(event);
  } catch (err) {
    console.error('Error fetching event by ID:', err);
    res.status(500).send({ message: 'Error fetching event', error: err.message });
  }
};

export const getEventByFilter = async (req, res) => {
  try {
    const { eventName, dateFrom, dateTo, category, location } = req.query;
    const filteredEvents = await Event.getEventByFilter(eventName, dateFrom, dateTo, category, location);

    if (!filteredEvents || filteredEvents.length === 0) {
      return res.status(404).send({ message: 'No events found matching the criteria.' });
    }

    const eventsWithFullImagePaths = filteredEvents.map(event => ({
      ...event,
      photo: getFullImageUrl(event.photo),
    }));

    res.status(200).send(eventsWithFullImagePaths);
  } catch (err) {
    console.error('Error fetching events by filter:', err);
    res.status(500).send({ message: 'Error fetching events', error: err.message });
  }
};

export const getEventByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const events = await Event.findByUser(userId);

    if (!events || events.length === 0) {
      return res.status(404).send({ message: 'User has not created any events.' });
    }

    const eventsWithFullImagePaths = events.map(event => ({
      ...event,
      photo: getFullImageUrl(event.photo),
    }));

    res.status(200).send(eventsWithFullImagePaths);
  } catch (err) {
    console.error('Error fetching events by user:', err);
    res.status(500).send({ message: 'Error fetching events', error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_datetime, location, photo } = req.body;

    if (!title || !description || !event_datetime || !location) {
      return res.status(400).send({ message: 'Missing required fields' });
    }

    const updatedEvent = await Event.updateById(id, { title, description, event_datetime, location, photo });
    res.status(200).send({ message: 'Event updated successfully', event: updatedEvent });
  } catch (err) {
    console.error('Error updating event:', err);
    if (err.message === 'Event not found or no changes made') {
      return res.status(404).send({ message: 'Event not found or no changes made' });
    }
    res.status(500).send({ message: 'Error updating event', error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Event.deleteById(id);
    res.status(200).send({ message: result.message });
  } catch (err) {
    console.error('Error deleting event:', err);
    if (err.message === 'Event not found') {
      return res.status(404).send({ message: 'Event not found' });
    }
    res.status(500).send({ message: 'Error deleting event', error: err.message });
  }
};