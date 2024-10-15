import TouristAttraction from "../models/TouristAttractionModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllTouristAttractions = async (req, res) => {
  const touristAttractions = await TouristAttraction.find({})
    .populate("type")
    .populate("category");
  res.status(StatusCodes.OK).json({ touristAttractions });
};

export const createTouristAttraction = async (req, res) => {
  const touristAttraction = await TouristAttraction.create(req.body);
  res.status(StatusCodes.CREATED).json({ touristAttraction });
};

export const getTouristAttraction = async (req, res) => {
  const { id } = req.params;
  const touristAttraction = await TouristAttraction.findById(id)
    .populate("type")
    .populate("category");
  if (!touristAttraction) {
    throw new NotFoundError(`no tourist attraction with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ touristAttraction });
};

export const updateTouristAttraction = async (req, res) => {
  const { id } = req.params;
  const updatedTouristAttraction = await TouristAttraction.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
    }
  );
  if (!updatedTouristAttraction) {
    throw new NotFoundError(`no tourist attraction with id ${id}`);
  }
  res.status(StatusCodes.OK).json({
    msg: "tourist attraction modified",
    touristAttraction: updatedTouristAttraction,
  });
};

export const deleteTouristAttraction = async (req, res) => {
  const { id } = req.params;
  const removedTouristAttraction = await TouristAttraction.findByIdAndDelete(
    id
  );
  if (!removedTouristAttraction) {
    throw new NotFoundError(`no tourist attraction with id ${id}`);
  }
  res.status(StatusCodes.OK).json({
    msg: "tourist attraction deleted",
    touristAttraction: removedTouristAttraction,
  });
};
