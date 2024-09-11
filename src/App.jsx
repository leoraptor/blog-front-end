import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import PageInfo from "./Pages/PageInfo";
import CreatePost from "./Pages/CreatePost";
import EditPost from "./Pages/EditPost";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <main className="h-screen overflow-auto">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/allPost" element={<Home />} />
        <Route path="/post" element={<PageInfo />} />
        <Route path="/post/id" element={<PageInfo />} />
        <Route path="/addpost" element={<CreatePost />} />
        <Route path="/editpost" element={<EditPost />} />
      </Routes>
      <ToastContainer />
    </main>
  );
}

export default App;
