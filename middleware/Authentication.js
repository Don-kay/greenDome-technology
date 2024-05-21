const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  //check if theres no token in headers
  const AuthHeader = req.headers.cookie || req.headers.Cookie;
  //console.log(AuthHeader);
  if (!AuthHeader || !AuthHeader.startsWith("myToken")) {
    throw new UnauthenticatedError("Authentication not valid");
  } //i had a bug with startswith instead of startsWith and this caused user not been passes (err)
  //check if it exists
  const token = AuthHeader.split("=")[1]; //token has all the user details
  //attach the user to course route
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
      // console.log(err, "error");
      // console.log(res, "result");
    });
    // const ver = JSON.stringify(verify);
    //console.log(verify);
    if (verify === "token expired") {
      //console.log(true);
      return res.send({ status: "error", data: verify });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET); //i had a bug with sign instead of verify and this caused user not been passes (err)
    //attach the authenticated user details to the req.user
    // console.log(payload);
    // console.log(verify);
    if (payload) {
      req.user = {
        userId: payload.userId,
        firstname: payload.firstname,
        username: payload.username,
        roles: payload.roles,
        // token: verify,
      };
      // console.log(req.session);
      next();
    } else {
      throw new UnauthenticatedError("password doesnt match");
    }
  } catch (error) {
    throw new UnauthenticatedError("password doesnt match");
  }
};
module.exports = auth;
