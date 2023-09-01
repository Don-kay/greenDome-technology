const Class = require("../models/class");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const CreateClass = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const user = await User.findById({ _id: userId });
  // console.log(user);
  if (!req.body) {
    res.status(StatusCodes.BAD_REQUEST).send("fill in all credentials");
  }
  req.body.party_type = user.roles;
  req.body.author = user.firstname;
  req.body.createdBy = req.user.userId;
  const course = await Class.create(req.body);
  res.status(StatusCodes.CREATED).json({ course });
};
const GetUsersClass = async (req, res) => {
  const course = await Class.find({ createdBy: req.user.userId });
  if (!course) {
    throw new NotFoundError("you are yet to create a course");
  }
  res.status(StatusCodes.OK).json({ course, count: course.length });
};
const AdminGetAllUsersClass = async (req, res) => {
  const course = await Class.find().sort("createdAt");
  if (!course) {
    throw new NotFoundError("sorry no class has been created");
  }
  res.status(StatusCodes.OK).json({ course, count: course.length });
};
const AdminGetAllsingleClass = async (req, res) => {
  const {
    user: { userId },
    params: { id: classesId },
  } = req;
  const course = await Class.findById({ _id: classesId });
  if (!course) {
    throw new NotFoundError(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json({ course });
};
const GetsingleClass = async (req, res) => {
  const {
    user: { userId },
    params: { id: classesId },
  } = req;
  const course = await Class.findOne({ _id: classesId, createdBy: userId });
  if (!course) {
    throw new NotFoundError(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json({ course });
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
  const course = await Class.findOneAndUpdate(
    { _id: classesId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!course) {
    throw new NotFoundError(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json({ course });
};
const AdminUpdateAllUsersClass = async (req, res) => {
  const {
    body: { name, description, fee, party_type },
    user: { userId },
    params: { id: classesId },
  } = req;
  if (name === " " || fee === " " || description === " ") {
    throw new BadRequestError("fields cannot be empty");
  }
  req.body.party_type = party_type;
  const course = await Class.findByIdAndUpdate({ _id: classesId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    throw new NotFoundError(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json({ course });
};
const UpdateProfit = async (req, res) => {
  const {
    body: { party_type },
    user: { userId },
    params: { id: classesId },
  } = req;
  // req.body.party_type = party_type;
  const course = await Class.findByIdAndUpdate({ _id: classesId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json({ course });
};
const DeleteUsersClass = async (req, res) => {
  const {
    user: { userId },
    params: { id: classesId },
  } = req;
  const course = await Class.findOneAndRemove({
    _id: classesId,
    createdBy: userId,
  });
  if (!course) {
    throw new NotFoundError(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json("successsfully removed class");
};
const AdminDeleteAllUsersClass = async (req, res) => {
  const {
    params: { id: classesId },
  } = req;
  const course = await Class.findOneAndRemove({ _id: classesId });
  if (!course) {
    throw new NotFoundError(`sorry no class found with id: ${classesId}`);
  }
  res.status(StatusCodes.OK).json("successsfully removed class");
};

module.exports = {
  CreateClass,
  UpdateProfit,
  GetUsersClass,
  AdminGetAllUsersClass,
  GetsingleClass,
  AdminGetAllsingleClass,
  UpdateUsersClass,
  AdminUpdateAllUsersClass,
  DeleteUsersClass,
  AdminDeleteAllUsersClass,
};
