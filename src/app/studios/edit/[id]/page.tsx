"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit3 } from "lucide-react";
import toast from "react-hot-toast";

export default function EditStudio() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "Neon Vault 4K Cinema Soundstage",
    category: "Film Stage",
    hourlyRate: "135",
    location: "Downtown Los Angeles, CA",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Studio updated successfully via PUT/PATCH simulation!");
    router.push("/my-listings");
  };

  return (
    <main className="min-h-[80vh] bg-base-100 py-10 px-4 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-8">
          <Edit3 className="w-8 h-8 text-warning" />
          Update Workspace
        </h1>

        <form onSubmit={handleSubmit} className="bg-base-200 p-6 md:p-8 rounded-2xl border border-base-300 space-y-6">
          <div className="form-control w-full">
            <label className="label"><span className="label-text text-gray-400">Host (Read-only)</span></label>
            <input type="text" value="Alex Rivera" readOnly className="input input-bordered bg-base-300 text-gray-500 cursor-not-allowed" />
          </div>

          <div className="form-control w-full">
            <label className="label"><span className="label-text font-medium text-white">Title</span></label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="input input-bordered bg-base-300" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium text-white">Hourly Rate ($)</span></label>
              <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleInputChange} className="input input-bordered bg-base-300" required />
            </div>
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-medium text-white">Location</span></label>
              <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="input input-bordered bg-base-300" required />
            </div>
          </div>

          <button type="submit" className="btn btn-warning w-full mt-4">Save Changes</button>
        </form>
      </div>
    </main>
  );
}