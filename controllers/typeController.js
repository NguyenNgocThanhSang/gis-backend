import Type from "../models/TypeModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllTypes = async (req, res) => {
  const types = await Type.find({});
  res.status(StatusCodes.OK).json({ types });
};

export const createType = async (req, res) => {
  const type = await Type.create(req.body);
  res.status(StatusCodes.CREATED).json({ type });
};

export const getType = async (req, res) => {
  const { id } = req.params;
  const type = await Type.findById(id);
  if (!type) {
    throw new NotFoundError(`no type with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ type });
};

export const updateType = async (req, res) => {
  const { id } = req.params;
  const updatedType = await Type.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedType) {
    throw new NotFoundError(`no type with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "type modified", type: updatedType });
};

export const deleteType = async (req, res) => {
  const { id } = req.params;
  const removedType = await Type.findByIdAndDelete(id);
  if (!removedType) {
    throw new NotFoundError(`no type with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: "type deleted", type: removedType });
};
