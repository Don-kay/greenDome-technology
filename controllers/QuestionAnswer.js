const Question = require("../models/question");
const Class = require("../models/class");
const User = require("../models/User");
const Courses = require("../models/Course");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// const createAnswers = async (req, res) => {
//   const answer = await AnswerOption.create(req.body);
//   res.status(StatusCodes.CREATED).json({ answer });
// };
const CreateQuestion = async (req, res) => {
  const {
    user: { userId },
    params: { id: courseId, courseid: classId },
  } = req;
  const course = await Class.findOne({ _id: classId, createdBy: userId });
  if (!course) {
    res
      .status(StatusCodes.FORBIDDEN)
      .send(
        ` unauthorized!!!, ${course.name} with ${classId} is not created by you `
      );
  }
  const module = await Courses.findOne({ _id: courseId, createdBy: userId });
  if (!module) {
    res
      .status(StatusCodes.FORBIDDEN)
      .send(
        ` unauthorized!!!, ${module.title} with ${courseId} is not created by you `
      );
  }
  req.body.moduleId = module._id;
  req.body.moduleName = module.title;
  req.body.className = course.name;
  req.body.classId = course._id;

  const question = await Question.create(req.body);
  res.status(StatusCodes.CREATED).json({ question });
};
const CreateManyQuestion = async (req, res) => {
  const {
    user: { userId },
    params: { id: courseId },
  } = req;
  const course = await Courses.findOne({ _id: courseId, createdBy: userId });
  if (!course) {
    throw new NotFoundError(`${courseId} is not a course created by you `);
  }
  req.body.LinkedTo = course._id;
  const question = await Question.insertMany({ ...req.body });
  res.status(StatusCodes.CREATED).json({ question });
};
const AdmingetAllUserQuestion = async (req, res) => {
  const {
    user: { userId },
    params: { id: courseId },
  } = req;
  const course = await Class.findOne({ _id: courseId });
  if (!course) {
    res.status(StatusCodes.NOT_FOUND).send({
      msg: `${courseId} is not a course created by you `,
    });
  }
  const question = await Question.find({ classId: courseId });
  if (!question) {
    res.status(StatusCodes.NOT_FOUND).send({
      msg: `there is no questions linked to id: ${courseId} `,
    });
  }
  res.status(StatusCodes.OK).json({ question, count: question.length });
};
const getAllUserQuestion = async (req, res) => {
  const {
    user: { userId },
    params: { id: moduleId },
  } = req;
  const course = await Courses.findOne({ _id: moduleId });
  if (!course) {
    res.status(StatusCodes.NOT_FOUND).send({
      msg: `${moduleId} is not a course created by you `,
    });
  }
  const question = await Question.find({ moduleId: moduleId });
  if (!question) {
    res.status(StatusCodes.NOT_FOUND).send({
      msg: `there is no questions linked to id: ${moduleId} `,
    });
  }
  res.status(StatusCodes.OK).json({ question, count: question.length });
};
const getUserQuestion = async (req, res) => {
  const {
    user: { userId },
    params: { id: moduleId },
  } = req;
  const course = await Courses.findOne({ _id: moduleId, createdBy: userId });
  if (!course) {
    res.status(StatusCodes.NOT_FOUND).send({
      msg: `${moduleId} is not a course created by you `,
    });
  }
  const question = await Question.find({ moduleId: moduleId });
  if (!question) {
    res.status(StatusCodes.NOT_FOUND).send({
      msg: `is no questions linked to id: ${moduleId} `,
    });
  }
  res.status(StatusCodes.OK).json({ question, count: question.length });
};
const UpdateUserQuestion = async (req, res) => {
  const {
    body: { question, option1, option2, option3, option4, answer },
    user: { userId },
    params: { id: questionId, moduleId: courseId },
  } = req;
  const course = await Courses.findOne({ _id: courseId, createdBy: userId });
  if (!course) {
    throw new NotFoundError(
      `can't update question because course id: ${courseId} wasn't created by you `
    );
  }

  if (
    question === " " ||
    option1 === " " ||
    option2 === " " ||
    option3 === " " ||
    option4 === " " ||
    answer === " "
  ) {
    throw new BadRequestError(" No field can be empty");
  }
  const questions = await Question.findOneAndUpdate(
    {
      _id: questionId,
      moduleId: courseId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  if (!questions) {
    throw new NotFoundError(`is no questions linked to id: ${courseId} `);
  }
  res.status(StatusCodes.OK).json({ questions });
};
const DeleteUserQuestion = async (req, res) => {
  const {
    user: { userId },
    params: { id: questionId, LinkedTo: moduleId },
  } = req;
  const course = await Courses.findOne({ _id: moduleId, createdBy: userId });
  if (!course) {
    throw new NotFoundError(
      `can't delete question because course id: ${moduleId} wasn't created by you `
    );
  }
  const questions = await Question.findOneAndRemove({
    _id: questionId,
    moduleId: moduleId,
  });
  if (!questions) {
    throw new NotFoundError(`is no questions linked to id: ${moduleId} `);
  }
  res.status(StatusCodes.OK).json({ questions });
};
const AdminDeleteUserQuestion = async (req, res) => {
  const {
    user: { userId },
    params: { id: questionId, moduleId: moduleId },
  } = req;
  // const course = await Courses.findbyId({ _id: moduleId });
  // if (!course) {
  //   res.status(StatusCodes.NOT_FOUND).send({
  //     msg: `can't delete question because course id: ${moduleId} wasn't created by you `,
  //   });
  // }
  const questions = await Question.findOneAndRemove({
    _id: questionId,
    moduleId: moduleId,
  });
  if (!questions) {
    res.status(StatusCodes.NOT_FOUND).send({
      msg: `there is no questions linked to id: ${moduleId} `,
    });
  }
  res.status(StatusCodes.OK).json({ questions });
};

const AdminDeleteUserQuestionByClass = async (req, res) => {
  const {
    user: { userId },
    params: { id: questionId, moduleId: courseId },
  } = req;
  const course = await Class.findOne({ _id: courseId });
  if (!course) {
    res.status(StatusCodes.NOT_FOUND).send({
      msg: `can't delete question because course id: ${courseId} wasn't created by you `,
    });
  }
  const questions = await Question.findOneAndRemove({
    _id: questionId,
    classId: courseId,
  });
  if (!questions) {
    res.status(StatusCodes.NOT_FOUND).send({
      msg: `there is no questions linked to id: ${courseId} `,
    });
  }
  res.status(StatusCodes.OK).json({ questions });
};

module.exports = {
  CreateQuestion,
  CreateManyQuestion,
  getUserQuestion,
  getAllUserQuestion,
  AdmingetAllUserQuestion,
  UpdateUserQuestion,
  DeleteUserQuestion,
  AdminDeleteUserQuestionByClass,
  AdminDeleteUserQuestion,
};
