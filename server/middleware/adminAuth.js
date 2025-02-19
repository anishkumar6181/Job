import jwt from "jsonwebtoken";
import Admin from "../models/AdminModel.js";

export const adminAuth = async (req, res, next) => {
  try {
    // Check for token in both cookie and Authorization header
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Authentication required" 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check token expiration
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ 
        success: false, 
        message: "Token expired" 
      });
    }

    // Find admin and exclude password
    const admin = await Admin.findById(decoded.id)
      .select("-password")
      .lean();

    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: "Not authorized - Invalid admin" 
      });
    }

    // Add admin to request object
    req.admin = admin;
    next();

  } catch (error) {
    console.error("Admin Auth Error:", error);
    res.status(401).json({ 
      success: false, 
      message: error.name === 'JsonWebTokenError' 
        ? "Invalid token" 
        : "Authentication failed"
    });
  }
};
