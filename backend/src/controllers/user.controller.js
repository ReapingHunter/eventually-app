import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Use a secure key (Store in .env for production)

export const signUp = (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  // Hash the password
  const passwordHash = bcrypt.hashSync(password, 10);

  User.create({ first_name, last_name, email, password_hash: passwordHash }, (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Error during sign-up", error: err });
    }
    res.status(201).send({ message: "User registered successfully!", user: data });
  });
};

export const logIn = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err || !user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.user_id }, secretKey, { expiresIn: '1h' });
    res.send({ message: "Login successful", token });
  });
};

export const resetPassword = (req, res) => {
  const { email, newPassword } = req.body;

  // Hash the new password
  const newPasswordHash = bcrypt.hashSync(newPassword, 10);

  User.updatePassword(email, newPasswordHash, (err, data) => {
    if (err) {
      return res.status(500).send({ message: "Error resetting password", error: err });
    }
    res.send({ message: "Password reset successfully" });
  });
};
