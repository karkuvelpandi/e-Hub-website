import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Generate a JWT
const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

// Verify a JWT
const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
