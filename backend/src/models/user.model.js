import dbConn from '../db.config.js';

const User = {
  create: (userData, result) => {
    const query = "INSERT INTO User (first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)";
    dbConn.query(query, [userData.first_name, userData.last_name, userData.email, userData.password_hash], (err, res) => {
      if (err) {
        console.error("Error:", err);
        result(err, null);
      } else {
        result(null, { id: res.insertId, ...userData });
      }
    });
  },

  findByEmail: (email, result) => {
    const query = "SELECT * FROM User WHERE email = ?";
    dbConn.query(query, [email], (err, res) => {
      if (err) {
        console.error("Error:", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    });
  },

  updatePassword: (email, newPasswordHash, result) => {
    const query = "UPDATE User SET password_hash = ? WHERE email = ?";
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
