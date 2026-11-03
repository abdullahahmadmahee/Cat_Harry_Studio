"use client";

import { useState, useEffect } from "react";
import { BarChart3, Building2, CalendarCheck, Wallet, Search, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    activeListings: 0,
  });
  
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchDashboardData = async () => {
      try {
        const [listingsRes, bookingsRes] = await Promise.all([
          axios.get(`https://cat-harry-studio-backend.vercel.app/api/studios/host/${parsedUser.email}`, { withCredentials: true }),
          axios.get(`https://cat-harry-studio-backend.vercel.app/api/bookings/user/${parsedUser.email}`, { withCredentials: true })
        ]);

        setDashboardData({
          activeListings: listingsRes.data.length,
          totalBookings: bookingsRes.data.length,
        });

        setRecentBookings(bookingsRes.data.slice(0, 3));
      } catch (error) {
        toast.error("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center bg-base-100">
        <Loader2 className="w-12 h-12 animate-spin text-warning" />
      </div>
    );
  }

  const statCards = [
    { id: 1, title: "Total Bookings", value: dashboardData.totalBookings, icon: <CalendarCheck className="w-6 h-6 text-warning" /> },
    { id: 2, title: "Active Listings", value: dashboardData.activeListings, icon: <Building2 className="w-6 h-6 text-warning" /> },
    { id: 3, title: "Total Earnings", value: "$0", icon: <Wallet className="w-6 h-6 text-warning" /> },
    { id: 4, title: "Profile Views", value: "0", icon: <BarChart3 className="w-6 h-6 text-warning" /> },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Pending") return "badge-warning text-[#1B1B1B]";
    if (status === "Confirmed") return "badge-success bg-[#1B1B1B] text-success border-success";
    if (status === "Cancelled") return "badge-error";
    return "badge-info";
  };

  return (
    <main className="min-h-[80vh] bg-base-100 py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Creator Dashboard</h1>
            <p className="text-gray-400 mt-1">Welcome back, {user?.name.split(" ")[0] || "Creator"}. Here is your platform overview.</p>
          </div>
          <Link href="/add-studio" className="btn btn-warning font-bold text-[#1B1B1B]">
            + Add New Studio
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statCards.map((stat) => (
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
                {recentBookings.length === 0 ? (
                  <p className="text-gray-400 text-center py-6">No recent bookings found.</p>
                ) : (
                  recentBookings.map((booking) => (
                    <div key={booking._id} className="flex items-center justify-between p-4 bg-base-300 rounded-xl border border-base-100">
                      <div className="w-2/3">
                        <p className="font-bold text-white line-clamp-1">{booking.studioId?.title || "Unknown Workspace"}</p>
                        <p className="text-sm text-gray-400 mt-1">{booking.date} • {booking.startTime}</p>
                      </div>
                      <span className={`badge ${getStatusColor(booking.status)} font-semibold`}>{booking.status}</span>
                    </div>
                  ))
                )}
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