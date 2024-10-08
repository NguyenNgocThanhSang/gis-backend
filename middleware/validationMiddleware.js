import { body, param, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import { TOURIST_ATTRACTION_STATUS } from "../utils/constants.js";
import mongoose from "mongoose";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateTouristAttractionInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("location").notEmpty().withMessage("location is required"),
  body("status")
    .isIn(Object.values(TOURIST_ATTRACTION_STATUS))
    .withMessage("invalid status value"),
  body("type").notEmpty().withMessage("type is required"),
  body("category").notEmpty().withMessage("category is required"),
  body("imageUrl").notEmpty().withMessage("image url is required"),
]);

export const validateTypeInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
]);

export const validateCategoryInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
]);

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError("invalid MongoDB id");
  }),
]);
