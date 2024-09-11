import React from "react";
import moment from "moment";

const HomePosts = ({ data }) => {
  return (
    <div className="flex item-start justify-start gap-5 ">
      <div>
        <img className="homePostImg" src={data.image || "-"} alt="..." />
      </div>
      <div className="w-full">
        <h2 className="homePostTitle capitalize">{data.title || "-"}</h2>
        <div className="flex datas-center  gap-2">
          <p className="author">@{data.username || "-"}</p>
          <p className="dateTime">
            {moment(data.createdAt).format("h:mm A DD, MMM YYYY")}
          </p>
        </div>
        <p className="homePostText">{data.desc || "-"}</p>
      </div>
    </div>
  );
};

export default HomePosts;
