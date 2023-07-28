class CustomAPIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
const createCustomError = (msg, statusCode) => {
  return new CustomAPIError(msg, statusCode);
};

//this class component holds any error message and display them

module.exports = CustomAPIError;
