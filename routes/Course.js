const Express = require("express");
const Router = Express.Router();
const Role_List = require("../config/Roles");
const AuthenticateRoles = require("../middleware/AuthenticateRoles");

const {
  GetUserCourses,
  GetAllCourses,
  AdminGetAllSingleCourses,
  AdminGetAllSingleCourseByClass,
  CreateCourse,
  GetSingleCourse,
  UpdateCourse,
  DeleteCourse,
  UpdateAllCourse,
  AdminDeleteCourse,
  AdminDeleteCourseByClass,
} = require("../controllers/Course");

const {
  CreateQuestion,
  CreateManyQuestion,
  getUserQuestion,
  getAllUserQuestion,
  AdmingetAllUserQuestion,
  UpdateUserQuestion,
  DeleteUserQuestion,
  AdminDeleteUserQuestion,
  AdminDeleteUserQuestionByClass,
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
Router.route("/assessment/create_question/:id/:courseid").post(CreateQuestion);
Router.route("/assessment/create_multiple_question/:id").post(
  CreateManyQuestion
);
Router.route("/assessment/questions/:id").get(getUserQuestion);
Router.route("/assessment/all-questions/:id").get(getAllUserQuestion);
Router.route("/assessment/admin/all-questions/:id").get(
  AdmingetAllUserQuestion
);
Router.route("/assessment/questions/update/:id/:moduleId").put(
  UpdateUserQuestion
);
Router.route("/assessment/questions/delete/:id/:moduleId").delete(
  DeleteUserQuestion
);
Router.route("/assessment/admin/questions/delete/:id/:moduleId").delete(
  AdminDeleteUserQuestionByClass
);
Router.route("/assessment/admin/delete-question/:id/:moduleId").delete(
  AdminDeleteUserQuestion
);
//end of assessment route

//view all modules by admin
Router.route("/view-all-module").get(GetAllCourses);
Router.route("/admin/view-module/:id").get(AdminGetAllSingleCourses);
Router.route("/admin/course/view-module/:id").get(
  AdminGetAllSingleCourseByClass
);
Router.route("/view-module/:id")
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
Router.route("/admin-delete-module/:id").delete(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769, Role_List.T5798),
  AdminDeleteCourse
);
Router.route("/admin-delete-module/:id/:courseid").delete(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769, Role_List.T5798),
  AdminDeleteCourseByClass
);
Router.route("/admin-update-module/:id").patch(
  AuthenticateRoles(Role_List.C1856, Role_List.A3769),
  UpdateAllCourse
);

module.exports = Router;
