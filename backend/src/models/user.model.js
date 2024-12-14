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

  updatePassword: (email, newPasswordHash, result) => {
    const query = "UPDATE user SET password_hash = ? WHERE email = ?";
    dbConn.query(query, [newPasswordHash, email], (err, res) => {
      if (err) {
        console.error("Error:", err);
        result(err, null);
      } else {
        result(null, res);
      }
    });
  }
};

export default User;
