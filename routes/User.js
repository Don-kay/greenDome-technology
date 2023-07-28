//process the router
const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const Role_List = require("../config/Roles");
const AuthenticateRoles = require("../middleware/AuthenticateRoles");

const {
  register,
  userNameLogin,
  emailLogin,
  GetAllUsers,
  UpdateProfile,
  UpdateAllProfile,
  DeleteAllProfile,
} = require("../controllers/User");

//get is used get the content from server end
// router.get("/register", register);
router.post("/register", register);
router.post("/login/username", userNameLogin);
router.post("/login/email", emailLogin);
router
  .route("/users")
  .get(
    Authentication,
    AuthenticateRoles(Role_List.C1856, Role_List.A3769),
    GetAllUsers
  );
router
  .route("/users/update/:id")
  .patch(Authentication, UpdateProfile)
  .put(
    Authentication,
    AuthenticateRoles(Role_List.C1856, Role_List.A3769),
    UpdateAllProfile
  );
router
  .route("/users/delete/:id")
  .delete(
    Authentication,
    AuthenticateRoles(Role_List.C1856, Role_List.A3769),
    DeleteAllProfile
  );

module.exports = router;
