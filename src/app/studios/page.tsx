"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Star, Heart, Search, Filter } from "lucide-react";
import toast from "react-hot-toast";

export default function ExploreStudios() {
  const [studios, setStudios] = useState([
    {
      _id: "1",
      title: "Neon Vault 4K Cinema Soundstage",
      category: "Film Stage",
      hourlyRate: 135,
      rating: 4.9,
      location: "Downtown Los Angeles, CA",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
      isSaved: false
    },
    {
      _id: "2",
      title: "The Prism Cyc & Photo Studio",
      category: "Photo Studio",
      hourlyRate: 95,
      rating: 4.8,
      location: "Brooklyn, NY",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800&auto=format&fit=crop",
      isSaved: true
    },
    {
      _id: "3",
      title: "Velvet Echo Analog Recording",
      category: "Music Suite",
      hourlyRate: 110,
      rating: 5.0,
      location: "Nashville, TN",
      image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=800&auto=format&fit=crop",
      isSaved: false
    },
    {
      _id: "4",
      title: "Skyline Horizon Rooftop Production",
      category: "Film Stage",
      hourlyRate: 150,
      rating: 4.7,
      location: "Chicago, IL",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop",
      isSaved: false
    },
    {
      _id: "5",
      title: "Apex Dolby Atmos Podcast Lounge",
      category: "Podcast Lounge",
      hourlyRate: 85,
      rating: 4.9,
      location: "Austin, TX",
      image: "https://images.unsplash.com/photo-1581368135153-a506cf13b1e1?q=80&w=800&auto=format&fit=crop",
      isSaved: true
    },
    {
      _id: "6",
      title: "Obsidian Blackbox Workshop",
      category: "Workshop",
      hourlyRate: 75,
      rating: 4.6,
      location: "Atlanta, GA",
      image: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop",
      isSaved: false
    }
  ]);

  const toggleSave = (id: string) => {
    setStudios(studios.map(studio => {
      if (studio._id === id) {
        const newSavedState = !studio.isSaved;
        if (newSavedState) toast.success("Added to your wishlist!");
        else toast.success("Removed from your wishlist!");
        return { ...studio, isSaved: newSavedState };
      }
      return studio;
    }));
  };

  return (
    <main className="min-h-screen bg-base-100 py-10 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">Explore Creative Studios</h1>
            <p className="text-gray-400 mt-2">Discover premium production spaces curated for your next masterpiece.</p>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <div className="join w-full md:w-80">
              <input className="input input-bordered join-item w-full bg-base-200" placeholder="Search studios..." />
              <button className="btn btn-warning join-item"><Search className="w-5 h-5" /></button>
            </div>
            <button className="btn btn-outline btn-square border-base-300 text-gray-300">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {studios.map((studio) => (
            <div key={studio._id} className="card bg-base-200 shadow-xl border border-base-300 hover:border-warning transition-all duration-300 flex flex-col h-full group">
              <figure className="relative h-60 w-full overflow-hidden">
                <img 
                  src={studio.image} 
                  alt={studio.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-warning font-semibold border-none px-3 py-3">
                    {studio.category}
                  </span>
                </div>
                <button 
                  onClick={() => toggleSave(studio._id)}
                  className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-100/50 hover:bg-base-100 border-none backdrop-blur-sm"
                >
                  <Heart className={`w-4 h-4 ${studio.isSaved ? "fill-error text-error" : "text-white"}`} />
                </button>
              </figure>
              
              <div className="card-body p-6 flex flex-col flex-grow">
                <h2 className="card-title text-xl text-white line-clamp-1">{studio.title}</h2>
                
                <div className="flex items-center gap-2 text-gray-400 text-sm mt-1 mb-4">
                  <MapPin className="w-4 h-4 text-warning" />
                  <span className="truncate">{studio.location}</span>
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-base-300">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">${studio.hourlyRate}<span className="text-sm font-normal text-gray-500">/hr</span></span>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-warning text-warning" />
                      <span className="text-sm font-medium text-gray-300">{studio.rating} Rating</span>
                    </div>
                  </div>
                  
                  <div className="card-actions">
                    <Link href={`/studios/${studio._id}`} className="btn btn-warning px-6 font-bold">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </main>
  );
}