const Course = require("../models/Course");
const User = require("../models/User");
const customError = require("../middleware/error-handler");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
// we can display the req.body to test controllers
//start wwith create course

const GetUserCourses = async (req, res) => {
  const modules = await Course.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  if (!modules) {
    throw new NotFoundError("you are yet to create a Course");
  }
  res.status(StatusCodes.OK).json({ modules, count: modules.length });
  //   res.send("get all courses");
};
const GetAllCourses = async (req, res) => {
  const modules = await Course.find().sort("createdAt");
  if (!modules) {
    throw new NotFoundError("No course has been registered yet");
  }
  res.status(StatusCodes.OK).json({ modules, count: modules.length });
  // res.send("view all courses");
};
const AdminGetAllSingleCourses = async (req, res) => {
  const {
    user: { userId },
    params: { id: moduleId },
  } = req;
  let user = JSON.stringify(req.user.roles);

  if (user.includes("company") || user.includes("Admin")) {
    const modules = await Course.findOne({ _id: moduleId });
    if (!modules) {
      throw new NotFoundError("No course has been registered yet");
    }
    res.status(StatusCodes.OK).json({ modules, count: modules.length });
  } else {
    throw new BadRequestError("you are not authorized");
  }
  // res.send("view all courses");
};
const AdminGetAllSingleCourseByClass = async (req, res) => {
  const {
    user: { userId },
    params: { id: moduleId },
  } = req;
  let user = JSON.stringify(req.user.roles);

  if (user.includes("company") || user.includes("Admin")) {
    const modules = await Course.find({ classId: moduleId });
    if (!modules) {
      throw new NotFoundError("No course has been registered yet");
    }
    res.status(StatusCodes.OK).json({ modules, count: modules.length });
  } else {
    throw new BadRequestError("you are not authorized");
  }
  // res.send("view all courses");
};
const CreateCourse = async (req, res) => {
  const {
    user: { userId },
    params: { id: classId, nameid: className },
  } = req;
  const user = await User.findById({ _id: userId });
  req.body.party_type = user.roles;
  req.body.createdBy = req.user.userId; // we pass the user id coming from the authhead into the createBy in the mongoose schema
  req.body.className = className;
  req.body.classId = classId;
  // console.log(classId, className);
  const modules = await Course.create(req.body);
  if (!modules) {
    res.status(StatusCodes.NOT_FOUND).send("no course found");
  }
  res.status(StatusCodes.CREATED).json({ modules });
  // return res.status(customError.statusCode).send({ msg: customError.msg });
};
//restricted to individual user
const GetSingleCourse = async (req, res) => {
  //grab userId and courseId from req
  const {
    user: { userId },
    params: { id: courseId },
  } = req;
  const modules = await Course.findOne({ _id: courseId, createdBy: userId });
  if (!modules) {
    throw new NotFoundError(`No Course with ${courseId}`);
  }
  res.status(StatusCodes.OK).json({ modules });
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
  const modules = await Course.findOneAndUpdate(
    { _id: courseId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!modules) {
    throw new NotFoundError(`No course with id ${courseId}`);
  }
  res.status(StatusCodes.OK).json(modules);
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
  const modules = await Course.findOneAndUpdate({ _id: courseId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!modules) {
    throw new NotFoundError(`No course with id ${courseId}`);
  }
  res.status(StatusCodes.OK).json(modules);
  //   res.send("Update courses");
};
const DeleteCourse = async (req, res) => {
  const {
    user: { userId },
    params: { id: courseId },
  } = req;
  const modules = await Course.findOneAndRemove({
    _id: courseId,
    createdBy: userId,
  });
  if (!modules) {
    throw new NotFoundError(`No course with id ${courseId}`);
  }
  res.status(StatusCodes.OK).send({ msg: "succesfully removed" });
  //   res.send("Delete courses");
};
const AdminDeleteCourse = async (req, res) => {
  const {
    params: { id: moduleId },
  } = req;
  const modules = await Course.findByIdAndRemove({
    _id: moduleId,
  });
  if (!modules) {
    throw new NotFoundError(`No course with id ${moduleId}`);
  }
  res.status(StatusCodes.OK).send({ msg: "succesfully removed" });
  //   res.send("Delete courses");
};
const AdminDeleteCourseByClass = async (req, res) => {
  const {
    params: { id: moduleid, courseid: courseId },
  } = req;
  const modules = await Course.findByIdAndRemove({
    _id: moduleid,
    classId: courseId,
  });
  if (!modules) {
    throw new NotFoundError(`No course with id ${courseId}`);
  }
  res.status(StatusCodes.OK).send({ msg: "succesfully removed" });
  //   res.send("Delete courses");
};

module.exports = {
  GetUserCourses,
  GetAllCourses,
  AdminGetAllSingleCourses,
  AdminGetAllSingleCourseByClass,
  CreateCourse,
  GetSingleCourse,
  UpdateCourse,
  DeleteCourse,
  UpdateAllCourse,
  AdminDeleteCourse,
  AdminDeleteCourseByClass,
};
