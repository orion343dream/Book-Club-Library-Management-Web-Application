import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { signUp } from "../services/authService";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        toast.success(`Welcome, ${response.name}!`);
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/login");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.message);
        } else {
          toast.error("Registration failed. Please try again.");
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
            Create your account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2 text-white/90"
              >
                Full Name
              </label>
              <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                      errors.name ? "border-red-500" : ""
                  }`}
              />
              {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

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

            <div>
              <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold mb-2 text-white/90"
              >
                Confirm Password
              </label>
              <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 ${
                      errors.confirmPassword ? "border-red-500" : ""
                  }`}
              />
              {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
            >
              Sign up
            </button>
          </form>

          <p className="mt-6 text-center text-white/80">
            Already have an account?{" "}
            <Link
                to="/login"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Signup;
