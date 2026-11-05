"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Aperture, Sun, Moon, Menu } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function NavbarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState("dark");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://cat-harry-studio-backend.vercel.app/api/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const navLinks = (
    <>
      <li>
        <Link href="/" className={pathname === "/" ? "text-warning font-semibold" : ""}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/studios" className={pathname === "/studios" ? "text-warning font-semibold" : ""}>
          Explore Studios
        </Link>
      </li>
      <li>
        <Link href="/#how-it-works">How It Works</Link>
      </li>
      <li>
        <Link href="/#about-us">About Us</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100/90 sticky top-0 z-50 backdrop-blur border-b border-base-300 px-4 lg:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Menu className="w-5 h-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
          >
            {navLinks}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl flex gap-2 items-center">
          <Aperture className="w-8 h-8 text-warning" />
          <span className="font-bold tracking-wider hidden sm:block">StudioSpace</span>
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks}
        </ul>
      </div>
      
      <div className="navbar-end flex gap-4">
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-warning/50 flex items-center justify-center bg-base-300 text-warning font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-56 border border-base-300">
              <li className="menu-title px-4 py-2 text-warning font-bold border-b border-base-300 mb-2 truncate">
                {user?.name}
              </li>
              <li>
                <Link href="/dashboard" className={pathname === "/dashboard" ? "active bg-base-300" : ""}>Dashboard</Link>
              </li>
              <li>
                <Link href="/add-studio" className={pathname === "/add-studio" ? "active bg-base-300" : ""}>Add New Studio</Link>
              </li>
              <li>
                <Link href="/my-listings" className={pathname === "/my-listings" ? "active bg-base-300" : ""}>My Studio Listings</Link>
              </li>
              <li>
                <Link href="/my-bookings" className={pathname === "/my-bookings" ? "active bg-base-300" : ""}>My Bookings</Link>
              </li>
              <li>
                <Link href="/wishlist" className={pathname === "/wishlist" ? "active bg-base-300" : ""}>My Wishlist</Link>
              </li>
              <li className="mt-2 border-t border-base-300 pt-2">
                <button onClick={handleLogout} className="text-error hover:bg-error/10">Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="hidden sm:flex gap-2">
            <Link href="/login" className="btn btn-ghost">Login</Link>
            <Link href="/register" className="btn btn-warning font-bold text-[#1B1B1B]">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 bg-base-100 border-b border-base-300"></div>}>
      <NavbarContent />
    </Suspense>
  );
}