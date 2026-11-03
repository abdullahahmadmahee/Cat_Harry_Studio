"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddStudio() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("Please login to list a workspace.");
      router.push("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    capacity: "",
    location: "",
    overview: "",
    image: "",
  });

  const amenitiesList = [
    "Cyclorama Wall",
    "Soundproof Booth",
    "DMX Lighting Grid",
    "Green Room",
    "Dolby Atmos Setup",
    "Drive-In Loading Bay"
  ];
  
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleCheckboxChange = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5242880) {
        toast.error("File is too large. Please select an image under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.hourlyRate || !formData.location || !formData.image) {
      toast.error("Please fill in all required fields and upload an image.");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(
        "http://localhost:5000/api/studios",
        {
          ...formData,
          hourlyRate: Number(formData.hourlyRate),
          securityDeposit: Number(formData.securityDeposit) || 0,
          capacity: Number(formData.capacity) || 1,
          amenities: selectedAmenities,
          hostName: user?.name,
          hostEmail: user?.email
        },
        { withCredentials: true }
      );
      
      toast.success("Workspace published successfully!");
      router.push("/studios");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to publish workspace.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-base-100 py-10 px-4 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <PlusCircle className="w-8 h-8 text-warning" />
            List a New Workspace
          </h1>
          <p className="text-gray-400 mt-2">Add your creative studio to the platform and start accepting bookings.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-base-200 p-6 md:p-8 rounded-2xl border border-base-300 shadow-xl space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-300/50 p-6 rounded-xl border border-base-300">
            <div className="form-control w-full">
              <label className="label"><span className="label-text text-gray-400">Host Name (Read-only)</span></label>
              <input type="text" value={user.name} readOnly className="input input-bordered w-full bg-base-300 text-gray-500 cursor-not-allowed" />
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text text-gray-400">Host Email (Read-only)</span></label>
              <input type="email" value={user.email} readOnly className="input input-bordered w-full bg-base-300 text-gray-500 cursor-not-allowed" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium text-white">Workspace Title *</span></label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Neon Vault 4K Cinema Soundstage" className="input input-bordered w-full bg-base-300 focus:border-warning" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium text-white">Category *</span></label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="select select-bordered w-full bg-base-300 focus:border-warning" required>
                  <option value="" disabled>Select a category</option>
                  <option value="Photo Studio">Photo Studio</option>
                  <option value="Film Stage">Film Stage</option>
                  <option value="Podcast Lounge">Podcast Lounge</option>
                  <option value="Music Suite">Music Suite</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium text-white">Location / Address *</span></label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Downtown Los Angeles, CA" className="input input-bordered w-full bg-base-300 focus:border-warning" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium text-white">Hourly Rate ($) *</span></label>
                <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleInputChange} placeholder="135" min="1" className="input input-bordered w-full bg-base-300 focus:border-warning" required />
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium text-white">Security Deposit ($)</span></label>
                <input type="number" name="securityDeposit" value={formData.securityDeposit} onChange={handleInputChange} placeholder="150" min="0" className="input input-bordered w-full bg-base-300 focus:border-warning" />
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium text-white">Max Capacity</span></label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} placeholder="20" min="1" className="input input-bordered w-full bg-base-300 focus:border-warning" />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-white">Workspace Image *</span>
                <span className="label-text-alt text-gray-400">Upload an image from your computer (Max 5MB)</span>
              </label>
              <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} className="file-input file-input-bordered w-full bg-base-300 focus:border-warning" required />
              
              {formData.image && (
                <div className="mt-4 w-full h-48 rounded-xl overflow-hidden border border-base-300 relative bg-base-300">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium text-white">Amenities List</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-base-300 rounded-xl border border-base-300">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="cursor-pointer label justify-start gap-3 p-1">
                    <input type="checkbox" className="checkbox checkbox-warning checkbox-sm" checked={selectedAmenities.includes(amenity)} onChange={() => handleCheckboxChange(amenity)} />
                    <span className="label-text">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium text-white">Detailed Overview</span></label>
              <textarea name="overview" value={formData.overview} onChange={handleInputChange} className="textarea textarea-bordered h-32 bg-base-300 focus:border-warning" placeholder="Describe your studio space, lighting setups, rules, and unique features..."></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-base-300">
            <button type="submit" disabled={isLoading} className="btn btn-warning btn-lg font-bold px-10 text-[#1B1B1B]">
              {isLoading ? "Publishing..." : "Publish Workspace"}
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}