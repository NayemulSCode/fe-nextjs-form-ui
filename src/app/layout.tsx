import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forms App - React Hook Form & Zod",
  description: "Advanced forms with React Hook Form and Zod validation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Forms App</h1>
              </div>
              <div className="flex items-center space-x-8">
                <a href="/login" className="text-gray-700 hover:text-blue-600">
                  Login
                </a>
                <a
                  href="/register"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Register
                </a>
                <a
                  href="/product"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Add Product
                </a>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen bg-gray-50 py-8">
          {children} 
          <Toaster />
        </main>
      </body>
    </html>
  );
}
