import ProductForm from "@/components/product/ProductForm";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Product Entry Form</h1>
      <ProductForm />
      <p className="mt-4">
        <Link href="/" className="text-sm text-blue-500 hover:underline">
          Go to registration form
        </Link>
      </p>
    </main>
  );
}
