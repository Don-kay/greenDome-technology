const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide class name"],
      maxLength: 30,
      minLength: 3,
      trim: true,
    },
    author: {
      type: String,
      ref: "User",
      required: [true, "Please provide user"],
      trim: true,
    },
    fee: {
      type: Number,
      minLength: [3, "figure musnt be less than 3 digits"],
      required: [true, "please attach a fee"],
      trim: true,
    },
    profit: {
      type: Number,
    },
    year: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      required: [true, "please provide course description"],
      maxLength: 100,
      minLength: 10,
      trim: true,
    },
    image: {
      type: String,
      required: [true, "please provide image"],
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
      default: [],
    },
    party_type: {
      type: [String],
      ref: "User",
      required: [true, "Please provide user"],
      // enum: ["company", "tutor", "student"],
      // default: "student",
    },
    Serial_key: {
      type: String,
      required: [true, "please provide course code"],
      unique: [true, "please provide another value"],
      maxLength: 15,
      minLength: 9,
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId, //THIS points to the associated userid coming from authorization token
      ref: "User", //reference the User model
      required: [true, "Please provide user"],
      trim: true,
    },
    assigned_tutor: {
      type: [String], //THIS points to the associated userid coming from authorization token
      // ref: "User", //reference the User model
      default: [],
      // required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("class", classSchema);
