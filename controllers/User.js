const cookie = require("cookie");
//connect user to controller
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
var _ = require("lodash");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const register = async (req, res) => {
  //if none of the user details matches the mongoose validation, error wont display in postman terminal cause there is no middlewARE
  //to save the register details in mongoose attach the the user mongoose with create method
  //to display content on the web,  use res.send
  //   res.send("register page");
  const user = await User.create({ ...req.body }); //since the body has multiple content, use a spread operator to list them out
  //sinsce createjwt func uses this. we connect the name and id details from the body by storing them in the variable in createjwt
  //note...they must be stored with the exact body value
  const token = user.CreateJwt();
  res
    .cookie("myToken", token, { httpOnly: true })
    .status(StatusCodes.CREATED)
    .json({
      token,
      user: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        name: user.username,
        country: user.country,
        roles: user.roles,
        mobilenumber: user.mobilenumber,
      },
    });
};

const userNameLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError("please provide login details");
  }
  //check for user
  const user = await User.findOne({ username });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  //compare passwords
  const booleanPwd = await user.comparePasswords(password);
  if (!booleanPwd) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const Roles = user.roles;
  //you must use the new user from findone method to createjwt
  // const token = user.CreateJwt();
  res.status(StatusCodes.OK).json({
    user: {
      firstname: user.firstname,
      username: user.username,
      email: user.email,
      country: user.country,
      mobilenumber: user.mobilenumber,
      roles: Roles,
    },
  });

  // res.send("Login page");
};
const emailLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST).send("please provide login details");
    // throw new BadRequestError("please provide login details");
    return;
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).send("Invalid Credentials, sign up");
    // throw new UnauthenticatedError("Invalid Credentials, sign up");
    return;
  }
  //compare passwords
  const booleanPwd = await user.comparePasswords(password);
  if (!booleanPwd) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send("Invalid, provide valid credentials");
    // throw new UnauthenticatedError("Invalid Credentials");
    return;
  }
  const Roles = user.roles;
  //you must use the new user from findone method to createjwt
  const token = user.CreateJwt();

  res
    .setHeader(
      "set-cookie",
      cookie.serialize("myToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 3600,
        path: "/",
      })
    )
    .cookie("myToken", token, { httpOnly: true })
    .status(StatusCodes.OK)
    .json({
      token,
      user: {
        msg: "succesfully signed in",
        id: user._id,
        firstname: user.firstname,
        username: user.username,
        email: user.email,
        country: user.country,
        mobilenumber: user.mobilenumber,
        roles: Roles,
      },
    });
  return;
  // res.send("Login page");
};
const GetAllUsers = async (req, res) => {
  const user = await User.find().sort("createdAt");
  if (!user) {
    throw new NotFoundError("no user found");
  }
  function selectProps(...props) {
    return function Object(prop) {
      const newObject = {};
      props.forEach((item) => {
        newObject[item] = prop[item];
      });
      return newObject;
    };
  }
  const visibleData = user.map(
    selectProps(
      "id",
      "email",
      "country",
      "mobilenumber",
      "certificate",
      "roles",
      "firstname",
      "lastname",
      "username",
      "biography",
      "classesId",
      "createdAt",
      "updatedAt"
    )
  );

  // const transform = (obj, predicate) => {
  //   return Object.keys(obj).reduce((memo, key) => {
  //     if (predicate(obj[key], key)) {
  //       memo[key] = obj[key];
  //     }
  //     return memo;
  //   }, {});
  // };
  // const omit = (obj, items) => transform(obj, (key) => !items.includes(key));

  // const visibleData = omit(user, ["password"]);

  //console.log(visibleData);

  res.status(StatusCodes.OK).json({
    user: visibleData,
    count: user.length,
  });
};
const UpdateProfile = async (req, res) => {
  // ffirst working solution is to find by id and email
  const foundUser = await User.findById(req.user.userId);
  const {
    body: { firstname, lastname, roles },
    params: { id: userId },
  } = req;
  const { email } = foundUser;

  if (firstname === " " || lastname === " " || roles === " ") {
    throw new BadRequestError("  Fields cannot be empty ");
  }

  // const Email = await User.findOne({ email });
  const user = await User.findOneAndUpdate(
    { _id: userId, email: email },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    throw new NotFoundError(`${firstname} is not a valid user `);
  }
  res.status(StatusCodes.OK).json({
    msg: "profile successfully updated",
    user: {
      msg: "succesfully updated",
      id: user._id,
      firstname: user.firstname,
      username: user.username,
      email: user.email,
      country: user.country,
      mobilenumber: user.mobilenumber,
      biography: user.biography,
      classesId: user.classesId,
      certificate: user.certificate,
      roles: user.roles,
    },
  });
};
const UpdateAllProfile = async (req, res) => {
  const {
    body: {
      firstname,
      lastname,
      certificate,
      country,
      mobilenumber,
      biography,
      roles,
    },
    params: { id: userId },
  } = req;

  if (
    // firstname === " " ||
    // lastname === " " ||
    // certificate === [] ||
    // country === "" ||
    // mobilenumber === "" ||
    // biography === "" ||
    roles === " "
  ) {
    throw new BadRequestError("  Fields cannot be empty ");
  }

  // const Email = await User.findOne({ email });
  const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: "is not a valid user" });
    // throw new NotFoundError(`${firstname} is not a valid user `);
  }
  res.status(StatusCodes.OK).json({
    msg: "profile successfully updated",
    user: {
      msg: "succesfully updated",
      id: user._id,
      firstname: user.firstname,
      username: user.username,
      email: user.email,
      country: user.country,
      mobilenumber: user.mobilenumber,
      biography: user.biography,
      classesId: user.classesId,
      certificate: user.certificate,
      roles: user.roles,
    },
  });
};
const DeleteAllProfile = async (req, res) => {
  // ffirst working solution is to find by id and email
  const {
    params: { id: userId },
  } = req;
  if (!userId) {
    throw new NotFoundError(`${userId} doesnt exist `);
  }
  // const Email = await User.findOne({ email });
  const user = await User.findOneAndRemove({ _id: userId });
  if (!user) {
    throw new NotFoundError(`${userId} is not an existing user `);
  }
  res.status(StatusCodes.OK).json({ msg: "profile successfully removed" });
};

module.exports = {
  register,
  userNameLogin,
  emailLogin,
  GetAllUsers,
  UpdateProfile,
  UpdateAllProfile,
  DeleteAllProfile,
};
