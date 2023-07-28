const Class = require("../models/class");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const CreateClass = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const user = await User.findById({ _id: userId });
  req.body.party_type = user.roles;
  req.body.author = user.firstname;
  req.body.createdBy = req.user.userId;
  const classes = await Class.create(req.body);
  res.status(StatusCodes.CREATED).json({ classes });
};
const GetUsersClass = async (req, res) => {
  const classes = await Class.find({ createdBy: req.user.userId });
  if (!classes) {
    throw new NotFoundError("you are yet to create a course");
  }
  res.status(StatusCodes.OK).json({ classes, count: classes.length });
};
const GetAllUsersClass = async (req, res) => {
  const classes = await Class.find().sort("createdAt");
  if (!classes) {
    throw new NotFoundError("sorry no class has been created");
  }
  res.status(StatusCodes.OK).json({ classes, count: classes.length });
};
const GetsingleClass = async (req, res) => {
  const {
    user: { userId },
    params: { id: classesId },
  } = req;
  const classes = await Class.findOne({ _id: classesId, createdBy: userId });
  if (!classes) {
    throw new NotFoundError(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json({ classes });
};
const UpdateUsersClass = async (req, res) => {
  const {
    body: { name, year, description, Serial_key },
    user: { userId },
    params: { id: classesId },
  } = req;
  if (
    name === " " ||
    year === " " ||
    description === " " ||
    Serial_key === " "
  ) {
    throw new BadRequestError("fields cannot be empty");
  }
  const classes = await Class.findOneAndUpdate(
    { _id: classesId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!classes) {
    throw new NotFoundError(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json({ classes });
};
const UpdateAllUsersClass = async (req, res) => {
  const {
    body: { name, year, description, fee, Serial_key },
    user: { userId },
    params: { id: classesId },
  } = req;
  if (
    name === " " ||
    year === " " ||
    fee === " " ||
    description === " " ||
    Serial_key === " "
  ) {
    throw new BadRequestError("fields cannot be empty");
  }
  const classes = await Class.findByIdAndUpdate({ _id: classesId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!classes) {
    throw new NotFoundError(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json({ classes });
};
const DeleteUsersClass = async (req, res) => {
  const {
    user: { userId },
    params: { id: classesId },
  } = req;
  const classes = await Class.findOneAndRemove({
    _id: classesId,
    createdBy: userId,
  });
  if (!classes) {
    throw new NotFoundError(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json("successsfully removed class");
};
const DeleteAllUsersClass = async (req, res) => {
  const {
    params: { id: classesId },
  } = req;
  const classes = await Class.findOneAndRemove({ _id: classesId });
  if (!classes) {
    throw new NotFoundError(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json("successsfully removed class");
};

module.exports = {
  CreateClass,
  GetUsersClass,
  GetAllUsersClass,
  GetsingleClass,
  UpdateUsersClass,
  UpdateAllUsersClass,
  DeleteUsersClass,
  DeleteAllUsersClass,
};
