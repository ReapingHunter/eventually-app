import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust the base URL as needed

// Fetch notifications for a user
export const fetchNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/notification/${userId}`);
    return response.data.notifications;
  } catch (err) {
    console.error("Error fetching notifications:", err);
    throw err;
  }
};

// Mark a notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    await axios.put(`${API_URL}/notification/${notificationId}/read`);
  } catch (err) {
    console.error("Error marking notification as read:", err);
    throw err;
  }
};
