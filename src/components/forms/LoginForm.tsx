"use client";

import { LoginFormData, loginSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import React from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login data:", data);
    alert("Login successful!");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* uncontrolled */}

        {/* <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        /> */}

        {/* ✅ Controlled input (using Controller) */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={field.value || ""} // React state দিয়ে control হচ্ছে
              onChange={field.onChange} // React state আপডেট করছে
              error={errors.email?.message}
            />
          )}
        />
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-3 top-[38px] text-sm text-blue-600 hover:underline"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="absolute right-3 top-[38px] text-sm text-blue-600 hover:underline">
          {errors.password?.message}
        </div>

        <Button type="submit" className="w-full" loading={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
