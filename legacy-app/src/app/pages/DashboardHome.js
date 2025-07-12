import React, { useRef, useState, useEffect } from "react";
import Sidebar from "./../components/Sidebar";
import { Outlet } from "react-router-dom";
import MobileHeader from "../components/MobileHeader";
import { useDispatch } from "react-redux";
import { fetchUserProfileById } from "../../store/slices/UserProfile/UserProfile";
import { getParametersFromLocalStorage } from "../../helpers/commonHelper";

function DashboardHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();
  const dispatch = useDispatch();
  const userId = getParametersFromLocalStorage("userID");

  // useClickOutside(sidebarRef, () => setIsSidebarOpen(false));

  const toggleSidebar = () => {
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);
  };

  useEffect(()=>{
    dispatch(fetchUserProfileById(userId))
  },[dispatch, userId])

  return (
    <div className="app-main">
      <MobileHeader
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <Sidebar isSidebarOpen={isSidebarOpen} sidebarRef={sidebarRef} />
      <div className="main-area">
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
