import Category from "../models/CategoryModel.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError } from "../errors/customErrors.js";

export const getAllCategories = async (req, res) => {
  const categories = await Category.find({});
  res.status(StatusCodes.OK).json({ categories });
};

export const createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(StatusCodes.CREATED).json({ category });
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    throw new NotFoundError(`no category with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ category });
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedCategory) {
    throw new NotFoundError(`no category with id ${id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "category modified", category: updatedCategory });
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const removedCategory = await Category.findByIdAndDelete(id);
  if (!removedCategory) {
    throw new NotFoundError(`no category with id ${id}`);
  }
  res
    .status(StatusCodes.OK)
    .json({ msg: "category deleted", category: removedCategory });
};
