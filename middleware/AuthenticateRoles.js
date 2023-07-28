const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");

const AuthenticateRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const roles = req.user.roles;
    // if (!roles) {
    //   throw new UnauthenticatedError(
    //     "You are not authorized to visit this page"
    //   );
    // }
    const rolesArray = [...allowedRoles];
    // console.log(rolesArray);
    const result = roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    if (!result) {
      throw new UnauthenticatedError(
        "you are not permitted to access this route"
      );
    }

    next();
  };
};

module.exports = AuthenticateRoles;
