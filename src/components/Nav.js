import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slice/authSlice";
import { toast } from "react-toastify";

const Nav = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isStaffDropdownOpen, setIsStaffDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleStaffDropdown = () => {
    setIsStaffDropdownOpen(!isStaffDropdownOpen); // Toggle staff dropdown
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()); // Dispatch loginUser action with form data
      localStorage.removeItem("user");
      navigate("/");
      toast.success("Logout Successful");
    } catch (error) {
      toast.error("error occured");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-sky-600 via-sky-500 to-sky-700 text-gray-100 transform transition-transform md:relative md:translate-x-0 z-50`}
      >
        <div className="flex items-center justify-between h-16 p-4 text-white text-2xl font-bold">
          <span>Logo</span>
          <button className="md:hidden" onClick={toggleSidebar}>
            ✖
          </button>
        </div>
        <nav className="p-4">
          <ul>
            <li className="mb-4">
              <a
                href="##"
                className="flex items-center p-2 rounded-md hover:bg-gray-700"
              >
                <span className="mr-3">🏠</span>Home
              </a>
            </li>
            {/* Staff Dropdown */}
            <li className="mb-4">
              <div>
                <button
                  className="flex items-center justify-between w-full p-2 rounded-md hover:bg-gray-700"
                  onClick={toggleStaffDropdown}
                >
                  <div className="flex items-center">
                    <span className="mr-3">🔍</span>Staff
                  </div>
                  <span>{isStaffDropdownOpen ? "▲" : "▼"}</span>
                </button>
                {/* Dropdown Items */}
                {isStaffDropdownOpen && (
                 
                <ul className=" mt-2 bg-gray-600 rounded-md shadow-lg transition duration-300 ease-in-out">
                  <li className="mb-2">
                    <Link
                      to="/staff/register"
                      className="block p-2 rounded-md hover:bg-gray-500"
                    >
                      Add Staff
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link
                      to="/staff"
                      className="block p-2 rounded-md hover:bg-gray-500"
                    >
                      View Staff
                    </Link>
                  </li>
                </ul>
            
                )}
              </div>
            </li>
            <li className="mb-4">
              <a
                href="##"
                className="flex items-center p-2 rounded-md hover:bg-gray-700"
              >
                <span className="mr-3">📄</span>Documents
              </a>
            </li>
            <li>
              <a
                href="##"
                className="flex items-center p-2 rounded-md hover:bg-gray-700"
              >
                <span className="mr-3">⚙️</span>Settings
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between h-16 bg-gray-100 px-4 shadow-md">
          <div className="text-xl font-bold">DFCU HR</div>
          <div className="hidden md:flex items-center space-x-6">
            {/* User Name Section with Avatar */}
            <div className="relative group flex items-center space-x-3">
              {/* Avatar SVG */}
              <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="h-8 w-8"
                >
                  <path d="M12 12c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>

              <div className="border border-sky-500 rounded-full px-4 py-2 bg-white shadow-lg hover:bg-sky-100 transition duration-300 ease-in-out cursor-pointer">
                <span className="text-sky-700 font-semibold">
                  {user?.user.name}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button onClick={handleLogout} className="relative px-5 py-3 bg-gradient-to-b from-sky-600 to-sky-500 text-white rounded-md shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out">
              <span>Logout</span>
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-sky-700 to-blue-500 opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden p-2 text-white rounded-lg bg-gradient-to-b from-sky-600 to-blue-500"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-50 overflow-auto max-w-full">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed inset-x-0 bottom-0 bg-gradient-to-r from-sky-600 via-sky-400 to-blue-500 text-gray-100 md:hidden">
        <div className="flex justify-around py-3">
          <a href="##" className="text-center">
            <span className="block text-2xl">🏠</span>
            <span className="block text-sm">Home</span>
          </a>
          <a href="##" className="text-center">
            <span className="block text-2xl">🔍</span>
            <span className="block text-sm">Search</span>
          </a>
          <a href="##" className="text-center">
            <span className="block text-2xl">📄</span>
            <span className="block text-sm">Docs</span>
          </a>
          <a href="##" className="text-center">
            <span className="block text-2xl">⚙️</span>
            <span className="block text-sm">Settings</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
