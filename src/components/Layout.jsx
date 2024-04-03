import React from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { stateUiSelector } from "../features/ui/selectors";

function Layout() {
  const stateUi=useSelector(stateUiSelector)
  return (
    <div className={stateUi.isDark?'dark':''} >
        <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Navbar></Navbar>
      <SideBar></SideBar>
      <div className="p-4 sm:ml-64 min-h-screen flex flex-col justify-between gap-3 ">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
      
    </div>
    </div>
  );
}

export default Layout;
