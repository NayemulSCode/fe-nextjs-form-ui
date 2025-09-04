import { z } from 'zod';

// Login Schema (Easy)
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export type LoginFormData = z.infer<typeof loginSchema>;


// Registration Schema (Intermediate)
export const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, 'Please enter a valid phone number'),
  dateOfBirth: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18;
  }, 'You must be at least 18 years old'),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms and conditions'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;


// Product Schema (Advanced)
export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  subcategory: z.string().min(1, 'Please select a subcategory'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  discountPrice: z.number().optional(),
  sku: z.string().min(3, 'SKU must be at least 3 characters'),
  brand: z.string().min(2, 'Brand must be at least 2 characters'),
  weight: z.number().min(0.01, 'Weight must be greater than 0'),
  dimensions: z.object({
    length: z.number().min(0.1, 'Length must be greater than 0'),
    width: z.number().min(0.1, 'Width must be greater than 0'),
    height: z.number().min(0.1, 'Height must be greater than 0'),
  }),
  inventory: z.object({
    quantity: z.number().min(0, 'Quantity cannot be negative'),
    threshold: z.number().min(1, 'Threshold must be at least 1'),
    trackInventory: z.boolean(),
  }),
  shipping: z.object({
    weight: z.number().min(0.01, 'Shipping weight must be greater than 0'),
    freeShipping: z.boolean(),
    shippingCost: z.number().min(0, 'Shipping cost cannot be negative'),
  }),
  seo: z.object({
    metaTitle: z.string().max(60, 'Meta title must be 60 characters or less'),
    metaDescription: z.string().max(160, 'Meta description must be 160 characters or less'),
    keywords: z.array(z.string()).max(10, 'Maximum 10 keywords allowed'),
  }),
  tags: z.array(z.string()).max(20, 'Maximum 20 tags allowed'),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
}).refine((data) => {
  if (data.discountPrice && data.discountPrice >= data.price) {
    return false;
  }
  return true;
}, {
  message: "Discount price must be less than regular price",
  path: ["discountPrice"],
}).refine((data) => {
  if (!data.shipping.freeShipping && data.shipping.shippingCost <= 0) {
    return false;
  }
  return true;
}, {
  message: "Shipping cost is required when free shipping is disabled",
  path: ["shipping.shippingCost"],
});

export type ProductFormData = z.infer<typeof productSchema>;