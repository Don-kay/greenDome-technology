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

  // const classes = await Class.findById({ _id: classId });
  // if (!classes) {
  //   throw new UnauthenticatedError(
  //     "you cant assign students, because this course wasn't created by you"
  //   );
  // }

  // let classeser = JSON.stringify(classes.createdBy);
  let user = JSON.stringify(req.user.roles);
  // console.log(user);
  if (user.includes("Admin")) {
    req.body.classesId = classId;
    const assign = await User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!assign) {
      res
        .status(StatusCodes.OK)
        .send({ msg: `unable to assign as student with ${userId} not found` });
    }
    res.status(StatusCodes.OK).json({
      msg: "course successfully assigned",
      user: {
        msg: "succesfully updated",
        id: assign._id,
        firstname: assign.firstname,
        username: assign.username,
        email: assign.email,
        country: assign.country,
        mobilenumber: assign.mobilenumber,
        biography: assign.biography,
        classesId: assign.classesId,
        certificate: assign.certificate,
        roles: assign.roles,
      },
    });
    return;
  }
  throw new BadRequestError("you are not authorized to assign a student");

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

  // const classes = await Class.findById({ _id: classId });
  // if (!classes) {
  //   throw new UnauthenticatedError(
  //     "you cant assign students, because this course wasn't created by you"
  //   );
  // }
  // let classeser = JSON.stringify(classes.createdBy);
  let user = JSON.stringify(req.user.roles);

  if (user.includes("Admin")) {
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
        `unable to unassign as student with ${userId} not found`
      );
    }
    res.status(StatusCodes.OK).json({
      msg: "course successfully unassigned",
      user: {
        msg: "succesfully updated",
        id: unassign._id,
        firstname: unassign.firstname,
        username: unassign.username,
        email: unassign.email,
        country: unassign.country,
        mobilenumber: unassign.mobilenumber,
        biography: unassign.biography,
        classesId: unassign.classesId,
        certificate: unassign.certificate,
        roles: unassign.roles,
      },
    });
    return;
  }
  res
    .status(StatusCodes.OK)
    .send({ msg: "you are not authorized to unassign a student" });
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
const AdminAssignTutor = async (req, res) => {
  const {
    params: { id: userId, classid: classId },
    body: { assigned_tutor },
  } = req;
  const classes = await Class.findById({ _id: classId });
  if (!classes) {
    throw new NotFoundError(`no class with class id: ${classId} found`);
  }
  // const user = await User.findById({ _id: userId });
  // if (!user) {
  //   throw new NotFoundError(`no user with id: ${userId} found`);
  // }
  // const { roles } = user;
  // const isTutor = roles
  //   .map((item) => item.includes("tutor"))
  //   .find((val) => val === true);

  req.body.assigned_tutor = assigned_tutor;
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
};
// const AssignTutor = async (req, res) => {
//   const {
//     params: { id: userId, classid: classId },
//   } = req;
//   const classes = await Class.findById({ _id: classId });
//   if (!classes) {
//     throw new NotFoundError(`no class with class id: ${classId} found`);
//   }
//   const user = await User.findById({ _id: userId });
//   if (!user) {
//     throw new NotFoundError(`no user with id: ${userId} found`);
//   }
//   const { roles } = user;
//   const isTutor = roles
//     .map((item) => item.includes("tutor"))
//     .find((val) => val === true);
//   const classeser = JSON.stringify(classes.createdBy);
//   const tempUser = JSON.stringify(req.user.userId);
//   if (tempUser === classeser) {
//     if (isTutor) {
//       req.body.assignedTutor = userId;
//       const assign = await Class.findByIdAndUpdate(
//         { _id: classId },
//         { $addToSet: req.body },
//         {
//           new: true,
//           runValidators: true,
//         }
//       );
//       if (!assign) {
//         throw new NotFoundError(
//           `unable to assign as class with ${classId} not found`
//         );
//       }
//       res.status(StatusCodes.OK).json({ assign });
//       return;
//     } else {
//       throw new UnauthenticatedError(
//         `Invalid: this user ${userId} is not a tutor`
//       );
//     }
//   } else {
//     throw new BadRequestError(
//       `Invalid: the class with id: ${classId} wasn't created by you`
//     );
//   }
// };
const AdminUnAssignTutor = async (req, res) => {
  const {
    params: { classid: classId },
    body: { assigned_tutor },
  } = req;
  const classes = await Class.findById({ _id: classId });
  if (!classes) {
    throw new NotFoundError(`no class with class id: ${classId} found`);
  }
  req.body.assigned_tutor = assigned_tutor;
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
  // AssignTutor,
  UnAssignTutor,
  AdminAssignTutor,
  AdminUnAssignTutor,
};
