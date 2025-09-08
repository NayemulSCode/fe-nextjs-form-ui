"use client";

import { Button } from "@/components/ui/button";
import { RegisterFormData, registerSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { useState, useRef } from "react";
import Image from "next/image";

const categories = [
  { value: "engineer", label: "Engineer" },
  { value: "driver", label: "Driver" },
  { value: "defence", label: "Defence" },
];

const subcategories: Record<string, { value: string; label: string }[]> = {
  engineer: [
    { value: "software", label: "Software Engineer" },
    { value: "data", label: "Data Engineer" },
    { value: "devops", label: "DevOps Engineer" },
  ],
  driver: [
    { value: "personal", label: "Personal Driver" },
    { value: "commercial", label: "Commercial Driver" },
  ],
  defence: [
    { value: "military", label: "Military" },
    { value: "security", label: "Security" },
    { value: "law-enforcement", label: "Law Enforcement" },
  ],
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const watchCategory = watch("category");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryValue = e.target.value;
    setValue("category", categoryValue);
    setValue("subcategory", ""); // Reset subcategory

    // Trigger validation for category field
    await trigger("category");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }

      setValue("profileImage", file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setValue("profileImage", undefined);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Registration data:", data);
    alert("Registration successful!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Profile Image Section */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Profile Image</h3>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile preview"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <svg
                    className="w-8 h-8 text-gray-400 mx-auto mb-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span className="text-xs text-gray-500">Photo</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profileImage"
              />
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm"
                >
                  Choose Image
                </Button>
                {imagePreview && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={removeImage}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Upload a profile image (max 5MB, JPG, PNG, GIF)
              </p>
              {errors.profileImage && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.profileImage.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="Enter your first name"
                {...register("firstName")}
                error={errors.firstName?.message}
              />

              <Input
                label="Last Name"
                placeholder="Enter your last name"
                {...register("lastName")}
                error={errors.lastName?.message}
              />
            </div>

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email?.message}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                {...register("phone")}
                error={errors.phone?.message}
              />

              <Input
                label="Date of Birth"
                type="date"
                {...register("dateOfBirth")}
                error={errors.dateOfBirth?.message}
              />
            </div>

            {/* Optional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Address (Optional)"
                placeholder="Enter your address"
                {...register("address")}
                error={errors.address?.message}
              />

              <Input
                label="City (Optional)"
                placeholder="Enter your city"
                {...register("city")}
                error={errors.city?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Emergency Contact Name (Optional)"
                placeholder="Enter emergency contact name"
                {...register("emergencyContactName")}
                error={errors.emergencyContactName?.message}
              />

              <Input
                label="Emergency Contact Phone (Optional)"
                placeholder="Enter emergency contact phone"
                {...register("emergencyContactPhone")}
                error={errors.emergencyContactPhone?.message}
              />
            </div>
          </div>
        </div>

        {/* Category & Classification */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">
            Category & Classification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              options={categories}
              value={watchCategory || ""}
              onChange={handleCategoryChange}
              error={errors.category?.message}
            />

            <Select
              label="Subcategory"
              options={watchCategory ? subcategories[watchCategory] || [] : []}
              {...register("subcategory")}
              error={errors.subcategory?.message}
              disabled={!watchCategory}
            />
          </div>
        </div>

        {/* Security */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Security</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password?.message}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            {...register("terms")}
          />
          <label className="ml-2 block text-sm text-gray-900">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500">
              Terms and Conditions
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-sm text-red-600">{errors.terms.message}</p>
        )}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </div>
  );
}
