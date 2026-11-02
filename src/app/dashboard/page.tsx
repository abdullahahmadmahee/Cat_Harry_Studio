"use client";

import { BarChart3, Building2, CalendarCheck, Wallet, Search } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const stats = [
    { id: 1, title: "Total Bookings", value: "12", icon: <CalendarCheck className="w-6 h-6 text-warning" /> },
    { id: 2, title: "Active Listings", value: "3", icon: <Building2 className="w-6 h-6 text-warning" /> },
    { id: 3, title: "Total Earnings", value: "$4,250", icon: <Wallet className="w-6 h-6 text-warning" /> },
    { id: 4, title: "Profile Views", value: "840", icon: <BarChart3 className="w-6 h-6 text-warning" /> },
  ];

  return (
    <main className="min-h-[80vh] bg-base-100 py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Creator Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back, Alex. Here is your platform overview.</p>
          </div>
          <Link href="/add-studio" className="btn btn-warning font-bold">
            + Add New Studio
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div key={stat.id} className="card bg-base-200 border border-base-300 shadow-xl hover:-translate-y-1 transition-transform duration-300">
              <div className="card-body p-6 flex flex-row items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className="w-14 h-14 rounded-full bg-base-300 flex items-center justify-center">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card bg-base-200 border border-base-300 shadow-xl">
            <div className="card-body p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="card-title text-xl text-white">Recent Bookings</h2>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between p-4 bg-base-300 rounded-xl border border-base-100">
                  <div>
                    <p className="font-bold text-white">Neon Vault 4K Cinema</p>
                    <p className="text-sm text-gray-400 mt-1">Nov 15, 2026 • 10:00 AM</p>
                  </div>
                  <span className="badge badge-warning font-semibold">Pending</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-base-300 rounded-xl border border-base-100">
                  <div>
                    <p className="font-bold text-white">The Prism Cyc Studio</p>
                    <p className="text-sm text-gray-400 mt-1">Oct 20, 2026 • 01:00 PM</p>
                  </div>
                  <span className="badge badge-success font-semibold text-[#1B1B1B]">Confirmed</span>
                </div>
              </div>
              <Link href="/my-bookings" className="btn btn-outline btn-warning w-full mt-6">View All Bookings</Link>
            </div>
          </div>

          <div className="card bg-base-200 border border-base-300 shadow-xl">
            <div className="card-body p-6 md:p-8">
              <h2 className="card-title text-xl text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4 h-full">
                <Link href="/my-listings" className="btn bg-base-300 hover:bg-warning hover:text-[#1B1B1B] border-none h-32 flex flex-col gap-3 group">
                  <Building2 className="w-8 h-8 text-gray-400 group-hover:text-[#1B1B1B] transition-colors" />
                  <span className="font-bold">Manage Listings</span>
                </Link>
                <Link href="/studios" className="btn bg-base-300 hover:bg-warning hover:text-[#1B1B1B] border-none h-32 flex flex-col gap-3 group">
                  <Search className="w-8 h-8 text-gray-400 group-hover:text-[#1B1B1B] transition-colors" />
                  <span className="font-bold">Explore Spaces</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}