import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import TouristAttraction from "../models/TouristAttractionModel.js";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("locationBookmarks");
  if (!user) {
    throw new NotFoundError(`no user with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId }).populate(
    "locationBookmarks"
  );
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const touristAttractions = await TouristAttraction.countDocuments();
  res.status(StatusCodes.OK).json({ users, touristAttractions });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, obj);
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
