import React from "react";

const LoadingAnimation: React.FC = () => {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-900 via-blue-900 to-purple-900 p-6 overflow-hidden relative text-white select-none">
        {/* Animated Gradient Blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-24 left-16 w-32 h-32 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-700 to-blue-600 blur-3xl animate-animateSlowPulse"></div>
          <div className="absolute bottom-28 right-20 w-40 h-40 rounded-full bg-gradient-to-br from-pink-600 via-rose-500 to-red-600 blur-3xl animate-animateSlowPulse animation-delay-[1500ms]"></div>
          <div className="absolute top-2/3 left-1/3 w-28 h-28 rounded-full bg-gradient-to-r from-green-500 via-emerald-400 to-green-600 blur-2xl animate-animateSlowPulse animation-delay-[1200ms]"></div>
        </div>

        {/* Logo with pulse */}
        <div className="mb-12 flex flex-col items-center">
          <div className="w-24 h-24 rounded-xl bg-gradient-to-r from-indigo-400 to-purple-500 shadow-lg flex items-center justify-center animate-pulse">
            <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
              <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="mt-4 text-xl font-semibold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
            Book Club Library
          </h1>
        </div>

        {/* Creative Loading Bars */}
        <div className="flex space-x-3 mb-14">
          {["from-pink-500 to-pink-700", "from-purple-500 to-purple-700", "from-indigo-500 to-indigo-700", "from-blue-500 to-blue-700", "from-emerald-500 to-emerald-700"].map(
              (grad, idx) => (
                  <div
                      key={idx}
                      className={`w-4 rounded-sm bg-gradient-to-b ${grad} animate-loadingBar`}
                      style={{
                        animationDelay: `${idx * 0.15}s`,
                        height: `${6 + idx * 6}px`,
                        animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                        animationIterationCount: "infinite",
                        animationDirection: "alternate",
                        animationDuration: "1.2s",
                      }}
                  />
              )
          )}
        </div>

        {/* Circular spinner */}
        <div className="mb-10">
          <svg
              className="animate-spin h-16 w-16 text-indigo-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
          >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <p className="text-lg font-semibold animate-pulse">Loading Your Library...</p>
          <p className="text-indigo-300 max-w-sm mx-auto">
            Sit tight — we’re fetching your reading adventure!
          </p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center space-x-3 mt-8">
          {[...Array(5)].map((_, i) => (
              <div
                  key={i}
                  className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.25}s` }}
              />
          ))}
        </div>

        {/* Quote Container */}
        <blockquote className="mt-12 max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 mx-auto text-indigo-200 italic text-sm shadow-lg">
          “Reading is a conversation. All books talk. But a good book listens as well.”
          <footer className="mt-2 text-xs text-indigo-400">– Mark Haddon</footer>
        </blockquote>
      </div>
  );
};

export default LoadingAnimation;
