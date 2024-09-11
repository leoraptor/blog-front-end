import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { commentValidation } from "../validation/validation";
import { useFormik } from "formik";
import { axiosInstance } from "../axios/axios";
import { Toaster } from "../toast/toast";
import Loader from "../components/Loader";
import moment from "moment";
import { RiCloseCircleFill } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";

const PageInfo = () => {
  const cRef = useRef(null);
  const naviagte = useNavigate();
  const postId = localStorage.getItem("postId");
  const [postData, setPostdata] = useState({});
  const [allComments, setAllComments] = useState([]);
  const [isloader, setIsLoader] = useState(true);
  const [cLoader, setCLoader] = useState(true);
  const [comLoader, setComLoader] = useState(false);
  const [isCUpdate, setIsCUpdate] = useState(false);
  const [cIndex, setCindex] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [delLoader, setDelLoader] = useState(false);

  const commentFormik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentValidation,
    onSubmit: () => {
      if (isCUpdate) {
        updateComment();
      } else {
        addComment();
      }
    },
  });

  const addComment = () => {
    setComLoader(true);

    axiosInstance
      .post(`/api/comment`, {
        comment: commentFormik.values.comment,
        author: localStorage.getItem("username"),
        postId: postId,
        userId: localStorage.getItem("userId"),
      })
      .then((res) => {
        getAllComments();
        Toaster("success", `${res.data.message}`);
        commentFormik.resetForm({});
        setComLoader(false);
      })
      .catch((err) => {
        console.log(err);
        Toaster("error", `${err.response.data.message}`);
        setComLoader(false);
      });
  };

  const updateComment = () => {
    setComLoader(true);
    axiosInstance
      .put(`api/comment?id=${commentId}`, {
        comment: commentFormik.values.comment,
        author: localStorage.getItem("username"),
        postId: postId,
        userId: localStorage.getItem("userId"),
      })
      .then((res) => {
        setComLoader(false);
        setIsCUpdate(false);
        setCommentId("");
        getAllComments();
        Toaster("success", `${res.data.message}`);
        commentFormik.resetForm({});
        setCindex(null);
      })
      .catch((err) => {
        console.log(err);
        Toaster("error", `${err.response.data.message}`);
        setComLoader(false);
      });
  };

  const getPostById = () => {
    axiosInstance
      .get(`api/post?id=${postId}`)
      .then((res) => {
        setPostdata(res.data.data);
        setIsLoader(false);
      })
      .catch((err) => {
        console.log(err);
        Toaster("error", `${err.response.data.message}`);
      });
  };

  const deletePost = (id) => {
    setDelLoader(true);
    axiosInstance
      .delete(`api/post?id=${id}`)
      .then((res) => {
        Toaster("success", `${res.data.message}`);
        setDelLoader(false);
        naviagte("/allPost");
      })
      .catch((err) => {
        console.log(err);
        setDelLoader(false);
        Toaster("error", `${err.response.data.message}`);
      });
  };

  const getAllComments = () => {
    setCLoader(true);
    axiosInstance
      .get(`api/comment?postId=${postId}`)
      .then((res) => {
        setAllComments(res.data.data.reverse());
        setCLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setCLoader(false);
        Toaster("error", `${err.response.data.message}`);
      });
  };

  const deleteComment = (id) => {
    axiosInstance
      .delete(`api/comment?id=${id}`)
      .then((res) => {
        getAllComments();
        Toaster("success", `${res.data.message}`);
      })
      .catch((err) => {
        console.log(err);
        Toaster("error", `${err.response.data.message}`);
      });
  };

  useEffect(() => {
    getPostById();
    getAllComments();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-auto w-[70rem] pt-[60px]">
        <div className="py-[20px]">
          {/*  */}
          {isloader ? (
            <div className="flex items-center justify-center h-[50vh]">
              <Loader size={30} />
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <h1 className="homePostTitle capitalize">
                  {postData.title || "-"}
                </h1>
                <div className="flex items-center">
                  {postData.userId === localStorage.getItem("userId") ? (
                    <div className="flex items-center gap-4">
                      <button
                        className="navBtngost min-w-[100px]"
                        type="button"
                        onClick={() => {
                          naviagte("/editpost");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="deleteBtn min-w-[100px] flex items-center justify-center gap-2"
                        onClick={() => {
                          deletePost(postData._id);
                        }}
                      >
                        {delLoader ? (
                          <Loader color={"white"} />
                        ) : (
                          <span className="flex items-center gap-2">
                            Delete{" "}
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
                          </span>
                        )}
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                  <button
                    onClick={() => {
                      naviagte("/allPost");
                    }}
                    className="navBtngost gap-2 ml-4 min-w-[120px] flex items-center justify-center"
                  >
                    <IoArrowBack className="h-[18px] w-[18px]" /> Back
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-start gap-4">
                <p className="author">@{postData.username || "-"}</p>
                <p className="dateTime">
                  {" "}
                  {moment(postData.createdAt).format("h:mm A DD, MMM YYYY")}
                </p>
              </div>
              {/*  */}
              <div>
                <img className="homePostImg2" src={postData.image} alt="" />
              </div>
              {/*  */}
              <p className="homePostText mt-3">{postData.desc}</p>
              {/*  */}
              <div className="flex items-center gap-2 my-[40px]">
                <p className="caterText">Catergories:</p>
                <div className="catergorie">
                  {postData.categories.map((item, index) => {
                    return (
                      <p key={index} className="cateBox">
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/*  */}
          <p className="caterText">Comments:</p>
          <div
            className={`comments ${
              allComments.length ? "h-[300px]" : ""
            } overflow-auto`}
          >
            {cLoader ? (
              <Loader />
            ) : (
              <div>
                {allComments.length > 0 ? (
                  <div className="flex flex-col gap-3 ">
                    {allComments.map((item, index) => {
                      return (
                        <div key={index}>
                          <div className="flex items-center justify-between bg-white px-2 pt-2">
                            <p className="commentText">@{item.author}</p>
                            <div className="flex items-center gap-5">
                              <p className="loginLableText">
                                {moment(item.createdAt).format(
                                  "h:mm A DD, MMM YYYY"
                                )}
                              </p>
                              {item.userId ===
                              localStorage.getItem("userId") ? (
                                <div className="flex items-center gap-3">
                                  {isCUpdate && index === cIndex && (
                                    <button
                                      onClick={() => {
                                        setIsCUpdate(false);
                                        setCindex(null);
                                        commentFormik.setFieldValue(
                                          "comment",
                                          ""
                                        );
                                        setCommentId("");
                                      }}
                                    >
                                      <RiCloseCircleFill />
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      commentFormik.setFieldValue(
                                        "comment",
                                        item.comment
                                      );
                                      setCommentId(item._id);
                                      setIsCUpdate(true);
                                      setCindex(index);
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="15"
                                      height="15"
                                      fill="none"
                                      viewBox="0 0 12 12"
                                    >
                                      <path
                                        fill="#344054"
                                        fillRule="evenodd"
                                        d="M4.688 10.014l4.393-5.681a1.2 1.2 0 00.244-1.022 1.533 1.533 0 00-.573-.876l-.737-.585c-.642-.511-1.438-.457-1.894.129l-.494.64a.19.19 0 00.032.263s1.247 1 1.274 1.02c.084.081.148.189.164.318a.472.472 0 01-.409.521.423.423 0 01-.323-.091l-1.31-1.043a.156.156 0 00-.213.027L1.728 7.665c-.202.253-.271.58-.202.898l.398 1.725a.2.2 0 00.196.156l1.751-.022c.318-.005.616-.15.817-.408zm2.452-.537h2.855c.278 0 .505.23.505.511a.509.509 0 01-.505.512H7.14a.509.509 0 01-.505-.512c0-.282.226-.511.505-.511z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => {
                                      deleteComment(item._id);
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
                                        fill="#FE3E3E"
                                        fillRule="evenodd"
                                        d="M12.302 3.474a.42.42 0 01.413.425v.22a.423.423 0 01-.413.426H2.698a.423.423 0 01-.414-.426V3.9a.42.42 0 01.414-.425h1.69a.743.743 0 00.719-.589l.088-.395c.138-.538.59-.896 1.108-.896h2.393c.513 0 .97.358 1.103.868l.094.423a.742.742 0 00.72.589h1.69zm-.858 8.05c.176-1.644.485-5.55.485-5.59a.432.432 0 00-.105-.323.42.42 0 00-.303-.136H3.483a.41.41 0 00-.303.136.458.458 0 00-.11.323l.03.375c.082 1.022.312 3.868.46 5.215.105.992.755 1.615 1.698 1.638.728.017 1.478.023 2.244.023a98.2 98.2 0 002.205-.023c.976-.017 1.627-.63 1.737-1.638z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="loginLableText  bg-white px-2 pb-2">
                            {item.comment || "-"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="loginLableText">No Comments found!</p>
                )}
              </div>
            )}
          </div>
          {/*  */}
          <form onSubmit={commentFormik.handleSubmit} className="mt-[20px]">
            <div>
              <textarea
                value={commentFormik.values.comment}
                className={`${
                  commentFormik.touched.comment && commentFormik.errors.comment
                    ? "errorBorder"
                    : commentFormik.touched.comment &&
                      !commentFormik.errors.comment
                    ? "successBorder"
                    : ""
                }  commentFeild  `}
                name="comment"
                id=""
                placeholder="Enter comment"
                onChange={commentFormik.handleChange}
              ></textarea>
              {commentFormik.touched.comment &&
                commentFormik.errors.comment && (
                  <p className="errormsg">{commentFormik.errors.comment}</p>
                )}
            </div>
            <button
              disabled={comLoader}
              type="submit"
              className={`authBtn2 ${comLoader && "cursor-not-allowed"}`}
            >
              {comLoader ? (
                <Loader color={"white"} />
              ) : isCUpdate ? (
                "Update comment"
              ) : (
                "Add comment"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageInfo;
