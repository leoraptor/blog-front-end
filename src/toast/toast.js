import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

export const Toaster = (type, message) => {
  return toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
