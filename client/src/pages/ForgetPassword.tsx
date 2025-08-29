import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { forgotPassword, resetPassword } from "../services/authService";

const ForgotPassword = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      const response = await forgotPassword(email);
      setSuccess(response.message || "Reset token sent to your email");
      toast.success("Reset token sent to your email");
      setStep(2);
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (!token || !newPassword) {
      setError("Please provide both token and new password");
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword(token, newPassword);
      setSuccess(response.message || "Password reset successfully");
      toast.success("Password reset successfully");
      setStep(1);
      setToken("");
      setNewPassword("");
    } catch (error: unknown) {
      let message = "Something went wrong";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-800 via-blue-900 to-purple-900 p-6">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent text-center leading-tight">
            {step === 1 ? "Forgot Password" : "Reset Your Password"}
          </h2>

          {step === 1 ? (
              <form onSubmit={handleSendResetLink} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email address
                  </label>
                  <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition shadow-sm"
                      disabled={loading}
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                {success && <p className="text-green-400 text-sm">{success}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"} text-white font-semibold py-2 rounded-lg shadow-md transition flex justify-center items-center`}
                >
                  {loading && (
                      <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
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
                  )}
                  {loading ? "Sending..." : "Send Reset Token"}
                </button>
              </form>
          ) : (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label htmlFor="token" className="block text-sm font-semibold mb-2">
                    Reset Token
                  </label>
                  <input
                      id="token"
                      name="token"
                      type="text"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      placeholder="Enter reset token"
                      className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition shadow-sm"
                      disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-semibold mb-2">
                    New Password
                  </label>
                  <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition shadow-sm"
                      disabled={loading}
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}
                {success && <p className="text-green-400 text-sm">{success}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full ${loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} text-white font-semibold py-2 rounded-lg shadow-md transition flex justify-center items-center`}
                >
                  {loading && (
                      <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
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
                  )}
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
          )}

          <p className="mt-6 text-center text-white/80">
            Back to{" "}
            <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
  );
};

export default ForgotPassword;
