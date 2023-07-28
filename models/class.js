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
    },
    fee: {
      type: Number,
      minLength: [3, "figure musnt be less than 3 digits"],
      required: [true, "please attach a fee"],
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
    },
    content: {
      type: String,
      required: [true, "please provide a minium of 5 contents"],
      maxLength: 100,
    },
    content1: {
      type: String,
      required: [true, "please provide a minium of 5 contents"],
      maxLength: 100,
    },
    content2: {
      type: String,
      required: [true, "please provide a minium of 5 contents"],
      maxLength: 100,
    },
    content3: {
      type: String,
      required: [true, "please provide a minium of 5 contents"],
      maxLength: 100,
    },
    content4: {
      type: String,
      required: [true, "please provide a minium of 5 contents"],
      maxLength: 100,
    },
    content5: {
      type: String,
      maxLength: 100,
    },
    content6: {
      type: String,
      maxLength: 100,
    },
    content7: {
      type: String,
      maxLength: 100,
    },
    content8: {
      type: String,
      maxLength: 100,
    },
    content9: {
      type: String,
      maxLength: 100,
    },
    content10: {
      type: String,
      maxLength: 100,
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
      required: [true, "please provide class code"],
      unique: [true, "please provide another value"],
      maxLength: 15,
      minLength: 9,
    },
    createdBy: {
      type: mongoose.Types.ObjectId, //THIS points to the associated userid coming from authorization token
      ref: "User", //reference the User model
      required: [true, "Please provide user"],
    },
    assigned_tutor: {
      type: [mongoose.Types.ObjectId], //THIS points to the associated userid coming from authorization token
      ref: "User", //reference the User model
      default: [],
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("class", classSchema);
