"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Search, Filter, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import EmptyState from "@/components/shared/EmptyState";

interface StudioData {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  image: string;
  hostName: string;
  hostEmail: string;
}

export default function ExploreStudios() {
  const [studios, setStudios] = useState<StudioData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudios = async (searchQuery = "") => {
    try {
      setIsLoading(true);
      const url = searchQuery 
        ? `https://cat-harry-studio-backend.vercel.app/api/studios?search=${encodeURIComponent(searchQuery)}`
        : "https://cat-harry-studio-backend.vercel.app/api/studios";
      
      const response = await axios.get(url);
      setStudios(response.data);
    } catch (error) {
      console.error("Failed to fetch studios", error);
      toast.error("Failed to load studios from the server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudios();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStudios(searchTerm);
  };

  return (
    <main className="min-h-screen bg-base-100 py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">Explore Creative Studios</h1>
            <p className="text-gray-400 mt-2">Discover premium production spaces curated by creators worldwide.</p>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:w-auto">
            <div className="join w-full md:w-80">
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="input input-bordered join-item w-full bg-base-200" 
                placeholder="Search studios..." 
              />
              <button type="submit" className="btn btn-warning join-item"><Search className="w-5 h-5 text-[#1B1B1B]" /></button>
            </div>
          </form>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64 w-full">
            <Loader2 className="w-12 h-12 animate-spin text-warning" />
          </div>
        ) : studios.length === 0 ? (
          <EmptyState 
            title="No Studios Available" 
            subtitle="There are currently no creative workspaces matching your criteria."
            buttonText="Host Your Studio"
            buttonLink="/add-studio"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {studios.map((studio) => (
              <div key={studio._id} className="card bg-base-200 shadow-xl border border-base-300 hover:border-warning transition-all duration-300 flex flex-col h-full group">
                <figure className="relative h-60 w-full overflow-hidden">
                  <img 
                    src={studio.image} 
                    alt={studio.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop"; }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-warning font-semibold border-none px-3 py-3 text-[#1B1B1B]">
                      {studio.category}
                    </span>
                  </div>
                </figure>
                
                <div className="card-body p-6 flex flex-col flex-grow">
                  <h2 className="card-title text-xl text-white line-clamp-1">{studio.title}</h2>
                  
                  <div className="flex items-center gap-2 text-gray-400 text-sm mt-1 mb-2">
                    <MapPin className="w-4 h-4 text-warning" />
                    <span className="truncate">{studio.location}</span>
                  </div>

                  <p className="text-xs text-gray-500 mb-4">Host: {studio.hostName || "Community Creator"}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-base-300">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-white">${Number(studio.hourlyRate || 0).toFixed(2)}<span className="text-sm font-normal text-gray-500">/hr</span></span>
                    </div>
                    
                    <div className="card-actions">
                      <Link href={`/studios/${studio._id}`} className="btn btn-warning px-6 font-bold text-[#1B1B1B]">
                        View Details
                      </Link>
                    </div>
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