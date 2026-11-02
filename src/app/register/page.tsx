"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Aperture } from "lucide-react";
import toast from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (pass: string) => {
    if (pass.length < 6) return "Password must be at least 6 characters.";
    if (!/[A-Z]/.test(pass)) return "Password must have an uppercase letter.";
    if (!/[a-z]/.test(pass)) return "Password must have a lowercase letter.";
    return "";
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (!name || !email || !photoUrl || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      toast.error("Invalid password criteria.");
      return;
    }

    toast.success("UI Ready! Backend integration coming soon.");
    router.push("/login");
  };

  const handleGoogleRegister = () => {
    toast.success("Google UI Ready! Backend integration coming soon.");
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
                <span className="label-text font-medium text-gray-300">Photo URL</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="input input-bordered w-full bg-base-300 focus:border-warning"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
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

            <button type="submit" className="btn btn-warning w-full mt-4 text-black font-bold">
              Register
            </button>
          </form>

          <div className="divider text-gray-500 my-6">OR</div>

          <button 
            onClick={handleGoogleRegister}
            className="btn btn-outline w-full hover:bg-white hover:text-black text-gray-300 border-gray-500"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

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