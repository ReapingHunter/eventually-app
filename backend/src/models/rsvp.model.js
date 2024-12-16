import dbConn from '../../config/db.config.js';

const RSVP = {
  // Create a new RSVP
  create: (rsvpData) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO rsvp (user_id, event_id, status, rsvp_date) 
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      `;

      dbConn.query(
        query,
        [rsvpData.user_id, rsvpData.event_id, rsvpData.status],
        (err, res) => {
          if (err) {
            console.error("Error creating RSVP:", err);
            return reject(err);
          }
          resolve({ id: res.insertId, ...rsvpData });
        }
      );
    });
  },

  findOne: (event_id, user_id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM rsvp WHERE event_id = ? AND user_id = ?"
      dbConn.query(query, [event_id, user_id], (err, res) => {
        if(err){
          console.error("Error finding RSVP:", err);
          return reject(err)
        }
        resolve(res)
      })
    })
  },

  // Fetch RSVPs for a specific event
  findByEventId: (event_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT rsvp_id, user_id, status, rsvp_date 
        FROM rsvp 
        WHERE event_id = ?
      `;
      dbConn.query(query, [event_id], (err, res) => {
        if (err) {
          console.error("Error fetching RSVPs:", err);
          return reject(err);
        }
        resolve(res);
      });
    });
  },

  // Fetch RSVPs for a specific user
  findByUserId: (user_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT rsvp_id, event_id, status, rsvp_date 
        FROM rsvp 
        WHERE user_id = ?
      `;
      dbConn.query(query, [user_id], (err, res) => {
        if (err) {
          console.error("Error fetching RSVPs for user:", err);
          return reject(err);
        }
        resolve(res);
      });
    });
  },

  // Update RSVP status
  updateStatus: (rsvp_id, status) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE rsvp 
        SET status = ? 
        WHERE rsvp_id = ?
      `;
      dbConn.query(query, [status, rsvp_id], (err, res) => {
        if (err) {
          console.error("Error updating RSVP status:", err);
          return reject(err);
        }
        if (res.affectedRows === 0) {
          return reject(new Error("RSVP not found"));
        }
        resolve({ rsvp_id, status });
      });
    });
  },
};

export default RSVP;