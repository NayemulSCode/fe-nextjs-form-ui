// lib/product-zod-schema.ts
import { z } from "zod";

export const productSchema = z.object({
  productName: z.string().min(3, {
    message: "Product name must be at least 3 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  description: z.string().max(200, {
    message: "Description must be less than 200 characters.",
  }).optional(),
});

export type ProductFormData = z.infer<typeof productSchema>;