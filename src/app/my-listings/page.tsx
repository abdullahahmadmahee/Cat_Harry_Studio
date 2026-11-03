"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Trash2, MapPin, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import EmptyState from "@/components/shared/EmptyState";

export default function MyListings() {
  const router = useRouter();
  const [listings, setListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    const fetchListings = async () => {
      try {
        const response = await axios.get(`https://cat-harry-studio-backend.vercel.app/api/studios/host/${parsedUser.email}`, {
          withCredentials: true
        });
        setListings(response.data);
      } catch (error) {
        console.error("Failed to fetch listings", error);
        toast.error("Failed to load your listings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [router]);

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`https://cat-harry-studio-backend.vercel.app/api/studios/${deleteId}`, {
        withCredentials: true
      });
      setListings(listings.filter(item => item._id !== deleteId));
      setDeleteId(null);
      toast.success("Workspace deleted successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete workspace.");
    }
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Studio Listings</h1>
          <Link href="/add-studio" className="btn btn-warning text-[#1B1B1B] font-bold">Add New</Link>
        </div>

        {listings.length === 0 ? (
          <EmptyState 
            title="No Studios Listed" 
            subtitle="You haven't listed any creative workspaces yet. Start hosting to earn!"
            buttonText="Add New Studio"
            buttonLink="/add-studio"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map(studio => (
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
                    <Link href={`/studios/edit/${studio._id}`} className="btn btn-sm btn-info text-white gap-2">
                      <Edit className="w-4 h-4" /> Update
                    </Link>
                    <button onClick={() => setDeleteId(studio._id)} className="btn btn-sm btn-error text-white gap-2">
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="card w-full max-w-sm bg-base-200 border border-base-300">
            <div className="card-body items-center text-center">
              <Trash2 className="w-12 h-12 text-error mb-2" />
              <h3 className="font-bold text-xl text-white">Delete Workspace?</h3>
              <p className="text-gray-400 text-sm">This action cannot be undone. Are you sure you want to permanently delete this listing?</p>
              <div className="card-actions w-full mt-4 flex gap-2">
                <button onClick={() => setDeleteId(null)} className="btn btn-ghost flex-1">Cancel</button>
                <button onClick={confirmDelete} className="btn btn-error text-white flex-1">Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}