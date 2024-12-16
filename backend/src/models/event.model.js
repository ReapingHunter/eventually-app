import dbConn from '../../config/db.config.js';

const Event = {
  create: (eventData) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO event (title, description, event_datetime, address, photo, category_id) 
                     VALUES (?, ?, ?, ?, ?, ?)`;
      dbConn.query(
        query,
        [
          eventData.title,
          eventData.description,
          eventData.event_datetime,  // Changed from 'date' to 'event_datetime'
          eventData.address,          // Changed from 'location' to 'address' for consistency
          eventData.photo,
          eventData.category_id,
        ],
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
      const query = "SELECT * FROM event WHERE deleted_at IS NULL ORDER BY event.title ASC";
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

  findByFilter: async (title = "", date = "", category = "", location = "") => {
    try {
      let query = `SELECT event_id, photo, title, event_datetime, address, category_id 
                   FROM event 
                   WHERE deleted_at IS NULL`;
  
      const queryParams = [];
  
      // Only filter by category_id in this case
      if (category) {
        query += ` AND category_id = ?`;
        queryParams.push(category);
      }
  
      const result = await new Promise((resolve, reject) => {
        dbConn.query(query, queryParams, (err, res) => {
          if (err) {
            console.error("Error fetching events:", err);
            return reject(err);
          }
          resolve(res);
        });
      });
  
      return result;
    } catch (error) {
      console.error("Error in filter query:", error);
      throw error;
    }
  },
   
  findByUser: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM event 
                     WHERE user_id = ?
                     AND deleted_at IS NULL`;
      dbConn.query(query, [userId], (err, res) => {
        if(err){
          console.error("Error fetching event:", err)
          return reject(err)
        }
        resolve(res)
      });
    });
  },
  
  findTopEvents: () => {
    return new Promise ((resolve, reject) => {
      const query = `
        SELECT e.*, 
               COUNT(r.rsvp_id) AS rsvp_count
        FROM event e
        LEFT JOIN rsvp r ON e.event_id = r.event_id
        WHERE e.deleted_at IS NULL
        GROUP BY e.event_id, e.title, e.description, e.event_date, e.event_time, e.photo
        ORDER BY rsvp_count DESC
        LIMIT 8
      `
      dbConn.query(query, (err, res) => {
        if(err){
          console.error("Error fetching top events:", err);
          return reject(err);
        }
        resolve(res)
      })
    })
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