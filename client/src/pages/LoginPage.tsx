import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../services/authService.ts";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.ts";

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();
  const { login: authenticate } = useAuth();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const user = await login({
          email: formData.email,
          password: formData.password,
        });

        toast.success(`Welcome back, ${user.name}!`);
        authenticate(user.accessToken);
        navigate("/dashboard");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message || error.message;
          toast.error(message);
        } else {
          toast.error("Login failed. Please try again.");
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-800 via-blue-900 to-purple-900 p-6">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 text-white">
          <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent text-center leading-tight">
            Sign in to your account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2 text-white/90"
              >
                Email address
              </label>
              <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                      errors.email ? "border-red-500" : ""
                  }`}
              />
              {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                  htmlFor="password"
                  className="block text-sm font-semibold mb-2 text-white/90"
              >
                Password
              </label>
              <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                      errors.password ? "border-red-500" : ""
                  }`}
              />
              {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>
            <Link
                to="/forget"
                className="text-sm text-indigo-400 hover:text-indigo-300 font-semibold transition block text-center mt-2"
            >
              Forgot your password?
            </Link>
            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-white/80">
            Don't have an account?{" "}
            <Link
                to="/signup"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
            >
              Create new account
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Login;
