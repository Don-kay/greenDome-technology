const express = require("express");
const Router = express.Router();
const Role_List = require("../config/Roles");
const AuthenticateRoles = require("../middleware/AuthenticateRoles");

const {
  CreateClass,
  GetUsersClass,
  GetAllUsersClass,
  GetsingleClass,
  UpdateUsersClass,
  UpdateAllUsersClass,
  DeleteUsersClass,
  DeleteAllUsersClass,
} = require("../controllers/Class");
//assign Student
const {
  assignStudent,
  UnassignStudent,
  assignCourses,
  UnassignCourses,
  AssignTutor,
  UnAssignTutor,
} = require("../controllers/ClassFunction");

Router.route("/create-course").post(CreateClass).get(GetUsersClass);
Router.route("/admin/view-all-course").get(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769),
  GetAllUsersClass
);
Router.route("/myclasses/:id").get(GetsingleClass);
Router.route("/myclasses/update/:id").patch(UpdateUsersClass);
Router.route("/myclasses/delete/:id").delete(DeleteUsersClass);
Router.route("/myclasses/admin/update/:id").patch(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769),
  UpdateAllUsersClass
);
Router.route("/myclasses/admin/delete/:id").delete(
  AuthenticateRoles(Role_List.C1856),
  DeleteAllUsersClass
);
Router.route("/myclasses/assign-students/:id/classes/:classid").put(
  assignStudent
);
Router.route("/myclasses/unassign-students/:id/classes/:classid").put(
  UnassignStudent
);
Router.route("/myclasses/assign-course/:id/classes/:classid").put(
  assignCourses
);
Router.route("/myclasses/unassign-course/:id/classes/:classid").put(
  UnassignCourses
);
Router.route("/myclasses/assign-tutor/:id/classes/:classid").put(AssignTutor);
Router.route("/myclasses/unassign-tutor/:id/classes/:classid").put(
  UnAssignTutor
);

module.exports = Router;
