import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.ts";
import { logout } from "../services/authService.ts";
import axios from "axios";
import toast from "react-hot-toast";
import { MdLibraryBooks } from "react-icons/md";
import Loading from "./PageLoading.tsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, logout: unauthenticate } = useAuth();

  const handleLogin = () => navigate("/login");

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success("Logout successful!");
      unauthenticate();
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDashboard = () => navigate("/dashboard");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
      <nav className="bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 shadow-2xl border-b border-indigo-700/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo and Title */}
            <div className="flex items-center space-x-5">
              <div className="relative p-2 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-xl group hover:shadow-2xl transition-transform duration-300 hover:scale-110">
                <MdLibraryBooks className="h-7 w-7 text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col leading-tight select-none">
                <h2 className="text-lg md:text-xl font-bold tracking-wide bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                  Library System
                </h2>
                <p className="text-xs md:text-sm text-white/70 mt-0.5">
                  Management Panel
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {!isLoggedIn && (
                  <button
                      onClick={handleLogin}
                      className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-2 rounded-xl text-sm font-semibold shadow-lg transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label="Login"
                  >
                    Login
                  </button>
              )}

              {isLoggedIn && (
                  <>
                    <button
                        onClick={handleDashboard}
                        className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2 rounded-xl text-sm font-semibold shadow-lg transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                        aria-label="Dashboard"
                    >
                      Dashboard
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl text-sm font-semibold shadow-lg transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
                        aria-label="Logout"
                    >
                      {isLoading ? "Logging out..." : "Logout"}
                    </button>
                  </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                  onClick={toggleMenu}
                  className="text-white hover:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                  aria-label="Toggle menu"
              >
                <svg
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
              <div className="md:hidden border-t border-indigo-700/50 bg-indigo-900">
                <div className="px-4 pt-4 pb-6 space-y-4 sm:px-6">
                  {!isLoggedIn && (
                      <button
                          onClick={handleLogin}
                          className="block w-full text-left bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-3 rounded-xl text-base font-semibold shadow-md transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          aria-label="Login"
                      >
                        Login
                      </button>
                  )}

                  {isLoggedIn && (
                      <>
                        <button
                            onClick={handleDashboard}
                            className="block w-full text-left bg-slate-700 hover:bg-slate-800 text-white px-4 py-3 rounded-xl text-base font-semibold shadow-md transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-slate-500"
                            aria-label="Dashboard"
                        >
                          Dashboard
                        </button>
                        <button
                            disabled={isLoading}
                            onClick={handleLogout}
                            className="block w-full text-left bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-xl text-base font-semibold shadow-md transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-60"
                            aria-label="Logout"
                        >
                          {isLoading ? <Loading /> : "Logout"}
                        </button>
                      </>
                  )}
                </div>
              </div>
          )}
        </div>
      </nav>
  );
};

export default Navbar;
