import RSVP from '../models/rsvp.model.js';

// Create RSVP
export const createRSVP = async (req, res) => {
  try {
    const { user_id, event_id, status } = req.body;

    // Validate input
    if (!user_id || !event_id || !status) {
      return res.status(400).send({ message: "Missing required fields." });
    }

    const newRSVP = await RSVP.create({ user_id, event_id, status });
    res.status(201).send({
      message: "RSVP created successfully",
      rsvp: newRSVP,
    });
  } catch (err) {
    console.error("Error creating RSVP:", err);
    res.status(500).send({ message: "Error creating RSVP", error: err });
  }
};

// Get RSVPs by Event ID
export const getRSVPsByEvent = async (req, res) => {
  try {
    const { event_id } = req.params;

    const rsvps = await RSVP.findByEventId(event_id);
    if (rsvps.length === 0) {
      return res.status(404).send({ message: "No RSVPs found for this event." });
    }

    res.status(200).send(rsvps);
  } catch (err) {
    console.error("Error fetching RSVPs by event:", err);
    res.status(500).send({ message: "Error fetching RSVPs", error: err });
  }
};

// Get RSVPs by User ID
export const getRSVPsByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const rsvps = await RSVP.findByUserId(user_id);
    if (rsvps.length === 0) {
      return res.status(404).send({ message: "No RSVPs found for this user." });
    }

    res.status(200).send(rsvps);
  } catch (err) {
    console.error("Error fetching RSVPs by user:", err);
    res.status(500).send({ message: "Error fetching RSVPs", error: err });
  }
};

// Update RSVP Status
export const updateRSVPStatus = async (req, res) => {
  try {
    const { rsvp_id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["Going", "Maybe", "Not Going"].includes(status)) {
      return res.status(400).send({ message: "Invalid RSVP status." });
    }

    const updatedRSVP = await RSVP.updateStatus(rsvp_id, status);
    res.status(200).send({
      message: "RSVP status updated successfully",
      rsvp: updatedRSVP,
    });
  } catch (err) {
    console.error("Error updating RSVP status:", err);
    res.status(500).send({ message: "Error updating RSVP", error: err });
  }
};