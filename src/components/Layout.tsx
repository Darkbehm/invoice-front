import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export function Layout() {
  return (
    <div className="w-screen flex flex-col justify-center ">
      <Navbar />
      <div className="max-w-screen-xl self-center w-full p-8">
        <Outlet />
      </div>
    </div>
  );
}
