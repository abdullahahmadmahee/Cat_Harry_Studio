"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, MapPin, Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import EmptyState from "@/components/shared/EmptyState";

export default function MyBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`https://cat-harry-studio-backend.vercel.app/api/bookings/user/${parsedUser.email}`, {
          withCredentials: true
        });
        setBookings(response.data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
        toast.error("Failed to load your bookings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [router]);

  const handleCancel = async (id: string) => {
    try {
      await axios.patch(`https://cat-harry-studio-backend.vercel.app/api/bookings/${id}/cancel`, {}, {
        withCredentials: true
      });
      
      setBookings(bookings.map(b => b._id === id ? { ...b, status: "Cancelled" } : b));
      toast.success("Booking cancelled successfully.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to cancel booking.");
    }
  };

  const handleDownloadInvoice = async (booking: any) => {
    try {
      toast.success("Generating branded invoice...");
      const html2pdf = (await import("html2pdf.js")).default;
      const element = document.createElement("div");
      
      const todayDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      const orderId = booking._id.slice(-6).toUpperCase();
      const formattedPrice = Number(booking.totalPrice || 0).toFixed(2);

      element.innerHTML = `
        <div style="padding: 40px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1B1B1B; max-width: 800px; margin: 0 auto; background: #ffffff; border: 2px solid #EFBF04;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #1B1B1B; padding-bottom: 20px; margin-bottom: 30px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="background-color: #1B1B1B; padding: 10px; display: flex; align-items: center; justify-content: center;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EFBF04" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="14.31" y1="8" x2="20.05" y2="17.94"/><line x1="9.69" y1="8" x2="21.17" y2="8"/><line x1="7.38" y1="12" x2="13.12" y2="2.06"/><line x1="9.69" y1="16" x2="3.95" y2="6.06"/><line x1="14.31" y1="16" x2="2.83" y2="16"/><line x1="16.62" y1="12" x2="10.88" y2="21.94"/></svg>
              </div>
              <div>
                <h1 style="color: #1B1B1B; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 0.5px;">StudioSpace</h1>
                <p style="margin: 2px 0 0 0; color: #666; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Creative Production Network</p>
              </div>
            </div>
            <div style="background-color: #1B1B1B; color: #EFBF04; padding: 8px 24px; font-weight: bold; font-size: 13px; letter-spacing: 1.5px; border: 1px solid #EFBF04;">
              CONFIRMED
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 35px; background-color: #f9fafb; padding: 15px 20px; border-left: 4px solid #EFBF04;">
            <div>
              <p style="margin: 0; color: #1B1B1B; font-weight: bold; font-size: 13px;">INVOICE TO:</p>
              <p style="margin: 4px 0 2px 0; color: #333; font-size: 14px;"><strong>${user?.name || "Valued Creator"}</strong></p>
              <p style="margin: 0; color: #666; font-size: 12px;">${user?.email || ""}</p>
            </div>
            <div style="text-align: right;">
              <p style="margin: 0; color: #1B1B1B; font-size: 13px;"><strong>Order ID #:</strong> ${orderId}</p>
              <p style="margin: 4px 0 0 0; color: #666; font-size: 12px;"><strong>Booking Date:</strong> ${todayDate}</p>
            </div>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 13px;">
            <thead>
              <tr style="background-color: #1B1B1B; color: #ffffff; text-align: left;">
                <th style="padding: 12px 16px; font-weight: bold;">Workspace & Location</th>
                <th style="padding: 12px 16px; font-weight: bold; text-align: right;">Schedule</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background-color: #fff;">
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #1B1B1B;">
                  <strong style="font-size: 14px; color: #111;">${booking.studioId?.title || "Unknown Studio"}</strong><br/>
                  <span style="color: #555; font-size: 12px; margin-top: 4px; display: inline-block;">📍 ${booking.studioId?.location || "Unknown Location"}</span>
                </td>
                <td style="padding: 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563; text-align: right; vertical-align: top;">
                  📅 <strong>${booking.date}</strong><br/>
                  <span style="color: #555; font-size: 12px; margin-top: 4px; display: inline-block;">⏰ ${booking.startTime} - ${booking.endTime}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 13px;">
            <thead>
              <tr style="background-color: #f3f4f6; text-align: left;">
                <th style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #374151;">Description</th>
                <th style="padding: 10px 16px; border-bottom: 1px solid #e5e7eb; color: #374151; text-align: right;">Rate / Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 14px 16px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">Studio Hourly Rental & Equipment Access</td>
                <td style="padding: 14px 16px; border-bottom: 1px solid #e5e7eb; color: #111; text-align: right; font-weight: bold;">$${formattedPrice}</td>
              </tr>
            </tbody>
          </table>

          <div style="display: flex; justify-content: flex-end; font-size: 13px;">
            <div style="width: 260px; background-color: #f9fafb; padding: 10px; border: 1px solid #e5e7eb;">
              <div style="display: flex; justify-content: space-between; padding: 6px 12px; color: #4b5563;">
                <span>Subtotal:</span>
                <span>$${formattedPrice}</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 6px 12px; color: #4b5563;">
                <span>Discount:</span>
                <span>$0.00</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 10px 12px; font-weight: bold; font-size: 15px; color: #1B1B1B; border-top: 2px solid #EFBF04; margin-top: 6px; background-color: #fff;">
                <span>Total Paid:</span>
                <span style="color: #b45309;">$${formattedPrice}</span>
              </div>
            </div>
          </div>

          <div style="margin-top: 50px; border-top: 1px solid #e5e7eb; padding-top: 15px; text-align: center; color: #888; font-size: 11px;">
            <p style="margin: 2px 0;">StudioSpace HQ • Level-4, Creator Avenue 12, Los Angeles, CA 90028</p>
            <p style="margin: 2px 0;">Thank you for booking with StudioSpace. For support, contact support@studiospace.com</p>
          </div>
        </div>
      `;

      html2pdf().from(element).set({
        margin: 0,
        filename: `StudioSpace_Invoice_${orderId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      }).save();
      
    } catch (error) {
      toast.error("Failed to generate PDF invoice.");
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "Pending") return "badge-warning";
    if (status === "Confirmed") return "badge-success bg-[#1B1B1B] text-success border-success";
    if (status === "Completed") return "badge-info";
    return "badge-error";
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center bg-base-100">
        <Loader2 className="w-12 h-12 animate-spin text-warning" />
      </div>
    );
  }

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
                <figure className="md:w-64 shrink-0 h-48 md:h-auto">
                  <img 
                    src={booking.studioId?.image || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop"} 
                    alt="Studio" 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop"; }}
                  />
                </figure>
                <div className="card-body p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="card-title text-xl text-white line-clamp-1">{booking.studioId?.title || "Unknown Studio"}</h2>
                      <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                        <MapPin className="w-4 h-4" /> {booking.studioId?.location || "Unknown Location"}
                      </div>
                    </div>
                    <span className={`badge ${getStatusColor(booking.status)} p-3 font-semibold uppercase text-xs text-[#1B1B1B]`}>
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
                      <span>{booking.startTime} - {booking.endTime}</span>
                    </div>
                    <div className="text-lg font-bold text-white sm:ml-auto border-t sm:border-t-0 sm:border-l border-base-300 pt-2 sm:pt-0 sm:pl-4">
                      Total: ${Number(booking.totalPrice).toFixed(2)}
                    </div>
                  </div>

                  <div className="card-actions justify-end mt-4 pt-4 border-t border-base-300 gap-2">
                    {booking.status === "Confirmed" && (
                      <button onClick={() => handleDownloadInvoice(booking)} className="btn btn-sm btn-outline btn-info gap-2">
                        <Download className="w-4 h-4" /> Download PDF Invoice
                      </button>
                    )}
                    {booking.status !== "Cancelled" && (
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