"use client";

import { useState } from "react";
import { CalendarDays, Clock, MapPin, Download } from "lucide-react";
import toast from "react-hot-toast";
import EmptyState from "@/components/shared/EmptyState";

export default function MyBookings() {
  const [bookings, setBookings] = useState([
    {
      _id: "b1",
      studioTitle: "Neon Vault 4K Cinema Soundstage",
      location: "Downtown Los Angeles, CA",
      date: "2026-11-15",
      time: "10:00 AM - 02:00 PM",
      totalPrice: 540,
      status: "Pending",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=400&auto=format&fit=crop"
    },
    {
      _id: "b2",
      studioTitle: "The Prism Cyc & Photo Studio",
      location: "Brooklyn, NY",
      date: "2026-10-20",
      time: "01:00 PM - 05:00 PM",
      totalPrice: 380,
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=400&auto=format&fit=crop"
    }
  ]);

  const handleCancel = (id: string) => {
    setBookings(bookings.map(b => b._id === id ? { ...b, status: "Cancelled" } : b));
    toast.success("Booking cancelled successfully.");
  };

  const getStatusColor = (status: string) => {
    if (status === "Pending") return "badge-warning";
    if (status === "Confirmed") return "badge-success";
    if (status === "Completed") return "badge-info";
    return "badge-error";
  };

  return (
    <main className="min-h-[80vh] bg-base-100 py-10 px-4 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <EmptyState 
            title="No Bookings Found" 
            subtitle="You haven't reserved any workspaces yet."
            buttonText="Explore Studios"
            buttonLink="/studios"
          />
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking._id} className="card md:card-side bg-base-200 border border-base-300 shadow-xl overflow-hidden">
                <figure className="md:w-64 shrink-0">
                  <img src={booking.image} alt={booking.studioTitle} className="w-full h-full object-cover" />
                </figure>
                <div className="card-body p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="card-title text-xl text-white">{booking.studioTitle}</h2>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                        <MapPin className="w-4 h-4" /> {booking.location}
                      </div>
                    </div>
                    <span className={`badge ${getStatusColor(booking.status)} p-3 font-semibold uppercase text-xs`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <CalendarDays className="w-5 h-5 text-warning" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock className="w-5 h-5 text-warning" />
                      <span>{booking.time}</span>
                    </div>
                    <div className="text-lg font-bold text-white sm:ml-auto border-t sm:border-t-0 sm:border-l border-base-300 pt-2 sm:pt-0 sm:pl-4">
                      Total: ${booking.totalPrice}
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4 pt-4 border-t border-base-300">
                    {booking.status === "Confirmed" && (
                      <button className="btn btn-sm btn-outline btn-info gap-2">
                        <Download className="w-4 h-4" /> Download PDF Invoice
                      </button>
                    )}
                    {booking.status === "Pending" && (
                      <button onClick={() => handleCancel(booking._id)} className="btn btn-sm btn-outline btn-error">
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}