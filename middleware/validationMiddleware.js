import { body, param, validationResult } from "express-validator";
import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";
import { TOURIST_ATTRACTION_STATUS } from "../utils/constants.js";
import mongoose from "mongoose";
import User from "../models/UserModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith("not authorized")) {
          throw new UnauthorizedError("not authorized to access this route");
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateTouristAttractionInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("address").notEmpty().withMessage("address is required"),
  body("coordinates.latitude").notEmpty().withMessage("latitude is required"),
  body("coordinates.longitude").notEmpty().withMessage("longitude is required"),
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

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("location is required"),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateAdmin = withValidationErrors([
  body().custom(async (value, { req }) => {
    const isAdmin = req.user.role === "admin";
    if (!isAdmin) {
      throw new UnauthorizedError("not authorized to access this route");
    }
  }),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError("email already exists");
      }
    }),
  body("location").notEmpty().withMessage("location is required"),
]);
