const calendar = require("../models/calender");
const { StatusCodes } = require("http-status-codes");
const moment = require("moment");
const { NotFoundError } = require("../errors");

const CreateEvent = async (req, res) => {
  const event = await calendar.create(req.body);
  res.status(StatusCodes.CREATED).json({ event });
};
const GetEvent = async (req, res) => {
  const event = await calendar.find();
  if (!event) {
    throw new NotFoundError("no event exist yet");
  }
  res.status(StatusCodes.OK).json({ event, count: event.length });
};
const UpdateEvent = async (req, res) => {
  const {
    body: { title, start, end },
    params: { id: eventId },
  } = req;
  if (title === " " || start === " " || end === " ") {
    throw new BadRequestError("  Fields cannot be empty ");
  }
  const event = await calendar.findOneAndUpdate({ _id: eventId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    throw new NotFoundError(` ${title} doesnt exist yet`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "schedule successfully updated", event: event });
};
const deleteEvent = async (req, res) => {
  const {
    params: { id: eventId },
  } = req;
  if (!eventId) {
    throw new NotFoundError(` no event with ${eventId}`);
  }
  const event = await calendar.findOneAndRemove({ _id: eventId });
  if (!event) {
    throw new NotFoundError(` Event doesnt exist yet`);
  }
  const events = await calendar.find();
  res.status(StatusCodes.OK).json({ event: event, events: events });
};

module.exports = { CreateEvent, GetEvent, UpdateEvent, deleteEvent };

// {
//     start: { $gte: moment(req.query.start).toDate() },
//     end: { $lte: moment(req.query.end).toDate() },
//   }
