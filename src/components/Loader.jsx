import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = ({ color, size }) => {
  return (
    <div className={`flex justify-center items-center`}>
      <div>
        <Box sx={{ display: "flex" }}>
          <CircularProgress
            size={size ? size : 18}
            sx={{ color: `${color ? "white" : "black"}` }}
          />
        </Box>
      </div>
    </div>
  );
};

export default Loader;
