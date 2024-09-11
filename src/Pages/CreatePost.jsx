import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { createPostValidation } from "../validation/validation";
import { axiosInstance } from "../axios/axios";
import { Toaster } from "../toast/toast";
import Loader from "../components/Loader";

const CreatePost = () => {
  const naviagte = useNavigate();
  const imageRef = useRef(null);
  const [category, setCategory] = useState("");
  const [categoryArray, setCategoryArray] = useState([]);
  const [spinner, setSpinner] = useState(false);

  const addFunction = () => {
    if (!categoryArray.includes(category) && category !== "") {
      setCategoryArray([...categoryArray, category]);
      createPost.setFieldValue("cate", [...categoryArray, category]);
      setCategory("");
    } else {
      setCategory("");
    }
  };

  const categoryDeleteFunction = (index) => {
    const data = [...categoryArray];
    data.splice(index, 1);
    setCategoryArray(data);
  };

  const createPost = useFormik({
    initialValues: {
      title: "",
      image: "",
      desc: "",
    },
    validationSchema: createPostValidation,
    onSubmit: () => {
      addPost();
    },
  });

  const addPost = () => {
    setSpinner(true);
    axiosInstance
      .post(`api/post`, {
        title: createPost.values.title,
        desc: createPost.values.desc,
        image: createPost.values.image,
        username: localStorage.getItem("username"),
        userId: localStorage.getItem("userId"),
        categories: categoryArray,
      })
      .then((res) => {
        setSpinner(false);
        naviagte("/allPost");
        Toaster("success", `${res.data.message}`);
      })
      .catch((err) => {
        console.log(err);
        setSpinner(false);
        Toaster("error", `${err.response.data.message}`);
      });
  };

  return (
    <div>
      <Navbar hideSearch={false} />
      <div className="mx-auto w-[70rem] pt-[60px]">
        <div className="py-[20px]">
          <form onSubmit={createPost.handleSubmit} className="max-w-[500px]">
            <div className="flex items-center justify-between">
              <h4 className="logTitle2">Create Post</h4>
              <div
                onClick={() => {
                  naviagte(-1);
                }}
                className="bg-black h-[30px] w-[30px] text-white cursor-pointer rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="none"
                  viewBox="0 0 17 17"
                >
                  <path
                    fill="white"
                    d="M15.125 16.604L8.5 9.97l-6.625 6.635-1.479-1.479L7.031 8.5.396 1.875 1.876.396 8.5 7.031 15.125.406l1.469 1.47L9.969 8.5l6.625 6.625-1.469 1.48z"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="loginLableText">
                  Title <span>*</span>
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="Enter title"
                  className={`${
                    createPost.touched.title && createPost.errors.title
                      ? "errorBorder"
                      : createPost.touched.title && !createPost.errors.title
                      ? "successBorder"
                      : ""
                  }  loginInputFeild`}
                  onChange={createPost.handleChange}
                />
                {createPost.touched.title && createPost.errors.title && (
                  <p className="errormsg">{createPost.errors.title}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="loginLableText">
                  Image <span>*</span>
                </label>
                <div className="relative">
                  <input
                    ref={imageRef}
                    name="image"
                    type="text"
                    placeholder="Enter image url"
                    className={`${
                      createPost.touched.image && createPost.errors.image
                        ? "errorBorder"
                        : createPost.touched.image && !createPost.errors.image
                        ? "successBorder"
                        : ""
                    }   loginInputFeild2 w-full `}
                    onChange={createPost.handleChange}
                    value={createPost.values.image}
                  />
                  {createPost.values.image && (
                    <div
                      onClick={() => {
                        createPost.setFieldValue("image", null);
                        imageRef.current.value = null;
                      }}
                      className=" cursor-pointer absolute top-[36%] right-[3%]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="none"
                        viewBox="0 0 17 17"
                      >
                        <path
                          fill="black"
                          d="M15.125 16.604L8.5 9.97l-6.625 6.635-1.479-1.479L7.031 8.5.396 1.875 1.876.396 8.5 7.031 15.125.406l1.469 1.47L9.969 8.5l6.625 6.625-1.469 1.48z"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>
                {createPost.touched.image && createPost.errors.image && (
                  <p className="errormsg">{createPost.errors.image}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="loginLableText">
                  Category
                </label>
                <div>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Enter category"
                      value={category}
                      className="loginInputFeild w-full"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          addFunction();
                        }
                      }}
                    />
                    <div className="addBtn" onClick={() => addFunction()}>
                      Add
                    </div>
                  </div>

                  {/* <p className="errormsg mt-2">
                    {catErr && "Category is Required"}
                  </p> */}
                </div>

                <div className="flex items-center gap-2">
                  {categoryArray.map((item, index) => {
                    return (
                      <div key={index} className="cateBox">
                        <p>{item}</p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            categoryDeleteFunction(index);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="15"
                            fill="none"
                            viewBox="0 0 15 15"
                          >
                            <path
                              fill="white"
                              fillRule="evenodd"
                              d="M12.302 3.474a.42.42 0 01.413.425v.22a.423.423 0 01-.413.426H2.698a.423.423 0 01-.414-.426V3.9a.42.42 0 01.414-.425h1.69a.743.743 0 00.719-.589l.088-.395c.138-.538.59-.896 1.108-.896h2.393c.513 0 .97.358 1.103.868l.094.423a.742.742 0 00.72.589h1.69zm-.858 8.05c.176-1.644.485-5.55.485-5.59a.432.432 0 00-.105-.323.42.42 0 00-.303-.136H3.483a.41.41 0 00-.303.136.458.458 0 00-.11.323l.03.375c.082 1.022.312 3.868.46 5.215.105.992.755 1.615 1.698 1.638.728.017 1.478.023 2.244.023a98.2 98.2 0 002.205-.023c.976-.017 1.627-.63 1.737-1.638z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="loginLableText">
                  Description <span>*</span>
                </label>
                <textarea
                  type="text"
                  name="desc"
                  placeholder="Enter description"
                  onChange={createPost.handleChange}
                  className={`${
                    createPost.touched.desc && createPost.errors.desc
                      ? "errorBorder"
                      : createPost.touched.desc && !createPost.errors.desc
                      ? "successBorder"
                      : ""
                  }  loginInputFeild  min-h-[120px]`}
                />
                {createPost.touched.desc && createPost.errors.desc && (
                  <p className="errormsg">{createPost.errors.desc}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={spinner}
              className={`authBtn ${spinner && "cursor-not-allowed"}`}
            >
              {spinner ? <Loader color={"white"} /> : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
