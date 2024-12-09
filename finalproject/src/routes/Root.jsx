import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";
import { ToastContainer } from "react-toastify";
import '../index.css';

export default function Root(props) {
  const color = props.color || "bg-paper_white"
  return (
    <div className= {`${color} px-10p`}>
      <Navigation />
      <div></div>
      <Outlet />
      <ToastContainer />
    </div>
  );
}
