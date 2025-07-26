// Layout.jsx
import React from "react";
import Navbar from "../components/Navbar"; // Keep your current Navbar as is
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
