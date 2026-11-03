"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Edit3, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

interface EditStudioProps {
  params: Promise<{ id: string }>;
}

export default function EditStudio({ params }: EditStudioProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(storedUser));

    const fetchStudio = async () => {
      try {
        const response = await axios.get(`https://cat-harry-studio-backend.vercel.app/api/studios/${resolvedParams.id}`);
        const studio = response.data;
        setFormData({
          title: studio.title,
          category: studio.category || "",
          hourlyRate: studio.hourlyRate,
          securityDeposit: studio.securityDeposit || "",
          capacity: studio.capacity || "",
          location: studio.location,
          overview: studio.overview || "",
          image: studio.image || "",
        });
        setSelectedAmenities(studio.amenities || []);
      } catch (error) {
        toast.error("Failed to load studio details.");
        router.push("/my-listings");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudio();
  }, [resolvedParams.id, router]);

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
    
    try {
      setIsSaving(true);
      await axios.put(
        `https://cat-harry-studio-backend.vercel.app/api/studios/${resolvedParams.id}`,
        {
          ...formData,
          hourlyRate: Number(formData.hourlyRate),
          securityDeposit: Number(formData.securityDeposit) || 0,
          capacity: Number(formData.capacity) || 1,
          amenities: selectedAmenities
        },
        { withCredentials: true }
      );
      
      toast.success("Workspace updated successfully!");
      router.push("/my-listings");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update workspace.");
    } finally {
      setIsSaving(false);
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3 mb-8">
          <Edit3 className="w-8 h-8 text-warning" />
          Update Workspace
        </h1>

        <form onSubmit={handleSubmit} className="bg-base-200 p-6 md:p-8 rounded-2xl border border-base-300 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-300/50 p-6 rounded-xl border border-base-300">
            <div className="form-control w-full">
              <label className="label"><span className="label-text text-gray-400">Host (Read-only)</span></label>
              <input type="text" value={user?.name || ""} readOnly className="input input-bordered w-full bg-base-300 text-gray-500 cursor-not-allowed" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium text-white">Workspace Title *</span></label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="input input-bordered w-full bg-base-300 focus:border-warning" required />
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
                <label className="label"><span className="label-text font-medium text-white">Location *</span></label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="input input-bordered w-full bg-base-300 focus:border-warning" required />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium text-white">Hourly Rate ($) *</span></label>
                <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleInputChange} className="input input-bordered w-full bg-base-300 focus:border-warning" required min="1" />
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium text-white">Security Deposit ($)</span></label>
                <input type="number" name="securityDeposit" value={formData.securityDeposit} onChange={handleInputChange} className="input input-bordered w-full bg-base-300 focus:border-warning" min="0" />
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium text-white">Max Capacity</span></label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} className="input input-bordered w-full bg-base-300 focus:border-warning" min="1" />
              </div>
            </div>
            
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-white">Update Image</span>
                <span className="label-text-alt text-gray-400">Upload a new image to replace the current one</span>
              </label>
              <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} className="file-input file-input-bordered w-full bg-base-300 focus:border-warning" />
              
              {formData.image && (
                <div className="mt-4 w-full h-48 rounded-xl overflow-hidden border border-base-300 relative bg-base-300">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop";
                    }}
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
              <textarea name="overview" value={formData.overview} onChange={handleInputChange} className="textarea textarea-bordered h-32 w-full bg-base-300 focus:border-warning"></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-base-300">
            <button type="submit" disabled={isSaving} className="btn btn-warning btn-lg w-full md:w-auto mt-6 text-[#1B1B1B] font-bold px-10">
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}