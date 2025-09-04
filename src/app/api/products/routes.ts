// app/api/products/route.ts
import { NextResponse } from "next/server";
import { productSchema } from "@/lib/product-zod-schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedData = productSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsedData.error.errors },
        { status: 400 }
      );
    }

    // Example: Save to database (replace with your database logic)
    // const newProduct = await saveToDatabase(parsedData.data);

    return NextResponse.json({ message: "Product added successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}