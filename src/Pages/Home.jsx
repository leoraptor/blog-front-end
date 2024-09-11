import React, { useState, useEffect } from "react";
import HomePosts from "../components/HomePosts";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosInstance } from "../axios/axios";
import Loader from "../components/Loader";
import { Toaster } from "../toast/toast";

const Home = () => {
  const [isloader, setIsLoader] = useState(true);
  const naviagte = useNavigate();
  const [allPost, setAllPost] = useState([]);

  const getAllPost = () => {
    setIsLoader(true);
    axiosInstance
      .get(`api/posts`)
      .then((res) => {
        setAllPost(res.data.data.result.reverse());
        setIsLoader(false);
      })
      .catch((err) => {
        console.log(err);
        naviagte("/");
        Toaster("error", `${err.response.data.message}`);
      });
  };

  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <div>
      <Navbar />
      <main className="mx-auto w-[70rem] pt-[60px] ">
        <div className=" flex flex-col items-start gap-[50px]">
          {isloader ? (
            <div className="flex items-center justify-center w-full h-[70vh]">
              <Loader size={30} />{" "}
            </div>
          ) : (
            <div className="w-full">
              {allPost.length > 0 ? (
                <div>
                  {allPost.map((item, index) => {
                    return (
                      <div
                        className="cursor-pointer my-[20px]"
                        onClick={() => {
                          localStorage.setItem("postId", item._id);
                          naviagte("/post");
                        }}
                        key={index}
                      >
                        <HomePosts data={item} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="loginLableText flex items-center justify-center w-full text-center h-[90vh]">
                  No Posts Found
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
