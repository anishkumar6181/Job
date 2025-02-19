import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    applicationUrl: {
      type: String,
      trim: true,
      default: ''
    },
    location: {
      country: {
        type: String,
        required: true
      },
      city: {
        type: String,
        default: ''
      },
      address: {
        type: String,
        default: ''
      }
    },
    salary: {
      type: Number,
      required: true,
    },
    salaryType: {
      type: String,
      default: "Year",
    },
    employmentType: {
      type: [String],
      required: true,
      enum: ['Full Time', 'Part Time', 'Contract', 'Internship']
    },
    negotiable: {
      type: Boolean,
      default: false,
    },
    jobType: [
      {
        type: String,
        required: true,
      },
    ],

    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],

    skills: [
      {
        type: String,
        required: true,
      },
    ],

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);

export default Job;
