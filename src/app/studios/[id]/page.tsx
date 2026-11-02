"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MapPin, Star, Users, CheckCircle, Clock, ShieldCheck, Heart } from "lucide-react";
import toast from "react-hot-toast";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function StudioDetails() {
  const params = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const studio = {
    _id: params.id as string,
    title: "Neon Vault 4K Cinema Soundstage & Cyclorama",
    category: "Film Stage",
    hourlyRate: 135,
    rating: 4.9,
    reviews: 42,
    location: "Downtown Los Angeles, CA",
    capacity: 20,
    images: [
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=1200&auto=format&fit=crop"
    ],
    overview: "Massive 3,000 sq ft creative soundstage with 22-foot ceilings, automated RGB lighting grid, heavy rigging trusses, and a private green room. Perfect for music videos, commercials, and high-end interviews.",
    amenities: [
      "Cyclorama Wall", "Soundproof Visual Booth", "High-Speed Gigabit WiFi", 
      "DMX Lighting Grid", "Drive-In Loading Bay", "Makeup & Wardrobe Room"
    ],
    host: {
      name: "Alex Rivera",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) toast.success("Added to your wishlist!");
    else toast.success("Removed from your wishlist!");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBookingModal(false);
    toast.success("UI Ready! Booking reservation backend coming soon.");
  };

  return (
    <main className="min-h-screen bg-base-100 py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="badge badge-warning font-semibold">{studio.category}</span>
              <div className="flex items-center gap-1 text-gray-300 text-sm">
                <Star className="w-4 h-4 text-warning fill-warning" />
                <span className="font-bold">{studio.rating}</span>
                <span>({studio.reviews} reviews)</span>
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

        {/* Gallery Carousel */}
        <div className="w-full h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden mb-12 border border-base-300 relative group">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="w-full h-full"
          >
            {studio.images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Studio image ${index + 1}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-bold mb-4 border-b border-base-300 pb-2">Workspace Overview</h2>
              <p className="text-gray-300 leading-relaxed text-lg">{studio.overview}</p>
            </section>

            {/* Quick Stats */}
            <div className="flex gap-6 py-6 border-y border-base-300">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-sm text-gray-400">Max Capacity</p>
                  <p className="font-bold text-lg">{studio.capacity} People</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-warning" />
                <div>
                  <p className="text-sm text-gray-400">Minimum Booking</p>
                  <p className="font-bold text-lg">2 Hours</p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Equipment & Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {studio.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Host Section */}
            <section className="bg-base-200 p-6 rounded-xl border border-base-300 flex items-center gap-4">
              <img src={studio.host.avatar} alt={studio.host.name} className="w-16 h-16 rounded-full object-cover border-2 border-warning" />
              <div>
                <p className="text-sm text-gray-400">Hosted by</p>
                <p className="text-xl font-bold text-white">{studio.host.name}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-success font-medium">
                  <ShieldCheck className="w-4 h-4" /> Identity Verified
                </div>
              </div>
            </section>

          </div>

          {/* Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="card bg-base-200 shadow-2xl border border-base-300 sticky top-24">
              <div className="card-body p-6">
                <div className="flex items-end justify-between border-b border-base-300 pb-4 mb-4">
                  <div>
                    <span className="text-3xl font-bold text-white">${studio.hourlyRate}</span>
                    <span className="text-gray-400"> / hour</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <span className="font-bold text-sm">{studio.rating}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Security Deposit</span>
                    <span className="font-semibold">$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cancellation Policy</span>
                    <span className="text-info hover:underline cursor-pointer">Flexible</span>
                  </div>
                </div>

                <button 
                  onClick={() => setShowBookingModal(true)} 
                  className="btn btn-warning w-full btn-lg font-bold"
                >
                  Book Workspace Now
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">You won't be charged yet. Host approval may be required.</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="card w-full max-w-md bg-base-200 shadow-2xl border border-base-300">
            <div className="card-body">
              <h3 className="font-bold text-2xl mb-2">Reserve Workspace</h3>
              <p className="text-sm text-gray-400 mb-6">{studio.title}</p>
              
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">Select Date</span></label>
                  <input type="date" required className="input input-bordered w-full bg-base-300" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label"><span className="label-text">Start Time</span></label>
                    <input type="time" required className="input input-bordered w-full bg-base-300" />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text">End Time</span></label>
                    <input type="time" required className="input input-bordered w-full bg-base-300" />
                  </div>
                </div>
                
                <div className="form-control">
                  <label className="label"><span className="label-text">Special Requests (Optional)</span></label>
                  <textarea className="textarea textarea-bordered bg-base-300 h-24" placeholder="Lighting prep, green room access..."></textarea>
                </div>
                
                <div className="card-actions mt-6 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowBookingModal(false)} className="btn btn-ghost">Cancel</button>
                  <button type="submit" className="btn btn-warning">Confirm Reservation</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}