import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerValidation } from "../validation/validation";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { axiosInstance } from "../axios/axios";
import { Toaster } from "../toast/toast";
import Loader from "../components/Loader";
const SignUp = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const loginFormik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidation,
    onSubmit: () => {
      handelSingUp();
    },
  });

  const handelSingUp = () => {
    setIsLoader(true);
    axiosInstance
      .post(`/auth/register`, {
        username: loginFormik.values.userName,
        password: loginFormik.values.password,
        email: loginFormik.values.email,
      })
      .then((res) => {
        loginFormik.resetForm({});
        Toaster("success", `${res.data.message}`);
        setIsLoader(false);
      })
      .catch((err) => {
        Toaster("error", `${err.response.data.message}`);
        setIsLoader(false);
      });
  };
  return (
    <div>
      <nav className="fixed left-0 right-0 bg-[#e9e9e9]">
        <div className="navbar">
          <div
            className="logo"
            onClick={() => {
              navigate("/");
            }}
          >
            D News.
          </div>
          <div className="flex items-center gap-4"></div>
        </div>
      </nav>
      <div className="flex items-center justify-center h-screen">
        <div className="flex items-center justify-center h-screen">
          <form onSubmit={loginFormik.handleSubmit}>
            <div className="min-w-[300px]">
              <h4 className="logTitle">Create an account of D News.</h4>
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="loginLableText">
                  User name <span>*</span>
                </label>
                <input
                  type="text"
                  name="userName"
                  placeholder="Enter username"
                  value={loginFormik.values.userName}
                  className={`${
                    loginFormik.touched.userName && loginFormik.errors.userName
                      ? "errorBorder"
                      : loginFormik.touched.userName &&
                        !loginFormik.errors.userName
                      ? "successBorder"
                      : ""
                  }  loginInputFeild  `}
                  onChange={loginFormik.handleChange}
                />
                {loginFormik.touched.userName &&
                  loginFormik.errors.userName && (
                    <p className="errormsg">{loginFormik.errors.userName}</p>
                  )}
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="username" className="loginLableText">
                  Email <span>*</span>
                </label>
                <input
                  name="email"
                  onChange={loginFormik.handleChange}
                  type="text"
                  value={loginFormik.values.email}
                  placeholder="Enter email"
                  className={`${
                    loginFormik.touched.email && loginFormik.errors.email
                      ? "errorBorder"
                      : loginFormik.touched.email && !loginFormik.errors.email
                      ? "successBorder"
                      : ""
                  }  loginInputFeild  `}
                />
                {loginFormik.touched.email && loginFormik.errors.email && (
                  <p className="errormsg">{loginFormik.errors.email}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-3">
                <label htmlFor="Password" className="loginLableText">
                  Password <span>*</span>
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={hide ? "text" : "password"}
                    placeholder="Enter password"
                    value={loginFormik.values.password}
                    className={`${
                      loginFormik.touched.password &&
                      loginFormik.errors.password
                        ? "errorBorder"
                        : loginFormik.touched.password &&
                          !loginFormik.errors.password
                        ? "successBorder"
                        : ""
                    }  loginInputFeild w-full `}
                    onChange={loginFormik.handleChange}
                  />
                  <div
                    className="absolute top-[25%] right-[3%]  cursor-pointer"
                    onClick={() => {
                      setHide(!hide);
                    }}
                  >
                    {hide ? (
                      <IoIosEye className="h-[20px] w-[20px]" />
                    ) : (
                      <IoIosEyeOff className="h-[20px] w-[20px]" />
                    )}
                  </div>
                </div>
                {loginFormik.touched.password &&
                  loginFormik.errors.password && (
                    <p className="errormsg">{loginFormik.errors.password}</p>
                  )}
              </div>
              <button
                className={`authBtn ${isLoader && "cursor-not-allowed"}`}
                type="submit"
                disabled={isLoader}
              >
                {isLoader ? <Loader color={"white"} /> : "Sign up"}
              </button>
              <p className="sText">
                Already have an account?{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
