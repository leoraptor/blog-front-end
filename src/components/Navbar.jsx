import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Navbar = ({ hideSearch }) => {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(localStorage.getItem("isLoggedIn"));

  return (
    <nav className="fixed left-0 right-0 bg-[#e9e9e9]">
      <div className="navbar">
        <div
          className="logo cursor-pointer"
          onClick={() => {
            navigate("/allPost");
          }}
        >
          D News.
        </div>
        {/* {isUser && (
          <div className="relative">
            <div className="absolute top-[21%] left-[2%]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="#667085"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.667"
                  d="M16.5 16.5l-3.625-3.625m1.958-4.708a6.667 6.667 0 11-13.333 0 6.667 6.667 0 0113.333 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search posts"
              className="searchBar"
            />
          </div>
        )} */}
        {isUser ? (
          <div className="flex items-center gap-4">
            <button
              className="navBtn min-w-[100px]"
              type="button"
              onClick={() => {
                navigate("/addpost");
              }}
            >
              Add Post
            </button>
            <button
              className="navBtngost min-w-[100px]"
              type="button"
              // onClick={() => {
              //   navigate("/signup");
              // }}
            >
              Profile
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button
              className="navBtn min-w-[100px]"
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Login
            </button>
            <button
              className="navBtngost min-w-[100px]"
              type="button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
