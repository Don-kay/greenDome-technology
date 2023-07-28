const CustomAPIError = require("./customApi");
const BadRequestError = require("./BadRequest");
const NotFoundError = require("./Not-found");
const UnauthenticatedError = require("./UnauthenticatedError");

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
};
