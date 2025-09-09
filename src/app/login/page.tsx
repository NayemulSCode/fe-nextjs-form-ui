import LoginForm from "@/components/forms/LoginForm";
// import { CardDemo } from "@/components/forms/LoginFormWithShadcn";

// import LoginForm from "@/components/forms/VanillaLoginForm";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Please sign in to your account</p>
      </div>
      {/* <LoginForm /> */}
      <LoginForm />
      {/* <CardDemo /> */}
    </div>
  );
}
