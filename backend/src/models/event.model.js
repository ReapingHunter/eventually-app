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

  findByFilter: async (eventName="", dateFrom="", dateTo="", category="", location="") => {
    try {
      const query = `SELECT event_id, photo, title, event_date, event_time, address FROM event 
                      WHERE title = ? 
                      AND event_date BETWEEN ? AND ? 
                      AND category_id = ? 
                      AND address = ?`
      
      const result = await new Promise((resolve, reject) => {
        dbConn.query(query, (err, res) => {
          if(err){
            console.error("Error fetching event:", err)
            return reject(err)
          }
          resolve(res)
        })
      })
      return result
    } catch (error) {
      console.error(error.message)
    }
  },

  findByUser: async (userId) => {
    try {
      const query = `SELECT event_id, photo, title, event_date, event_time, address WHERE user_id = ?`
      const result = await new Promise((resolve, reject) => {
        dbConn.query(query, (err, res) => {
          if(err){
            console.error("Error fetching event:", err)
            return reject(err)
          }
          resolve(res)
        })
      })
      return result
    } catch (error) {
      console.error(error.message)
    }
  },
  updateById: (id, eventData) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE event 
                     SET title = ?, description = ?, date = ?, location = ?, photo = ?
                     WHERE event_id = ?`;
      dbConn.query(
        query,
        [eventData.title, eventData.description, eventData.date, eventData.location, eventData.photo, id],
        (err, res) => {
          if (err) {
            console.error("Error updating event:", err);
            return reject(err);
          }
          if (res.affectedRows === 0) {
            return reject(new Error("Event not found or no changes made"));
          }
          resolve({ id, ...eventData });
        }
      );
    });
  },
  
  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM event WHERE event_id = ?";
      dbConn.query(query, [id], (err, res) => {
        if (err) {
          console.error("Error deleting event:", err);
          return reject(err);
        }
        if (res.affectedRows === 0) {
          return reject(new Error("Event not found"));
        }
        resolve({ message: "Event deleted successfully" });
      });
    });
  }  
};

export default Event;