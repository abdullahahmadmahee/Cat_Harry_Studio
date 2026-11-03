"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Aperture } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://cat-harry-studio-backend.vercel.app/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("Welcome back to StudioSpace!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center bg-base-100 px-4 py-12">
      <div className="card w-full max-w-md bg-base-200 shadow-2xl border border-base-300">
        <div className="card-body px-8 py-10">
          <div className="flex flex-col items-center mb-8">
            <Aperture className="w-12 h-12 text-warning mb-2" />
            <h1 className="text-3xl font-bold text-white tracking-wide">Welcome Back</h1>
            <p className="text-gray-400 text-sm mt-2">Log in to your StudioSpace account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-300">Email Address</span>
              </label>
              <input
                type="email"
                placeholder="director@studiospace.com"
                className="input input-bordered w-full bg-base-300 focus:border-warning"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-300">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full bg-base-300 focus:border-warning"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-warning w-full mt-2 text-black font-bold">
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-8">
            Don't have a StudioSpace account?{" "}
            <Link href="/register" className="text-warning font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}