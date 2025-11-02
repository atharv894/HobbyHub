import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Check if JWT_SECRET is configured
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment variables');
      return res.status(500).json({ message: "Server configuration error: JWT_SECRET missing" });
    }

    // Get token from cookies or Authorization header
    let token = req.cookies.token;
    
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      } else {
        token = authHeader;
      }
    }

    if (!token) {
      console.log('No token found in request');
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Token verified successfully for user:', decoded.userId);
    next();
  } catch (error) {
    console.error('JWT verification error:', error.message);
    console.error('JWT error stack:', error.stack);
    res.status(400).json({ message: "Invalid token." });
  }
};
