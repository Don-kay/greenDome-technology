// do not forget to import the dot.env package and configure it when connecting DB
require("dotenv").config();
require("express-async-errors");

// 1. create an App variable and attach express to it
const express = require("express");
const session = require("express-session");

const App = express();
const mongoDBsession = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");

const cors = require("cors");

const connectDB = require("./db/connect");

App.use(bodyParser.json({ limit: "25mb" }));
App.use(
  bodyParser.urlencoded({
    limit: "25mb",
    extended: true,
    parameterLimit: 50000,
  })
);
//  6. import authRoute
const AuthRouter = require("./routes/User");
const CourseRouter = require("./routes/Course");
const ClassRouter = require("./routes/Class");
const CalendarRouter = require("./routes/calendar");
const RatioRouter = require("./routes/profitRatio");

const Role_List = require("./config/Roles");
const AuthenticateRoles = require("./middleware/AuthenticateRoles");

//error handler
const Authentication = require("./middleware/Authentication");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// 8. import an Unauthenticated middleware to verify the user token from login and pass it to course route
//create and import error handler middleware

const store = new mongoDBsession({
  uri: process.env.MONGO_URI,
  collection: "mySessions",
});

// setup app.use() middleware

App.use(
  session({
    secret: "##creativE001",
    cookie: { maxAge: 30000 },
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
App.use(express.json());

// if (process.env.NODE_ENV === "production") {
App.use(
  cors({ origin: "https://greendometech.netlify.app", credentials: true })
);

App.use("/greendome.onrender.com/auth", AuthRouter);
App.use("/greendome.onrender.com/module", Authentication, CourseRouter);
App.use("/greendome.onrender.com/course", Authentication, ClassRouter);
App.use(
  "/greendome.onrender.com/finance",
  Authentication,
  AuthenticateRoles(Role_List.C1856),
  RatioRouter
);

App.use("/greendome.onrender.com/calendar", Authentication, CalendarRouter);
// } else {
//   App.use(cors({ origin: "http://localhost:3000", credentials: true }));

//   App.use("/greendometech/ng/auth", AuthRouter);
//   App.use("/greendometech/ng/module", Authentication, CourseRouter);
//   App.use("/greendometech/ng/course", Authentication, ClassRouter);
//   App.use(
//     "/greendometech/ng/finance",
//     Authentication,
//     AuthenticateRoles(Role_List.C1856),
//     RatioRouter
//   );

//   App.use("/greendometech/ng/calendar", Authentication, CalendarRouter);
// }

// App.use(
//   cors({
//     origin:
//       process.env.NODE_ENV !== "production"
//         ? "http://localhost:3000"
//         : "http://greendometech.com",
//     credentials: true,
//   })
// );
//App.useCors;
// 4. create Route - to use app.use, you must import an app.use middleware and then attach the route variable

// 3. content to display information
// App.get("/greendometech/ng/auth", (req, res) => {
//   res.send("GreenDome Communication Technologies");
// });

// 7. create a errohandlermiddlare, the error handler middleware must come below the routes
App.use(notFoundMiddleware);
App.use(errorHandlerMiddleware);
//connect to mongodb
const port = process.env.PORT || 8000;
// const hostname =
//   process.env.NODE_ENV !== "production" ? 8000 : "greendometech.com";

// 2. function to run http server
const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    App.listen(port, console.log(`server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
//after setting up the crud operation,
//setup the duplicate  error
//setup validation error
//setup the cast  error, this error is always seen in the id params routes/controlleers
//treat cast error in update controlller
