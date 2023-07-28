const { UnauthenticatedError } = require("../errors");

const sessionAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    throw new UnauthenticatedError("not Authorized, Register or login");
  }
};
