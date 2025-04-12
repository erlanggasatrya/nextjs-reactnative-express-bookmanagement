import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ERoleUser } from "@prisma/client";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }
  next();
};

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ min: 3, max: 50 })
    .withMessage("Email must be between 3 and 50 characters")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"), 
  validate,
];

export const registerValidation = [
  body("email")
    .isEmail()
    .withMessage("Invalid email format")
    .isLength({ min: 3, max: 50 })
    .withMessage("Email must be between 3 and 50 characters")
    .normalizeEmail(),
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("phone_number")
    .matches(/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/) 
    .withMessage("Invalid Indonesian phone number format"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^a-zA-Z0-9]/) 
    .withMessage("Password must contain at least one special character"),
  body("role")
    .optional()
    .isIn(Object.values(ERoleUser))
    .withMessage("Invalid role"),
  validate,
];

export const editUserValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),
  body("phone_number")
    .optional()
    .matches(/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/) 
    .withMessage("Invalid Indonesian phone number format"),
  validate,
];

export const changePasswordValidation = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^a-zA-Z0-9]/) 
    .withMessage("Password must contain at least one special character"),
  body("confirmNewPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
  validate,
];

export const userIdParamValidation = [
  param("userId").isInt({ min: 1 }).withMessage("Invalid user ID"),
  validate,
];
