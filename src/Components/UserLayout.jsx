import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import logo from "../assets/navbar_logo.png";

const UserLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <>
      <nav className="flex justify-between items-center bg-primary text-white p-4">
        <div>
          <img src={logo} className="w-48 h-auto" alt="Logo" />
        </div>
        <div className="flex space-x-5 items-center">
          <NavLink to="/user/application" className="text-lg font-semibold hover:underline hover:text-secondary transition-colors">Applications</NavLink>
          <NavLink to="/user/profile" className="text-lg font-semibold hover:underline hover:text-secondary transition-colors">Profile</NavLink>
          <button className="text-lg font-semibold hover:underline hover:text-secondary transition-colors cursor-pointer" onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default UserLayout;
