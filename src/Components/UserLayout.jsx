import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import logo from "../assets/navbar_logo.png";

const UserLayout = () => {
  return (
    <>
      <nav className="flex justify-between bg-primary text-white p-4">
        <div>
          <img src={logo} className="w-48 h-auto" alt="Logo" />
        </div>
        <div className="flex space-x-5">
          <NavLink to="/user/application" className="text-center text-[28px] font-bold">Application</NavLink>
          <NavLink to="/user/profile" className="text-center text-[28px] font-bold">Profile</NavLink>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default UserLayout;
