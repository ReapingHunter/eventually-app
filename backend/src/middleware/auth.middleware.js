import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Use a secure key

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id; // Store decoded user ID in request object
    next();
  });
};
