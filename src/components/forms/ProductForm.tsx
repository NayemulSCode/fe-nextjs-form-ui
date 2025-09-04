"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormData } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
  { value: "home", label: "Home & Garden" },
];

const subcategories: Record<string, { value: string; label: string }[]> = {
  electronics: [
    { value: "smartphones", label: "Smartphones" },
    { value: "laptops", label: "Laptops" },
    { value: "headphones", label: "Headphones" },
  ],
  clothing: [
    { value: "mens", label: "Men's Clothing" },
    { value: "womens", label: "Women's Clothing" },
    { value: "kids", label: "Kids' Clothing" },
  ],
  books: [
    { value: "fiction", label: "Fiction" },
    { value: "nonfiction", label: "Non-Fiction" },
    { value: "textbooks", label: "Textbooks" },
  ],
  home: [
    { value: "furniture", label: "Furniture" },
    { value: "decor", label: "Home Decor" },
    { value: "garden", label: "Garden" },
  ],
};

export default function ProductForm() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      inventory: {
        quantity: 0,
        threshold: 1,
        trackInventory: true,
      },
      shipping: {
        weight: 0,
        freeShipping: false,
        shippingCost: 0,
      },
      seo: {
        metaTitle: "",
        metaDescription: "",
        keywords: [],
      },
      tags: [],
      isActive: true,
      isFeatured: false,
    },
  });

  const {
    fields: keywordFields,
    append: appendKeyword,
    remove: removeKeyword,
  } = useFieldArray({
    control,
    name: "seo.keywords",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const watchCategory = watch("category");
  const watchFreeShipping = watch("shipping.freeShipping");

  const onSubmit = async (data: ProductFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Product data:", data);
    alert("Product saved successfully!");
  };

  const addKeyword = () => {
    appendKeyword("");
  };

  const addTag = () => {
    appendTag("");
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-8">Add Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Product Name"
              placeholder="Enter product name"
              {...register("name")}
              error={errors.name?.message}
            />

            <Input
              label="SKU"
              placeholder="Enter product SKU"
              {...register("sku")}
              error={errors.sku?.message}
            />

            <Input
              label="Brand"
              placeholder="Enter brand name"
              {...register("brand")}
              error={errors.brand?.message}
            />

            <Input
              label="Weight (kg)"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("weight", { valueAsNumber: true })}
              error={errors.weight?.message}
            />
          </div>

          <div className="mt-4">
            <Textarea
              label="Description"
              placeholder="Enter product description"
              rows={4}
              {...register("description")}
              error={errors.description?.message}
            />
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
              {...register("category")}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setValue("subcategory", ""); // Reset subcategory when category changes
              }}
              error={errors.category?.message}
            />

            <Select
              label="Subcategory"
              options={watchCategory ? subcategories[watchCategory] || [] : []}
              {...register("subcategory")}
              error={errors.subcategory?.message}
            />
          </div>
        </div>

        {/* Pricing */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Price ($)"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("price", { valueAsNumber: true })}
              error={errors.price?.message}
            />

            <Input
              label="Discount Price ($)"
              type="number"
              step="0.01"
              placeholder="0.00 (optional)"
              {...register("discountPrice", { valueAsNumber: true })}
              error={errors.discountPrice?.message}
            />
          </div>
        </div>

        {/* Dimensions */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Dimensions (cm)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Length"
              type="number"
              step="0.1"
              placeholder="0.0"
              {...register("dimensions.length", { valueAsNumber: true })}
              error={errors.dimensions?.length?.message}
            />

            <Input
              label="Width"
              type="number"
              step="0.1"
              placeholder="0.0"
              {...register("dimensions.width", { valueAsNumber: true })}
              error={errors.dimensions?.width?.message}
            />

            <Input
              label="Height"
              type="number"
              step="0.1"
              placeholder="0.0"
              {...register("dimensions.height", { valueAsNumber: true })}
              error={errors.dimensions?.height?.message}
            />
          </div>
        </div>

        {/* Inventory */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Inventory Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Quantity in Stock"
              type="number"
              placeholder="0"
              {...register("inventory.quantity", { valueAsNumber: true })}
              error={errors.inventory?.quantity?.message}
            />

            <Input
              label="Low Stock Threshold"
              type="number"
              placeholder="1"
              {...register("inventory.threshold", { valueAsNumber: true })}
              error={errors.inventory?.threshold?.message}
            />
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                {...register("inventory.trackInventory")}
              />
              <span className="ml-2 text-sm text-gray-900">
                Track inventory levels
              </span>
            </label>
          </div>
        </div>

        {/* Shipping */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Shipping Weight (kg)"
              type="number"
              step="0.01"
              placeholder="0.00"
              {...register("shipping.weight", { valueAsNumber: true })}
              error={errors.shipping?.weight?.message}
            />

            {!watchFreeShipping && (
              <Input
                label="Shipping Cost ($)"
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("shipping.shippingCost", { valueAsNumber: true })}
                error={errors.shipping?.shippingCost?.message}
              />
            )}
          </div>

          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                {...register("shipping.freeShipping")}
              />
              <span className="ml-2 text-sm text-gray-900">Free shipping</span>
            </label>
          </div>
        </div>

        {/* SEO */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">SEO Information</h3>
          <div className="space-y-4">
            <Input
              label="Meta Title (max 60 characters)"
              placeholder="Enter meta title"
              maxLength={60}
              {...register("seo.metaTitle")}
              error={errors.seo?.metaTitle?.message}
            />

            <Textarea
              label="Meta Description (max 160 characters)"
              placeholder="Enter meta description"
              maxLength={160}
              rows={3}
              {...register("seo.metaDescription")}
              error={errors.seo?.metaDescription?.message}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Keywords
              </label>
              {keywordFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Enter keyword"
                    {...register(`seo.keywords.${index}` as const)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeKeyword(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addKeyword}
                disabled={keywordFields.length >= 10}
              >
                Add Keyword
              </Button>
              {errors.seo?.keywords?.message && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.seo.keywords.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div>
            {tagFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <Input
                  placeholder="Enter tag"
                  {...register(`tags.${index}` as const)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeTag(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addTag}
              disabled={tagFields.length >= 20}
            >
              Add Tag
            </Button>
            {errors.tags?.message && (
              <p className="text-sm text-red-600 mt-1">{errors.tags.message}</p>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-4">Product Status</h3>
          <div className="space-y-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                {...register("isActive")}
              />
              <span className="ml-2 text-sm text-gray-900">
                Product is active
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                {...register("isFeatured")}
              />
              <span className="ml-2 text-sm text-gray-900">
                Featured product
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit" className="flex-1" loading={isSubmitting}>
            {isSubmitting ? "Saving Product..." : "Save Product"}
          </Button>

          <Button type="button" variant="outline" className="flex-1">
            Save as Draft
          </Button>
        </div>
      </form>
    </div>
  );
}
