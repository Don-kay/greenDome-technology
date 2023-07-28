const User = require("../models/User");
const Class = require("../models/class");
const Course = require("../models/Course");
const { StatusCodes } = require("http-status-codes");
const {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} = require("../errors");

const assignStudent = async (req, res) => {
  const {
    params: { id: userId, classid: classId },
  } = req;

  const classes = await Class.findById({ _id: classId });
  if (!classes) {
    throw new UnauthenticatedError(
      "you cant assign students, because this course wasn't created by you"
    );
  }

  let classeser = JSON.stringify(classes.createdBy);
  let user = JSON.stringify(req.user.userId);
  if (user === classeser) {
    req.body.classesId = classId;
    const assign = await User.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!assign) {
      throw new NotFoundError(
        `unable to assign as student with ${userId} not found`
      );
    }
    res.status(StatusCodes.OK).json({ assign });
    return;
  }
  throw new BadRequestError("class not created by you");

  //   let {
  //     body: { classesId },
  //   } = req;
  //   if (classesId === " ") {
  //     throw new BadRequestError("field cannot be empty");
  //   }
};
const UnassignStudent = async (req, res) => {
  const {
    params: { id: userId, classid: classId },
  } = req;

  const classes = await Class.findById({ _id: classId });
  if (!classes) {
    throw new UnauthenticatedError(
      "you cant assign students, because this course wasn't created by you"
    );
  }
  let classeser = JSON.stringify(classes.createdBy);
  let user = JSON.stringify(req.user.userId);

  if (user === classeser) {
    req.body.classesId = classId;
    const unassign = await User.findByIdAndUpdate(
      { _id: userId },
      { $pull: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!unassign) {
      throw new NotFoundError(
        `unable to assign as student with ${userId} not found`
      );
    }
    res.status(StatusCodes.OK).json({ unassign });
    return;
  }
  throw new BadRequestError("class not created by you");
};
const assignCourses = async (req, res) => {
  const {
    user: { userId },
    params: { id: courseId, classid: classId },
  } = req;
  const classes = await Class.findOne({ _id: classId, createdBy: userId });
  if (!classes) {
    throw new NotFoundError(
      `sorry the class with id: ${classId} wasn't created by you`
    );
  }
  req.body.classId = classId;
  const course = await Course.findOneAndUpdate(
    { _id: courseId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!course) {
    throw new NotFoundError(
      `sorry the course with id: ${courseId} wasn't created by you`
    );
  }
  res.status(StatusCodes.OK).json({ course });
};
const UnassignCourses = async (req, res) => {
  const {
    user: { userId },
    params: { id: courseId, classid: classId },
  } = req;
  const classes = await Class.findOne({ _id: classId, createdBy: userId });
  if (!classes) {
    throw new NotFoundError(
      `sorry the class with id: ${classId} wasn't created by you`
    );
  }
  req.body.classId = null;
  const course = await Course.findOneAndUpdate(
    { _id: courseId, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!course) {
    throw new NotFoundError(
      `sorry the course with id: ${courseId} wasn't created by you`
    );
  }
  res.status(StatusCodes.OK).json({ course });
};
const AssignTutor = async (req, res) => {
  const {
    params: { id: userId, classid: classId },
  } = req;
  const classes = await Class.findById({ _id: classId });
  if (!classes) {
    throw new NotFoundError(`no class with class id: ${classId} found`);
  }
  const user = await User.findById({ _id: userId });
  if (!user) {
    throw new NotFoundError(`no user with id: ${userId} found`);
  }
  const { roles } = user;
  const isTutor = roles
    .map((item) => item.includes("tutor"))
    .find((val) => val === true);
  const classeser = JSON.stringify(classes.createdBy);
  const tempUser = JSON.stringify(req.user.userId);
  if (tempUser === classeser) {
    if (isTutor) {
      req.body.assignedTutor = userId;
      const assign = await Class.findByIdAndUpdate(
        { _id: classId },
        { $addToSet: req.body },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!assign) {
        throw new NotFoundError(
          `unable to assign as class with ${classId} not found`
        );
      }
      res.status(StatusCodes.OK).json({ assign });
      return;
    } else {
      throw new UnauthenticatedError(
        `Invalid: this user ${userId} is not a tutor`
      );
    }
  } else {
    throw new BadRequestError(
      `Invalid: the class with id: ${classId} wasn't created by you`
    );
  }
};
const UnAssignTutor = async (req, res) => {
  const {
    params: { id: userId, classid: classId },
  } = req;
  const classes = await Class.findById({ _id: classId });
  if (!classes) {
    throw new NotFoundError(`no class with class id: ${classId} found`);
  }
  const classeser = JSON.stringify(classes.createdBy);
  const tempUser = JSON.stringify(req.user.userId);
  if (tempUser === classeser) {
    req.body.assignedTutor = userId;
    const assign = await Class.findByIdAndUpdate(
      { _id: classId },
      { $pull: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!assign) {
      throw new NotFoundError(
        `unable to assign as class with ${classId} not found`
      );
    }
    res.status(StatusCodes.OK).json({ assign });
    return;
  } else {
    throw new BadRequestError(
      `Invalid: the class with id: ${classId} wasn't created by you`
    );
  }
};

module.exports = {
  assignStudent,
  UnassignStudent,
  assignCourses,
  UnassignCourses,
  AssignTutor,
  UnAssignTutor,
};
