"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Aperture } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (pass: string) => {
    if (pass.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(pass)) return "Password must have an uppercase letter.";
    if (!/[a-z]/.test(pass)) return "Password must have a lowercase letter.";
    return "";
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      toast.error("Invalid password criteria.");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(
        "https://cat-harry-studio-backend.vercel.app/api/auth/register",
        { name, email, password },
        { withCredentials: true }
      );
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center bg-base-100 px-4 py-12">
      <div className="card w-full max-w-lg bg-base-200 shadow-2xl border border-base-300">
        <div className="card-body px-8 py-10">
          <div className="flex flex-col items-center mb-6">
            <Aperture className="w-12 h-12 text-warning mb-2" />
            <h1 className="text-3xl font-bold text-white tracking-wide">Create Account</h1>
            <p className="text-gray-400 text-sm mt-2">Join the StudioSpace creator network</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-gray-300">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Christopher Nolan"
                className="input input-bordered w-full bg-base-300 focus:border-warning"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

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
                className={`input input-bordered w-full bg-base-300 focus:border-warning ${passwordError ? "border-error" : ""}`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
              />
              {passwordError && (
                <label className="label">
                  <span className="label-text-alt text-error font-medium">{passwordError}</span>
                </label>
              )}
            </div>

            <button type="submit" disabled={isLoading} className="btn btn-warning w-full mt-4 text-black font-bold">
              {isLoading ? "Creating Account..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-warning font-semibold hover:underline">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}