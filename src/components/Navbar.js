import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userRole }) => {
  return (
    <nav className="bg-green-600 p-4">
      <ul className="flex gap-4 text-white">
        <li>
          <Link to="/">الرئيسية</Link>
        </li>
        {userRole === "admin" && (
          <li>
            <Link to="/admin/dashboard">لوحة التحكم</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
