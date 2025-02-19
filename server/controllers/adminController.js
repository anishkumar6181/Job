import asyncHandler from "express-async-handler";
import Admin from "../models/AdminModel.js";
import Job from "../models/JobModel.js";
import jwt from "jsonwebtoken";

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }

  const admin = await Admin.findOne({ email });
  
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  res.status(200).json({
    success: true,
    admin: {
      id: admin._id,
      name: admin.name,
      email: admin.email
    }
  });
});

export const checkAdminAuth = asyncHandler(async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    
    if (!admin) {
      return res.status(401).json({ isAuthenticated: false });
    }

    res.status(200).json({
      isAuthenticated: true,
      admin
    });
  } catch (error) {
    res.status(401).json({ isAuthenticated: false });
  }
});


 // Add this import

//  import Job from '../models/JobModel.js';
//  import asyncHandler from 'express-async-handler';
 
 export const createAdminJob = asyncHandler(async (req, res) => {
   try {
     const {
       title,
       description,
       salaryType,
       employmentType,
       salary,
       location,
       skills,
       negotiable,
       tags,
       applicationUrl
     } = req.body;
 
     // Validate required fields
     if (!title || !description || !salary || !location.country) {
       return res.status(400).json({
         success: false,
         message: 'Please provide all required fields'
       });
     }
 
     const job = await Job.create({
       title,
       description,
       salaryType,
       employmentType,
       salary,
       location,
       skills,
       negotiable,
       tags,
       applicationUrl,
       createdBy: req.admin._id,
       isAdminPost: true
     });
 
     res.status(201).json({
       success: true,
       job
     });
   } catch (error) {
     console.error('Admin job creation error:', error);
     res.status(500).json({
       success: false,
       message: error.message || 'Error creating job'
     });
   }
 });



export const getAdminJobs = asyncHandler(async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.admin._id })
      .sort({ createdAt: -1 })
      .populate('createdBy', 'name email');
    
    res.status(200).json({
      success: true,
      jobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching admin jobs'
    });
  }
});