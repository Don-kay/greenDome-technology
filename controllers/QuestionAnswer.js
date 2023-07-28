const Question = require("../models/question");
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
    params: { id: courseId, nameid: courseName },
  } = req;
  const course = await Courses.findOne({ _id: courseId, createdBy: userId });
  if (!course) {
    throw new NotFoundError(`${courseId} is not a course created by you `);
  }
  req.body.moduleId = course._id;
  req.body.moduleName = course.title;
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
const getAllUserQuestion = async (req, res) => {
  const {
    user: { userId },
    params: { id: courseId },
  } = req;
  const course = await Courses.findOne({ _id: courseId });
  if (!course) {
    throw new NotFoundError(`${courseId} is not a course created by you `);
  }
  const question = await Question.find({ moduleId: courseId });
  if (!question) {
    throw new NotFoundError(`is no questions linked to id: ${courseId} `);
  }
  res.status(StatusCodes.OK).json({ question, count: question.length });
};
const getUserQuestion = async (req, res) => {
  const {
    user: { userId },
    params: { id: courseId },
  } = req;
  const course = await Courses.findOne({ _id: courseId, createdBy: userId });
  if (!course) {
    throw new NotFoundError(`${courseId} is not a course created by you `);
  }
  const question = await Question.find({ LinkedTo: courseId });
  if (!question) {
    throw new NotFoundError(`is no questions linked to id: ${courseId} `);
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
    params: { id: questionId, LinkedTo: courseId },
  } = req;
  const course = await Courses.findOne({ _id: courseId, createdBy: userId });
  if (!course) {
    throw new NotFoundError(
      `can't delete question because course id: ${courseId} wasn't created by you `
    );
  }
  const questions = await Question.findOneAndRemove({
    _id: questionId,
    LinkedTo: courseId,
  });
  if (!questions) {
    throw new NotFoundError(`is no questions linked to id: ${courseId} `);
  }
  res.status(StatusCodes.OK).json({ questions });
};

module.exports = {
  CreateQuestion,
  CreateManyQuestion,
  getUserQuestion,
  getAllUserQuestion,
  UpdateUserQuestion,
  DeleteUserQuestion,
};
