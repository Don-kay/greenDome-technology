const CustomAPIError = require("../errors/customApi");
const { StatusCodes } = require("http-status-codes");
const { object } = require("joi");

const errorHandlerMiddleware = (err, req, res, next) => {
  //create a boolean
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "something went wrong, please try again ",
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  ////setup the cast  error
  if (err.name === "validationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    //name and errors are coming from the cast error content
    customError.statusCode = 400;
  }
  //setup the duplicate  error
  //grab the code value from the error to check if error exist
  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }
  //cast Error
  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = 404;
  }
  //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
