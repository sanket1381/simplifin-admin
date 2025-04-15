import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await axios.post(
        "https://devapi.simplifin.in/auth/signin",
        {
          email,
          password,
          type: "normalLogin",
        },
        {
          headers: {
            "Content-Type": "application/json",
            isvalidrequest: "simplifinAuth123",
          },
        }
      );

      const { token } = res.data.result;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        console.error("No token received");
      }
    } catch (err) {
      const message = err.response?.data?.message || "";

      if (message === "User does not exist, create a new account") {
        setEmailError("Invalid Email");
      } else if (message === "Username or PIN do not match") {
        setPasswordError("Incorrect password");
      } else {
        setPasswordError("Something went wrong. Please try again.");
      }

      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-[600px] px-4"
      >
        <div className="w-full max-w-2xl p-12 bg-white shadow-2xl rounded-3xl border border-gray-200">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-800 mb-2 text-center"
          >
            Simplifint
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base text-gray-500 mb-8 text-center"
          >
            Please sign in to your account
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                type="email"
                value={email}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${emailError ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {emailError && (
                <span className="text-red-500 text-sm mt-1 block">
                  {emailError}
                </span>
              )}
            </div>

            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError) setPasswordError("");
                }}
                type="password"
                value={password}
                placeholder="••••••••"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none ${passwordError ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {passwordError && (
                <span className="text-red-500 text-sm mt-1 block">
                  {passwordError}
                </span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg"
            >
              Log In
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInForm;
