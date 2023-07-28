const Course = require("../models/Course");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
// we can display the req.body to test controllers
//start wwith create course

const GetUserCourses = async (req, res) => {
  const course = await Course.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  if (!course) {
    throw new NotFoundError("you are yet to create a Course");
  }
  res.status(StatusCodes.OK).json({ course, count: course.length });
  //   res.send("get all courses");
};
const GetAllCourses = async (req, res) => {
  const course = await Course.find().sort("createdAt");
  if (!course) {
    throw new NotFoundError("No course has been registered yet");
  }
  res.status(StatusCodes.OK).json({ course, count: course.length });
  // res.send("view all courses");
};
const CreateCourse = async (req, res) => {
  const {
    user: { userId },
    params: { id: classId, nameid: className },
  } = req;

  // console.log(classId, className);
  const user = await User.findById({ _id: userId });
  req.body.party_type = user.roles;
  req.body.createdBy = req.user.userId; // we pass the user id coming from the authhead into the createBy in the mongoose schema
  req.body.className = className;
  req.body.classId = classId;
  const course = await Course.create(req.body);
  res.status(StatusCodes.CREATED).json({ course });
};
const GetSingleCourse = async (req, res) => {
  //grab userId and courseId from req
  const {
    user: { userId },
    params: { id: courseId },
  } = req;
  const course = await Course.findOne({ _id: courseId, createdBy: userId });
  if (!course) {
    throw new NotFoundError(`No Course with ${courseId}`);
  }
  res.status(StatusCodes.OK).json({ course });
  //   res.send("GetSingle courses");
};

const UpdateCourse = async (req, res) => {
  const {
    body: { title, description, content, code },
    user: { userId },
    params: { id: courseId },
  } = req;
  if (title === "" || description === "" || content === "" || code === "") {
    throw new BadRequestError(`Fields cannot not be empty`);
  }
  const course = await Course.findOneAndUpdate(
    { _id: courseId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!course) {
    throw new NotFoundError(`No course with id ${courseId}`);
  }
  res.status(StatusCodes.OK).json(course);
  //   res.send("Update courses");
};
const UpdateAllCourse = async (req, res) => {
  const {
    body: { title, description, content, code },
    params: { id: courseId },
  } = req;
  if (title === "" || description === "" || content === "" || code === "") {
    throw new BadRequestError(`Fields cannot not be empty`);
  }
  const course = await Course.findOneAndUpdate({ _id: courseId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    throw new NotFoundError(`No course with id ${courseId}`);
  }
  res.status(StatusCodes.OK).json(course);
  //   res.send("Update courses");
};
const DeleteCourse = async (req, res) => {
  const {
    user: { userId },
    params: { id: courseId },
  } = req;
  const course = await Course.findOneAndRemove({
    _id: courseId,
    createdBy: userId,
  });
  if (!course) {
    throw new NotFoundError(`No course with id ${courseId}`);
  }
  res.status(StatusCodes.OK).json("succesfully removed");
  //   res.send("Delete courses");
};
const DeleteAllCourse = async (req, res) => {
  const {
    params: { id: courseId },
  } = req;
  const course = await Course.findByIdAndRemove({
    _id: courseId,
  });
  if (!course) {
    throw new NotFoundError(`No course with id ${courseId}`);
  }
  res.status(StatusCodes.OK).json("succesfully removed");
  //   res.send("Delete courses");
};

module.exports = {
  GetUserCourses,
  GetAllCourses,
  CreateCourse,
  GetSingleCourse,
  UpdateCourse,
  DeleteCourse,
  UpdateAllCourse,
  DeleteAllCourse,
};
