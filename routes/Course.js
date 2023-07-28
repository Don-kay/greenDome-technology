const Express = require("express");
const Router = Express.Router();
const Role_List = require("../config/Roles");
const AuthenticateRoles = require("../middleware/AuthenticateRoles");

const {
  GetUserCourses,
  GetAllCourses,
  CreateCourse,
  GetSingleCourse,
  UpdateCourse,
  DeleteCourse,
  UpdateAllCourse,
  DeleteAllCourse,
} = require("../controllers/Course");

const {
  CreateQuestion,
  CreateManyQuestion,
  getUserQuestion,
  getAllUserQuestion,
  UpdateUserQuestion,
  DeleteUserQuestion,
} = require("../controllers/QuestionAnswer");

Router.route("/create-module/:nameid/:id")
  .post(
    AuthenticateRoles(Role_List.C1856, Role_List.A3769, Role_List.T5798),
    CreateCourse
  )
  .get(
    AuthenticateRoles(Role_List.C1856, Role_List.A3769, Role_List.T5798),
    GetUserCourses
  );
//assessment route
Router.route("/assessment/create_question/:id").post(CreateQuestion);
Router.route("/assessment/create_multiple_question/:id").post(
  CreateManyQuestion
);
Router.route("/assessment/questions/:id").get(getUserQuestion);
Router.route("/assessment/all-questions/:id").get(getAllUserQuestion);
Router.route("/assessment/questions/update/:id/:moduleId").put(
  UpdateUserQuestion
);
Router.route("/assessment/questions/delete/:id/:moduleId").delete(
  DeleteUserQuestion
);
//end of assessment route
Router.route("/view-all-module").get(GetAllCourses);
Router.route("/:id")
  .get(
    AuthenticateRoles(Role_List.C1856, Role_List.A3769, Role_List.T5798),
    GetSingleCourse
  )
  .delete(
    AuthenticateRoles(Role_List.C1856, Role_List.A3769, Role_List.T5798),
    DeleteCourse
  )
  .patch(
    AuthenticateRoles(Role_List.C1856, Role_List.A3769, Role_List.T5798),
    UpdateCourse
  );
Router.route("/admin-delete-course/:id").delete(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769, Role_List.T5798),
  DeleteAllCourse
);
Router.route("/admin-update-course/:id").patch(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769, Role_List.T5798),
  UpdateAllCourse
);

module.exports = Router;
