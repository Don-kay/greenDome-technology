//process the router
const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const Role_List = require("../config/Roles");
const AuthenticateRoles = require("../middleware/AuthenticateRoles");

const {
  register,
  logout,
  userNameLogin,
  emailLogin,
  GetAllUsers,
  GetSingleUsers,
  UpdateProfile,
  UpdateAllProfile,
  DeleteAllProfile,
} = require("../controllers/User");

//get is used get the content from server end
// router.get("/register", register);
router.post("/register", register);
router.post("/logout/:id", logout);
router.post("/login/username", userNameLogin);
router.post("/login/email", emailLogin);
router.route("/users").get(
  Authentication,
  // AuthenticateRoles(Role_List.C1856, Role_List.A3769),
  GetAllUsers
);
router
  .route("/users/:id")
  .get(
    Authentication,
    AuthenticateRoles(Role_List.C1856, Role_List.A3769, Role_List.S9786),
    GetSingleUsers
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
