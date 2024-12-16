import Notification from '../models/notification.model.js';

// Create a notification (triggered on event update or new RSVP)
export const createNotification = async (req, res) => {
  try {
    const { rsvp_id, message } = req.body;
    
    if (!rsvp_id || !message) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const newNotification = await Notification.create({ rsvp_id, message });
    res.status(201).send({
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (err) {
    console.error("Error creating notification:", err);
    res.status(500).send({
      message: "Error creating notification",
      error: err.message,
    });
  }
};

// Fetch notifications for a user
export const getNotificationsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const notifications = await Notification.findByUserId(userId);
    res.status(200).send({ notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).send({
      message: "Error fetching notifications",
      error: err.message,
    });
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    if (!notificationId) {
      return res.status(400).send({ message: "Notification ID is required" });
    }

    await Notification.markAsRead(notificationId);
    res.status(200).send({ message: "Notification marked as read" });
  } catch (err) {
    console.error("Error marking notification as read:", err);
    res.status(500).send({
      message: "Error marking notification as read",
      error: err.message,
    });
  }
};
