import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import libraryImg from "../assets/Jj4CnxKytsmOSIYoE3bH5S6XSjqnsCHg1aJPvhOGxUo.webp";

const WelcomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
      <div className="min-h-screen bg-white relative overflow-hidden select-none font-sans">
        {/* Background decorative animated blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-12 left-12 w-40 h-40 rounded-3xl bg-gradient-to-br from-indigo-400 via-purple-500 to-indigo-700 opacity-20 filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-24 right-20 w-48 h-48 rounded-3xl bg-gradient-to-tr from-pink-400 via-purple-400 to-purple-700 opacity-20 filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-3xl bg-gradient-to-r from-green-300 via-teal-400 to-green-500 opacity-15 filter blur-2xl animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-1/3 right-1/3 w-28 h-28 rounded-3xl bg-gradient-to-tr from-yellow-400 via-orange-400 to-yellow-600 opacity-15 filter blur-2xl animate-blob animation-delay-3000"></div>
        </div>

        {/* Fullscreen darkened background image */}
        <div
            className={`fixed inset-0 z-0 transition-opacity duration-1200 ease-in-out ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
              src={libraryImg}
              alt="Beautiful Library"
              className="w-full h-full object-cover"
              draggable={false}
              style={{
                filter: "brightness(15%)", // Adjust darkness here (80% darkened)
              }}
          />
        </div>

        <div className="relative min-h-screen flex justify-center items-center p-6 max-w-7xl mx-auto z-10">
          {/* Container: Card middle-left and Quote middle-right */}
          <div className="flex flex-col lg:flex-row items-center lg:items-center gap-16 w-full max-w-6xl">

            {/* Left: Card with original styles, horizontally and vertically centered */}
            <div
                className={`bg-white rounded-3xl p-12 max-w-md shadow-2xl border border-gray-300 transition-transform duration-[1100ms] ease-in-out flex-shrink-0 
              ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}
            >
              {/* Logo and Title */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-lg mb-5 animate-pulse">
                  <svg
                      className="w-10 h-10 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent mb-3 leading-tight">
                  Book Club Library
                </h1>
                <p className="text-indigo-700 text-lg italic font-semibold">
                  Manage Your Library with Style
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-5">
                <button
                    onClick={handleSignIn}
                    className="w-full bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 hover:scale-105 active:scale-95 transition-transform rounded-xl py-4 text-white font-semibold shadow-lg flex items-center justify-center gap-3"
                    aria-label="Sign In"
                >
                  <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                  >
                    <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                  </svg>
                  Sign In to Your Account
                </button>

                <button
                    onClick={handleSignUp}
                    className="w-full border-2 border-indigo-600 rounded-xl py-4 text-indigo-700 font-semibold hover:bg-indigo-600 hover:text-white transition-colors shadow-md flex items-center justify-center gap-3 active:scale-95 transform"
                    aria-label="Sign Up"
                >
                  <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                  >
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                  </svg>
                  Create New Account
                </button>
              </div>

              {/* Features Section */}
              <div className="mt-12 pt-8 border-t border-indigo-600/40">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: "13200+", label: "Books" },
                    { value: "3600+", label: "Members" },
                    { value: "24/7", label: "Access" },
                  ].map(({ value, label }) => (
                      <div key={label} className="text-indigo-700">
                        <div className="text-3xl font-extrabold">{value}</div>
                        <div className="uppercase font-bold tracking-wide text-sm mt-1">
                          {label}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Overlay Quote aligned vertically middle on right with big bold blue gradient text */}
            <div
                className={`relative max-w-xl flex flex-col justify-center items-end text-right ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"} transition-all duration-1000 ease-in-out select-text`}
            >
              <h3 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-blue-500 to-purple-700 bg-clip-text text-transparent drop-shadow-lg leading-tight">
                “A library is a sanctuary of knowledge”
              </h3>
              <p className="mt-6 text-lg max-w-md font-light text-white/90">
                Discover, organize, and inspire your community through comprehensive systems that bring books, readers, and lending into harmonious interaction — all elegantly managed in one platform.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom navigation hint */}
        <div
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 text-indigo-600 text-sm font-semibold animate-pulse transition-opacity duration-1500 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
          <span>Signup to our library system</span>
          <svg
              className="w-5 h-5 animate-bounce"
              fill="currentColor"
              viewBox="0 0 20 20"
          >
            <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L11 6.414V16a1 1 0 11-2 0V6.414L7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3z"
                clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Animations CSS */}
        <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 8s infinite ease-in-out;
        }
      `}</style>
      </div>
  );
};

export default WelcomePage;
