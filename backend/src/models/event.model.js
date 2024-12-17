import dbConn from '../../config/db.config.js';

const Event = {
  create: (eventData) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO event (title, description, event_datetime, address, photo, category_id, user_id) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;
      dbConn.query(
        query,
        [
          eventData.title,
          eventData.description,
          eventData.event_datetime,  // Changed from 'date' to 'event_datetime'
          eventData.address,          // Changed from 'location' to 'address' for consistency
          eventData.photo,
          eventData.category_id,
          eventData.user_id,
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

  findByFilter: async (title = "", location = "", dateFrom = "", dateTo = "", category = "") => {
    try {
      const query = `
      SELECT * 
      FROM event
      WHERE deleted_at IS NULL
      AND (
        (title LIKE ? OR ? = '') 
        AND (
          (DATE(event_datetime) BETWEEN ? AND ?) 
          OR (? = '' AND ? = '')
        )
        AND (category_id = ? OR ? = '')
        AND (address LIKE ? OR ? = '')
      )
      ORDER BY title ASC
    `;

      const queryParams = [
        `%${title}%`, title, // Title filter (partial match)
        dateFrom, dateTo, dateFrom, dateTo, // Date range filter
        category, category, // Category filter
        `%${location}%`, location // Location filter (partial match)
      ]
      // Execute query with parameters
      const result = await new Promise((resolve, reject) => {
        dbConn.query(query, queryParams, (err, res) => {
          if (err) {
            console.error("Error fetching events:", err.message);
            return reject(err);
          }
          resolve(res);
        });
      });
  
      return result;
    } catch (error) {
      console.error("Error in filter query:", error.message);
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
  findOrganizer: (event_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT u.username
        FROM events e
        JOIN users u ON e.user_id = u.id
        WHERE e.event_id = ?;
      `;
      dbConn.query(query, [event_id], (err, results) => {
        if (err) {
          console.error("Error fetching organizer username:", err);
          return reject(err);
        }
        if (results.length === 0) {
          resolve(null); // No organizer found
        } else {
          resolve(results[0].username); // Return the username of the organizer
        }
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
        GROUP BY e.event_id, e.title, e.description, e.event_datetime, e.photo
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
        SET title = ?, description = ?, event_datetime = ?, address = ?, photo = ?, category_id = ?, updated_at = NOW() 
        WHERE event_id = ? AND deleted_at IS NULL
      `;
      dbConn.query(
        query,
        [
          eventData.title,
          eventData.description,
          eventData.event_datetime,
          eventData.address,
          eventData.photo,
          eventData.category_id,
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