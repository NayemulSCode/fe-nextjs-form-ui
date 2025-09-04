import ProductForm from "@/components/forms/ProductForm";

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <p className="text-gray-600 mt-2">
          Add a new product to your inventory
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
