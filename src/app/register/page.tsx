import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Join Us Today</h1>
        <p className="text-gray-600 mt-2">Create your account to get started</p>
      </div>
      <RegisterForm />
    </div>
  );
}
