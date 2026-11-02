import Link from "next/link";
import { Clapperboard, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] bg-base-100 flex items-center justify-center px-4">
      <div className="text-center max-w-xl mx-auto flex flex-col items-center">
        <div className="relative mb-8">
          <Clapperboard className="w-32 h-32 text-base-300 animate-pulse" />
          <SearchX className="w-16 h-16 text-warning absolute -bottom-2 -right-2" />
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Cut! Scene Not Found.</h2>
        
        <p className="text-gray-400 mb-10 text-lg leading-relaxed">
          The studio space or page you are looking for has been wrapped, moved, or doesn't exist on our production schedule.
        </p>
        
        <Link href="/" className="btn btn-warning btn-lg gap-2 px-8">
          <Home className="w-5 h-5" />
          Return to Home
        </Link>
      </div>
    </main>
  );
}