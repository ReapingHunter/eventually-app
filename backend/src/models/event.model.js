import dbConn from '../../config/db.config.js';

const Event = {
  create: (eventData) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO event (title, description, date, location, photo) VALUES (?, ?, ?, ?, ?)";
      dbConn.query(
        query,
        [eventData.title, eventData.description, eventData.date, eventData.location, eventData.photo],
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
      const query = "SELECT * FROM event WHERE deleted_at IS NULL";
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
      const query = "SELECT * FROM event WHERE event_id = ? AND deleted_at IS NULL";
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

  findByUser: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT event_id, photo, title, event_date, event_time, address FROM event 
                     WHERE user_id = ?`;
      dbConn.query(query, [userId], (err, res) => {
        if(err){
          console.error("Error fetching event:", err)
          return reject(err)
        }
        resolve(res[0])
      });
    });
  },
  
  updateById: (id, eventData) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE event 
        SET title = ?, description = ?, event_date = ?, event_time = ?, address = ?, photo = ?, updated_at = NOW() 
        WHERE event_id = ? AND deleted_at IS NULL
      `;
      dbConn.query(
        query,
        [
          eventData.title,
          eventData.description,
          eventData.date,
          eventData.time,
          eventData.location,
          eventData.photo,
          id
        ],
        (err, res) => {
          if (err) {
            console.error("Error updating event:", err);
            return reject(err);
          }
          if (res.affectedRows === 0) {
            return reject(new Error("Event not found or has been deleted"));
          }
          resolve({ id, ...eventData });
        }
      );
    });
  },
  
  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE event SET deleted_at = NOW() WHERE event_id = ? AND deleted_at IS NULL";
      dbConn.query(query, [id], (err, res) => {
        if (err) {
          console.error("Error soft deleting event:", err);
          return reject(err);
        }
        if (res.affectedRows === 0) {
          return reject(new Error("Event not found or already deleted"));
        }
        resolve({ message: "Event soft deleted successfully" });
      });
    });
  }  
};

export default Event;