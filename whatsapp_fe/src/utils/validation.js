import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z_ ]*$/, "Name can only contain letters and spaces")
    .min(2, "Name must be at least 2 characters")
    .max(16, "Name must be less than 16 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  status: Yup.string().max(64, "Status must be less than 64 characters"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const signInSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});
