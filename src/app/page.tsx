
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          React Hook Form & Zod Demo
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          Explore three different form complexity levels with robust validation
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link
            href="/login"
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-green-600 text-4xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">Login Form</h3>
            <p className="text-gray-600">Easy level - Basic email and password validation</p>
          </Link>

          <Link
            href="/register"
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-blue-600 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Registration Form</h3>
            <p className="text-gray-600">Intermediate - Complex validation with password matching</p>
          </Link>

          <Link
            href="/product"
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="text-purple-600 text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Product Form</h3>
            <p className="text-gray-600">Advanced - Multi-section form with dynamic fields</p>
          </Link>
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Features Demonstrated</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="font-semibold text-gray-900">Form Libraries</h3>
              <ul className="text-gray-600 mt-2 space-y-1">
                <li>• React Hook Form</li>
                <li>• Zod Schema Validation</li>
                <li>• TypeScript Integration</li>
                <li>• Custom UI Components</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Advanced Features</h3>
              <ul className="text-gray-600 mt-2 space-y-1">
                <li>• Dynamic Field Arrays</li>
                <li>• Conditional Validation</li>
                <li>• Cross-field Validation</li>
                <li>• Real-time Validation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}