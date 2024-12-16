import dbConn from '../../config/db.config.js';

const Notification = {
  
  // Create a new notification
  create: (notificationData) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO notification (rsvp_id, message, status) 
                     VALUES (?, ?, 'Unread')`;
      dbConn.query(
        query,
        [notificationData.rsvp_id, notificationData.message],
        (err, res) => {
          if (err) {
            console.error("Error creating notification:", err);
            return reject(err);
          }
          resolve({ id: res.insertId, ...notificationData });
        }
      );
    });
  },

  // Get all notifications for a specific user
  findByUserId: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT n.notification_id, n.message, n.status, 
                            e.title, e.event_date 
                     FROM notification n 
                     JOIN rsvp r ON n.rsvp_id = r.rsvp_id
                     JOIN event e ON r.event_id = e.event_id
                     WHERE r.user_id = ?
                     ORDER BY e.event_date ASC`;
      dbConn.query(query, [userId], (err, res) => {
        if (err) {
          console.error("Error fetching notifications:", err);
          return reject(err);
        }
        resolve(res);
      });
    });
  },

  // Mark a notification as read
  markAsRead: (notificationId) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE notification SET status = 'Read' WHERE notification_id = ?`;
      dbConn.query(query, [notificationId], (err, res) => {
        if (err) {
          console.error("Error marking notification as read:", err);
          return reject(err);
        }
        resolve(res);
      });
    });
  }
};

export default Notification;
