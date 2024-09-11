import * as yup from "yup";

export const createPostValidation = yup.object({
  title: yup
    .string()
    .required("Title is Requied")
    .matches(/^[A-Za-z\s]+$/, "Enter valid  name")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title exceeds the limit 100"),
  image: yup.string().required("Image is Required"),
  desc: yup
    .string()
    .required("Description is Requied")
    .min(20, "Description must be at least 20 characters")
    .max(600, "Description exceeds the limit 600"),
});

export const commentValidation = yup.object({
  comment: yup
    .string()
    .required("Comment is Requied")
    .min(3, "Comment must be at least 3 characters")
    .max(200, "Comment exceeds the limit 200"),
});
export const loginValidation = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is Requied"),

  password: yup
    .string()
    .required("Password is Requied")
    .min(6, "Password must be at least 6 digits"),
});
export const registerValidation = yup.object({
  userName: yup
    .string()
    .required("User name is Requied")
    .matches(/^[A-Za-z\s]+$/, "Enter valid user name")
    .min(3, "user name must be at least 3 characters")
    .max(35, "user name exceeds the limit 35"),
  password: yup
    .string()
    .required("Password is Requied")
    .min(6, "Password must be at least 6 digits"),
  email: yup.string().email("Enter a valid email").required("Email is Requied"),
});
