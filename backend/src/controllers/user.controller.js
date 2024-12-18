import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Use a secure key (Store in .env for production)

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findByUsernameOrEmail(username, email);
    if (existingUser) {
      return res.status(409).send({ message: "Username or email already in use" });
    }

    // Hash the password
    const passwordHash = bcrypt.hashSync(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password_hash: passwordHash,
    });

    res.status(201).send({
      message: "User registered successfully!",
      user: {
        id: newUser.id,
        username,
        email,
      },
    });
  } catch (err) {
    console.error("Error during sign-up:", err);
    res.status(500).send({ message: "Error during sign-up", error: err });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if the user exists by username or email
    const user = await User.findByUsernameOrEmail(username, email);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Verify the password
    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.user_id }, secretKey, { expiresIn: '1h' });
    res.send({ message: "Login successful", token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send({ message: "Error during login", error: err });
  }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  // Check if passwords match
  if (newPassword !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }

  // Hash the new password
  const newPasswordHash = bcrypt.hashSync(newPassword, 10);

  try {
    const user = await User.findByUsernameOrEmail(null, email);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update the password in the database
    await User.updatePassword(email, newPasswordHash);

    res.send({ message: "Password reset successfully!" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).send({ message: "Error resetting password", error: err });
  }
};

export const checkLoggedIn = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from the token by the middleware
    if (!userId) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    res.send({ message: "User is logged in", userId });
  } catch (err) {
    console.error("Error checking login status:", err);
    res.status(500).send({ message: "Error checking login status", error: err });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send(user)
  } catch (error){
    console.error("Error getting user:", error);
    res.status(500).send({ message: "Error getting user", error: error });
  }
}