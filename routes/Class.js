const express = require("express");
const Router = express.Router();
const Role_List = require("../config/Roles");
const AuthenticateRoles = require("../middleware/AuthenticateRoles");

const {
  CreateClass,
  UpdateProfit,
  GetUsersClass,
  AdminGetAllUsersClass,
  GetsingleClass,
  AdminGetAllsingleClass,
  UpdateUsersClass,
  AdminUpdateAllUsersClass,
  DeleteUsersClass,
  AdminDeleteAllUsersClass,
} = require("../controllers/Class");
//assign Student
const {
  assignStudent,
  UnassignStudent,
  assignCourses,
  UnassignCourses,
  AdminAssignTutor,
  AdminUnAssignTutor,
  AssignTutor,
  UnAssignTutor,
} = require("../controllers/ClassFunction");

Router.route("/create-course").post(CreateClass).get(GetUsersClass);
// get all courses by admin
Router.route("/admin/view-all-course").get(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769),
  AdminGetAllUsersClass
);
Router.route("/myclasses/:id").get(GetsingleClass);
Router.route("/admin/:id").get(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769),
  AdminGetAllsingleClass
);
Router.route("/update/:id").patch(UpdateUsersClass);
Router.route("/delete/:id").delete(DeleteUsersClass);
Router.route("/admin/update/:id").patch(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769),
  AdminUpdateAllUsersClass
);
Router.route("/admin/update-profit/:id").put(UpdateProfit);
Router.route("/admin/delete/:id").delete(
  AuthenticateRoles(Role_List.C1856),
  AdminDeleteAllUsersClass
);
Router.route("/myclasses/assign-students/:id/classes/:classid").put(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769),
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
// Router.route("/myclasses/assign-tutor/:id/classes/:classid").put(AssignTutor);
Router.route("/admin-assign-tutor/:classid").put(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769),
  AdminAssignTutor
);
Router.route("/admin-unassign-tutor/:classid").put(AdminUnAssignTutor);
// Router.route("/myclasses/unassign-tutor/:id/classes/:classid").put(
//   UnAssignTutor
// );

module.exports = Router;
