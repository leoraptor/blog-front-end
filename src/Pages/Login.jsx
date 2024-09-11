import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidation } from "../validation/validation";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { axiosInstance } from "../axios/axios";
import { Toaster } from "../toast/toast";
import Loader from "../components/Loader";
const Login = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const [isLoader, setIsLoader] = useState(false);

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: () => {
      handelLogin();
    },
  });

  const handelLogin = () => {
    setIsLoader(true);
    axiosInstance
      .post(`/auth/login`, {
        email: loginFormik.values.email,
        password: loginFormik.values.password,
      })
      .then((res) => {
        localStorage.setItem("dToken", res.data.result.user.access_token);
        localStorage.setItem("username", res.data.result.user.username);
        localStorage.setItem("userId", res.data.result.user._id);
        localStorage.setItem("isLoggedIn", true);
        loginFormik.resetForm({});
        Toaster("success", `${res.data.result.message}`);
        setIsLoader(false);
        navigate("/allPost");
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
        <form onSubmit={loginFormik.handleSubmit}>
          <div className="min-w-[300px]">
            <h4 className="logTitle">Login to your D News. account</h4>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="loginLableText">
                Email <span>*</span>
              </label>
              <input
                name="email"
                type="text"
                placeholder="Enter email"
                value={loginFormik.values.email}
                className={`${
                  loginFormik.touched.email && loginFormik.errors.email
                    ? "errorBorder"
                    : loginFormik.touched.email && !loginFormik.errors.email
                    ? "successBorder"
                    : ""
                }  loginInputFeild  `}
                onChange={loginFormik.handleChange}
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
                  value={loginFormik.values.password}
                  type={hide ? "password" : "text"}
                  placeholder="Enter password"
                  className={`${
                    loginFormik.touched.password && loginFormik.errors.password
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
              {loginFormik.touched.password && loginFormik.errors.password && (
                <p className="errormsg">{loginFormik.errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className={`authBtn ${isLoader && "cursor-not-allowed"}`}
            >
              {isLoader ? <Loader color={"white"} /> : "Login"}
            </button>
            <p className="sText">
              First Time?{" "}
              <span
                className="cursor-pointer"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
