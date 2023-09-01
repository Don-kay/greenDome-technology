const mongoose = require("mongoose");

const RatioSchema = new mongoose.Schema(
  {
    percentage: {
      type: Number,
      required: [true, "please provide digit"],
      maxLength: 5,
      minLength: 0,
      trim: true,
    },
    party_type: {
      type: [String],
      ref: "User",
      required: [true, "Please provide user"],
      // enum: ["company", "tutor", "student"],
      // default: "student",
    },
    createdBy: {
      type: mongoose.Types.ObjectId, //THIS points to the associated userid coming from authorization token
      ref: "User", //reference the User model
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ratio", RatioSchema);
