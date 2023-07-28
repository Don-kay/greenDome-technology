const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please provide course name"],
      maxLength: 50,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "please provide course description"],
      maxLength: 100,
      minLength: 10,
    },
    content: {
      type: String,
      required: [true, "please provide course content"],
      maxLength: 500,
    },
    bios: {
      type: String,
      maxLength: 50,
    },
    code: {
      type: Number,
      required: [true, "please provide course code"],
      unique: [true, "please provide another value"],
      maxLength: 5,
    },
    status: {
      type: String,
      enum: ["visible", "not visible"],
      default: "visible",
    },
    party_type: {
      type: [String],
      ref: "User",
      required: [true, "Please provide user"],
      // enum: ["company", "tutor", "student"],
      // default: "student",
    },
    category: {
      type: [String],
      enum: [
        "none",
        "machine learning",
        "html",
        "css",
        "node.js",
        "react js",
        "full stack development",
        "UI/UX",
      ],
      default: "none",
    },
    // fee: {
    //   type: Number,
    //   required: [true, "please provide products price"],
    // },
    level: {
      type: [String],
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
      required: [true, "input difficulty level"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      ref: "class",
    },
    classId: {
      type: mongoose.Types.ObjectId,
      ref: "class",
    },
    createdBy: {
      type: mongoose.Types.ObjectId, //THIS points to the associated userid coming from authorization token
      ref: "User", //reference the User model
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("module", CourseSchema);
