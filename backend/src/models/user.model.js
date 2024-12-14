import dbConn from '../../config/db.config.js';

const User = {
  create: (userData) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO user (username, email, password_hash) VALUES (?, ?, ?)";
      dbConn.query(
        query,
        [
          userData.username,
          userData.email,
          userData.password_hash,
        ],
        (err, res) => {
          if (err) {
            console.error("Error:", err);
            return reject(err);
          }
          resolve({ id: res.insertId, ...userData });
        }
      );
    });
  },

  findByUsernameOrEmail: (username, email) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM user WHERE username = ? OR email = ?";
      dbConn.query(query, [username, email], (err, res) => {
        if (err) {
          console.error("Error:", err);
          return reject(err);
        }
        resolve(res[0]);
      });
    });
  },

  findById: (userId) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT id, username, email FROM user WHERE id = ?";
      dbConn.query(query, [userId], (err, res) => {
        if (err) {
          console.error("Error fetching user by ID:", err);
          return reject(err);
        }
        if (res.length === 0) {
          return resolve(null); // User not found
        }
        resolve(res[0]);
      });
    });
  },

  updatePassword: (email, newPasswordHash) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE user SET password_hash = ? WHERE email = ?";
      dbConn.query(query, [newPasswordHash, email], (err, res) => {
        if (err) {
          console.error("Error updating password:", err);
          return reject(err);
        }
        resolve(res);
      });
    });
  }
};

export default User;
