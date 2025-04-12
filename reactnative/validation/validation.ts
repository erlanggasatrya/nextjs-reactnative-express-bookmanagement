import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(3, "Email must be between 3 and 50 characters")
    .max(50, "Email must be between 3 and 50 characters")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must include a lowercase letter")
    .matches(/[A-Z]/, "Password must include an uppercase letter")
    .matches(/[0-9]/, "Password must include a number")
    .matches(/[^a-zA-Z0-9]/, "Password must include a special character"),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(3, "Email must be between 3 and 50 characters")
    .max(50, "Email must be between 3 and 50 characters")
    .required("Email is required"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  phoneNumber: Yup.string()
    .matches(
      /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
      "Invalid Indonesian phone number format"
    )
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must include a lowercase letter")
    .matches(/[A-Z]/, "Password must include an uppercase letter")
    .matches(/[0-9]/, "Password must include a number")
    .matches(/[^a-zA-Z0-9]/, "Password must include a special character"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const editProfileSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
  phoneNumber: Yup.string().matches(
    /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
    "Invalid Indonesian phone number format"
  ),
  profile: Yup.mixed()
    .test("fileSize", "File size is too large (max 5MB)", (value) => {
      if (!value) {
        return true;
      }
      if (typeof value === "string") {
        return true;
      }

      return value.size <= 5 * 1024 * 1024;
    })
    .test("fileType", "Invalid file type (only .png, .jpg, .jpeg)", (value) => {
      if (!value) {
        return true;
      }
      if (typeof value === "string") {
        return true;
      }

      return ["image/png", "image/jpeg", "image/jpg"].includes(value.type);
    }),
});

export const editEmailSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must include a lowercase letter")
    .matches(/[A-Z]/, "Password must include an uppercase letter")
    .matches(/[0-9]/, "Password must include a number")
    .matches(/[^a-zA-Z0-9]/, "Password must include a special character")
    .notOneOf(
      [Yup.ref("currentPassword"), null],
      "New password should not be equal to current password"
    ),
  confirmNewPassword: Yup.string()
    .required("Confirm new password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const verifyOTPSchema = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be a 6-digit number"),
});

export const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must include a lowercase letter")
    .matches(/[A-Z]/, "Password must include an uppercase letter")
    .matches(/[0-9]/, "Password must include a number")
    .matches(/[^a-zA-Z0-9]/, "Password must include a special character"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
