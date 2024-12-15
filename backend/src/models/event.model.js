import dbConn from '../../config/db.config.js';

const Event = {
  create: (eventData) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO event (title, description, event_datetime, location, photo) VALUES (?, ?, ?, ?, ?)";
      dbConn.query(
        query,
        [eventData.title, eventData.description, eventData.event_datetime, eventData.location, eventData.photo],
        (err, res) => {
          if (err) {
            console.error("Error creating event:", err);
            return reject(err);
          }
          resolve({ id: res.insertId, ...eventData });
        }
      );
    });
  },

  findAll: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM event";
      dbConn.query(query, (err, res) => {
        if (err) {
          console.error("Error fetching events:", err);
          return reject(err);
        }
        resolve(res);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM event WHERE event_id = ?";
      dbConn.query(query, [id], (err, res) => {
        if (err) {
          console.error("Error fetching event:", err);
          return reject(err);
        }
        resolve(res[0]);
      });
    });
  },
};

export default Event;