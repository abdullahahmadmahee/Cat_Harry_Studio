import { Aperture } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-base-100">
      <Aperture className="w-16 h-16 text-warning animate-spin mb-4" />
      <h2 className="text-xl font-semibold text-gray-300 animate-pulse">
        Loading StudioSpace...
      </h2>
    </div>
  );
}