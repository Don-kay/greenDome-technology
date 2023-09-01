const express = require("express");
const Router = express.Router();
const Role_List = require("../config/Roles");
const AuthenticateRoles = require("../middleware/AuthenticateRoles");

const {
  CreateRatio,
  GetRatio,
  UpdateRatio,
  DeleteRatio,
} = require("../controllers/profitRatio");
//assign Student
Router.route("/company/create-percentage-ratio").post(CreateRatio);
Router.route("/company/view-percentage").get(
  AuthenticateRoles(Role_List.C1856),
  GetRatio
);
Router.route("/company/update-percentage/:id").put(UpdateRatio);
Router.route("/company/delete-percentage/:id").delete(DeleteRatio);

module.exports = Router;
