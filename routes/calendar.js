const Router = require("express").Router();
const {
  CreateEvent,
  GetEvent,
  UpdateEvent,
  deleteEvent,
} = require("../controllers/calendar");

Router.post("/create-event", CreateEvent);
Router.get("/get-events", GetEvent);
Router.patch("/update-events/:id", UpdateEvent);
Router.delete("/delete-events/:id", deleteEvent);

module.exports = Router;
