"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Star, Users, CheckCircle, Clock, ShieldCheck, Heart, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

interface StudioDetailsProps {
  params: Promise<{ id: string }>;
}

export default function StudioDetails({ params }: StudioDetailsProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [studio, setStudio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  const [bookingData, setBookingData] = useState({
    date: "",
    startTime: "",
    endTime: ""
  });
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchStudio = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/studios/${resolvedParams.id}`);
        setStudio(response.data);
      } catch (error) {
        toast.error("Failed to load studio details.");
        router.push("/studios");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudio();
  }, [resolvedParams.id, router]);

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) toast.success("Added to your wishlist!");
    else toast.success("Removed from your wishlist!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please log in to reserve a workspace.");
      router.push("/login");
      return;
    }

    const start = new Date(`1970-01-01T${bookingData.startTime}:00Z`).getTime();
    const end = new Date(`1970-01-01T${bookingData.endTime}:00Z`).getTime();
    const hours = (end - start) / (1000 * 60 * 60);

    if (hours <= 0) {
      toast.error("End time must be after start time.");
      return;
    }

    const totalPrice = hours * studio.hourlyRate;

    try {
      setIsBooking(true);
      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          studioId: studio._id,
          userEmail: user.email,
          date: bookingData.date,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          totalPrice
        },
        { withCredentials: true }
      );

      toast.success("Reservation confirmed!");
      setShowBookingModal(false);
      router.push("/my-bookings");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reserve workspace.");
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center bg-base-100">
        <Loader2 className="w-12 h-12 animate-spin text-warning" />
      </div>
    );
  }

  if (!studio) return null;

  return (
    <main className="min-h-screen bg-base-100 py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="badge badge-warning font-semibold text-[#1B1B1B]">{studio.category}</span>
              <div className="flex items-center gap-1 text-gray-300 text-sm">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="font-bold">5.0</span>
                <span>(New Listing)</span>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">{studio.title}</h1>
            <div className="flex items-center gap-2 text-gray-400 mt-2">
              <MapPin className="w-5 h-5 text-warning" />
              <span>{studio.location}</span>
            </div>
          </div>
          
          <button onClick={handleSave} className="btn btn-outline btn-sm gap-2">
            <Heart className={`w-4 h-4 ${isSaved ? "fill-error text-error" : ""}`} />
            {isSaved ? "Saved" : "Save Workspace"}
          </button>
        </div>

        <div className="w-full h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden mb-12 border border-base-300 relative">
          <img 
            src={studio.image} 
            alt={studio.title} 
            className="w-full h-full object-cover" 
            onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop"; }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-2xl font-bold mb-4 border-b border-base-300 pb-2 text-white">Workspace Overview</h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {studio.overview || "This host has not provided a detailed description yet, but the workspace meets StudioSpace's premium quality standards."}
              </p>
            </section>

            <div className="flex gap-6 py-6 border-y border-base-300">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-sm text-gray-400">Max Capacity</p>
                  <p className="font-bold text-lg text-white">{studio.capacity} People</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-sm text-gray-400">Minimum Booking</p>
                  <p className="font-bold text-lg text-white">1 Hour</p>
                </div>
              </div>
            </div>

            {studio.amenities && studio.amenities.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4 text-white">Equipment & Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {studio.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-warning" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-base-200 p-6 rounded-xl border border-base-300 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-base-300 flex items-center justify-center border-2 border-warning text-2xl font-bold text-warning">
                {studio.hostName?.charAt(0).toUpperCase() || "H"}
              </div>
              <div>
                <p className="text-sm text-gray-400">Hosted by</p>
                <p className="text-xl font-bold text-white">{studio.hostName}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-warning font-medium">
                  <ShieldCheck className="w-4 h-4" /> Identity Verified
                </div>
              </div>
            </section>

          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-200 shadow-2xl border border-base-300 sticky top-24">
              <div className="card-body p-6">
                <div className="flex items-end justify-between border-b border-base-300 pb-4 mb-4">
                  <div>
                    <span className="text-3xl font-bold text-white">${studio.hourlyRate}</span>
                    <span className="text-gray-400"> / hour</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Security Deposit</span>
                    <span className="font-semibold text-white">${studio.securityDeposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cancellation Policy</span>
                    <span className="text-warning hover:underline cursor-pointer">Flexible</span>
                  </div>
                </div>

                <button 
                  onClick={() => setShowBookingModal(true)} 
                  className="btn btn-warning w-full btn-lg font-bold text-[#1B1B1B]"
                >
                  Book Workspace Now
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">You won't be charged yet. Host approval may be required.</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="card w-full max-w-md bg-base-200 shadow-2xl border border-base-300">
            <div className="card-body">
              <h3 className="font-bold text-2xl mb-2 text-white">Reserve Workspace</h3>
              <p className="text-sm text-gray-400 mb-6">{studio.title}</p>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label"><span className="label-text text-white">Select Date</span></label>
                  <input type="date" name="date" value={bookingData.date} onChange={handleInputChange} required className="input input-bordered w-full bg-base-300 focus:border-warning" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text text-white">Start Time</span></label>
                    <input type="time" name="startTime" value={bookingData.startTime} onChange={handleInputChange} required className="input input-bordered w-full bg-base-300 focus:border-warning" />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text text-white">End Time</span></label>
                    <input type="time" name="endTime" value={bookingData.endTime} onChange={handleInputChange} required className="input input-bordered w-full bg-base-300 focus:border-warning" />
                  </div>
                </div>
                
                <div className="card-actions mt-6 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowBookingModal(false)} className="btn btn-ghost text-gray-400">Cancel</button>
                  <button type="submit" disabled={isBooking} className="btn btn-warning text-[#1B1B1B] font-bold">
                    {isBooking ? "Confirming..." : "Confirm Reservation"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}