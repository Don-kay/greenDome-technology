const Ratio = require("../models/profitRatio");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const profitRatio = require("../models/profitRatio");

const CreateRatio = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const user = await User.findById({ _id: userId });
  req.body.party_type = user.roles;
  req.body.createdBy = req.user.userId;
  if (user.roles.includes("company")) {
    const profitRatio = await Ratio.create(req.body);
    res.status(StatusCodes.CREATED).json({ profitRatio });
  } else {
    throw new NotFoundError("you are not authorized to set percentage");
  }
};
// return profitRatio;
const GetRatio = async (req, res) => {
  let user = JSON.stringify(req.user.roles);
  if (user.includes("Admin")) {
    const profitRatio = await Ratio.find().sort("createdAt");
    if (!profitRatio) {
      throw new NotFoundError("sorry no percentage has been set");
    }
    res.status(StatusCodes.OK).json({ profitRatio, count: profitRatio.length });
  } else {
    throw new NotFoundError("you are not authorized to access percentage");
  }
};
const UpdateRatio = async (req, res) => {
  const {
    body: { percentage, party_type },
    user: { userId },
    params: { id: ratioId },
  } = req;
  if (percentage === " ") {
    throw new BadRequestError("fields cannot be empty");
  }
  req.body.party_type = party_type;
  const profitRatio = await Ratio.findByIdAndUpdate(
    { _id: ratioId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!profitRatio) {
    throw new NotFoundError(`sorry no percentage with id: ${ratioId}`);
  }
  res.status(StatusCodes.OK).json({ profitRatio });
};
const DeleteRatio = async (req, res) => {
  const {
    params: { id: ratioId },
  } = req;
  const profitRatio = await Ratio.findOneAndRemove({ _id: ratioId });
  if (!profitRatio) {
    throw new NotFoundError(`sorry no class found with id: ${ratioId}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "successsfully removed class", profitRatio });
};

module.exports = {
  CreateRatio,
  GetRatio,
  UpdateRatio,
  DeleteRatio,
};
