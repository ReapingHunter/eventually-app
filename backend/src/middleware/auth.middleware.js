import jwt from 'jsonwebtoken';

const secretKey = 'your_secret_key'; // Use a secure key

export const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers['authorization'];

  // Check if the token exists
  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }

  // Extract the actual token if it includes the "Bearer" prefix
  const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

  // Verify the token
  jwt.verify(actualToken, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    // Store decoded user ID in the request object for further use
    req.userId = decoded.id;
    next();
  });
};