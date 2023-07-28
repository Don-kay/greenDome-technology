const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  currency: {
    type: Array,
    enum: ["$", "N"],
    default: [],
    required: [true, "please provide course name"],
  },
  amount: {
    type: Number,
    required: [true, "please provide amount"],
  },
  account_name: {
    type: Number,
    required: [true, "please provide acoount number"],
    trim: true,
  },
  account_number: {
    type: String,
    required: [true, "please provide acoount name"],
    trim: true,
  },
  signee_account_name: {
    type: String,
    required: [true, "please provide acoount name"],
    trim: true,
  },
  signee_account_number: {
    type: Number,
    required: [true, "please provide acoount number"],
    trim: true,
  },
  course_paid: {
    type: String,
    required: [true, "Please provide course name"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true],
    // enum: ["company", "tutor", "student"],
    // default: "student",
  },
});

module.exports = mongoose.model("paymentDetails", PaymentSchema);
