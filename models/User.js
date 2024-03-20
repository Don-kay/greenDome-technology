//create user schema (use Mongoose)
const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "please provide a name"],
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    lastname: {
      type: String,
      required: [true, "please provide a name"],
      trim: true,
      minLength: 3,
      maxLength: 20,
    },
    username: {
      type: String,
      required: [true, "please provide a username"],
      unique: [true, "please provide another value"],
      trim: true,
      maxLength: 15,
      minLength: 3,
    },
    mobilenumber: {
      type: String,
      required: [true, "please provide a number"],
      match: /^(\()?\d{3}(\))?\d{3}\d{4}$/,
    },
    country: {
      type: Number,
      enum: [234, 141, 199, 444, 205, 363],
      default: "141",
      required: [true, "please provide a name"],
    },
    biography: {
      type: String,
      //maxLength: 200,
      minLength: 20,
    },
    image: {
      type: String,
      required: [true, "please provide image"],
    },
    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: "0",
    },
    certificate: {
      type: [String],
      enum: [
        "none",
        "AWS Developer",
        "Software Engineer",
        "Web Developer",
        "Data Analyst",
        "IT Engineer",
      ],
      default: ["none"],
    },
    // userName: {
    //   type: String,
    //   required: [true, "please provide userName"],
    //   index: true,
    //   unique: true,
    //   minLength: [5, "length must not be less than five"],
    //   maxLength: 12,
    // },
    roles: {
      type: [String],
      enum: ["company", "Admin", "tutor", "student"],
      default: ["company"],
    },
    email: {
      type: String,
      required: [true, "please provide a name"],
      trim: true,
      lowerCase: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please enter a valid email",
      ],
    },
    classesId: {
      type: [mongoose.Types.ObjectId],
      ref: "class",
      default: [],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      minLength: 6,
      maxLength: 10,
    },
  },
  { timestamps: true }
);

//we hashing the passowrd
UserSchema.pre("save", async function () {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
});

UserSchema.methods.CreateJwt = function () {
  //trying to sign the coming user details(_id and name) with jwt and also create a token
  return jwt.sign(
    {
      userId: this._id,
      username: this.username,
      firstname: this.firstname,
      roles: this.roles,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};
UserSchema.methods.LogoutJwt = function () {
  //trying to sign the coming user details(_id and name) with jwt and also create a token
  return jwt.sign(
    {
      userId: this._id,
      username: this.username,
      firstname: this.firstname,
      roles: this.roles,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LOGOUT }
  );
};
UserSchema.methods.comparePasswords = async function (Pwd) {
  //bycrpt is used also for comparing items
  const pwdMatch = await bycrypt.compare(Pwd, this.password);
  return pwdMatch;
};

module.exports = mongoose.model("User", UserSchema);
//  const secret = new TextEncoder().encode("fTjWnZr4u7x!A%D*G-KaPdSgVkXp2s5v");
//  console.log(secret);
//  return new jose.SignJWT(
//    {
//      userId: this._id,
//      username: this.username,
//      firstname: this.firstname,
//      roles: this.roles,
//    },
//    // process.env.JWT_SECRET,
//    { expiresIn: process.env.JWT_LIFETIME }
//  )
//    .setProtectedHeader({ alg: "HS256" })
//    .setExpirationTime("1d")
//    .sign(secret);
