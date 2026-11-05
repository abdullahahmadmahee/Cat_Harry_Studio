"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Loader2 } from "lucide-react";
import axios from "axios";
import EmptyState from "@/components/shared/EmptyState";
import toast from "react-hot-toast";

export default function Wishlist() {
  const [wishlistStudios, setWishlistStudios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const savedIds = JSON.parse(localStorage.getItem("wishlist") || "[]");
        
        if (savedIds.length === 0) {
          setWishlistStudios([]);
          setIsLoading(false);
          return;
        }

        const promises = savedIds.map((id: string) => 
          axios.get(`https://cat-harry-studio-backend.vercel.app/api/studios/${id}`)
        );
        
        const responses = await Promise.all(promises);
        setWishlistStudios(responses.map(res => res.data).filter(data => data !== null));
      } catch (error) {
        toast.error("Failed to load wishlist items.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex justify-center items-center bg-base-100">
        <Loader2 className="w-12 h-12 animate-spin text-warning" />
      </div>
    );
  }

  return (
    <main className="min-h-[80vh] bg-base-100 py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">My Saved Workspaces</h1>

        {wishlistStudios.length === 0 ? (
          <EmptyState 
            title="Wishlist is Empty" 
            subtitle="You haven't saved any production spaces yet. Explore the marketplace to find your next stage."
            buttonText="Explore Studios"
            buttonLink="/studios"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistStudios.map(studio => (
              <div key={studio._id} className="card bg-base-200 shadow-xl border border-base-300 hover:border-warning/50 transition-colors">
                <figure className="h-48 relative">
                  <img src={studio.image} alt={studio.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <span className="badge badge-warning text-[#1B1B1B] font-medium">{studio.category}</span>
                  </div>
                </figure>
                <div className="card-body p-5">
                  <h2 className="card-title text-lg text-white line-clamp-1">{studio.title}</h2>
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                    <MapPin className="w-4 h-4 text-warning" />
                    <span className="truncate">{studio.location}</span>
                  </div>
                  <p className="text-xl font-bold text-white mt-2">${studio.hourlyRate}/hr</p>
                  
                  <div className="card-actions justify-end mt-4 pt-4 border-t border-base-300">
                    <Link href={`/studios/${studio._id}`} className="btn btn-warning text-[#1B1B1B] font-bold w-full">
                      View Details
                    </Link>
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