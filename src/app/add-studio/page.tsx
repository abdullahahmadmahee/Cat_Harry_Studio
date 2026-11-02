"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, UploadCloud } from "lucide-react";
import toast from "react-hot-toast";

export default function AddStudio() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    capacity: "",
    location: "",
    overview: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.hourlyRate || !formData.location) {
      toast.error("Please fill in all required fields.");
      return;
    }

    toast.success("Studio published successfully! (UI Simulation)");
    router.push("/my-listings");
  };

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
              <input type="text" value="Alex Rivera" readOnly className="input input-bordered w-full bg-base-300 text-gray-500 cursor-not-allowed" />
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text text-gray-400">Host Email (Read-only)</span></label>
              <input type="email" value="alex.rivera@studiospace.io" readOnly className="input input-bordered w-full bg-base-300 text-gray-500 cursor-not-allowed" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Workspace Title *</span></label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g. Neon Vault 4K Cinema Soundstage" className="input input-bordered w-full bg-base-300 focus:border-warning" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Category *</span></label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="select select-bordered w-full bg-base-300 focus:border-warning" required>
                  <option value="" disabled>Select a category</option>
                  <option value="Photo Studio">Photo Studio</option>
                  <option value="Film Stage">Film Stage</option>
                  <option value="Podcast Lounge">Podcast Lounge</option>
                  <option value="Music Suite">Music Suite</option>
                  <option value="Art Workshop">Art Workshop</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Location / Address *</span></label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Downtown Los Angeles, CA" className="input input-bordered w-full bg-base-300 focus:border-warning" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Hourly Rate ($) *</span></label>
                <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleInputChange} placeholder="135" min="1" className="input input-bordered w-full bg-base-300 focus:border-warning" required />
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Security Deposit ($)</span></label>
                <input type="number" name="securityDeposit" value={formData.securityDeposit} onChange={handleInputChange} placeholder="150" min="0" className="input input-bordered w-full bg-base-300 focus:border-warning" />
              </div>
              <div className="form-control w-full">
                <label className="label"><span className="label-text font-medium">Max Capacity</span></label>
                <input type="number" name="capacity" value={formData.capacity} onChange={handleInputChange} placeholder="20" min="1" className="input input-bordered w-full bg-base-300 focus:border-warning" />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Workspace Image (Required)</span></label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-base-300 border-dashed rounded-xl cursor-pointer bg-base-300 hover:bg-base-300/80 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400"><span className="font-semibold text-warning">Click to upload</span> or drag and drop</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium">Amenities List</span></label>
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
              <label className="label"><span className="label-text font-medium">Detailed Overview</span></label>
              <textarea name="overview" value={formData.overview} onChange={handleInputChange} className="textarea textarea-bordered h-32 bg-base-300 focus:border-warning" placeholder="Describe your studio space, lighting setups, rules, and unique features..."></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-base-300">
            <button type="submit" className="btn btn-warning btn-lg font-bold px-10">
              Publish Workspace
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}