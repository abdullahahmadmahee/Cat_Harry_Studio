"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Sun, Moon, Menu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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
        
        <div className="hidden sm:flex gap-2">
          <Link href="/login" className="btn btn-ghost">Login</Link>
          <Link href="/register" className="btn btn-warning">Register</Link>
        </div>
      </div>
    </div>
  );
}