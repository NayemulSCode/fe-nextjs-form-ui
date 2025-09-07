"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React, { useState } from "react";

// Type for form data (same as before)
export type LoginFormData = {
  email: string;
  password: string;
};

// Validation functions (replacing Zod)
const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Please enter a valid email address";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return null;
};

export default function LoginForm() {
  // Form state: values and errors
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on change for better UX
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Handle blur (validate on leave)
  const handleBlur = (field: keyof LoginFormData) => {
    const error =
      field === "email"
        ? validateEmail(formData[field])
        : validatePassword(formData[field]);
    setErrors((prev) => ({ ...prev, [field]: error || "" }));
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    setErrors({
      email: emailError || "",
      password: passwordError || "",
    });
    return !emailError && !passwordError;
  };

  // Handle submit
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; // Prevent submit if invalid

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login data:", formData);
      alert("Login successful!");
      // Optionally reset form
      setFormData({ email: "", password: "" });
      setErrors({});
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (e.g., set a general error message)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email Input */}
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={errors.email}
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            error={errors.password} // Pass error here if your Input supports displaying it below
          />
          <button
            type="button"
            className="absolute right-3 top-[38px] text-sm text-blue-600 hover:underline"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {/* Password error (if Input doesn't display it inline) */}
        {errors.password && (
          <div className="text-red-500 text-sm mt-1 absolute right-3 top-[70px]">
            {errors.password}
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
