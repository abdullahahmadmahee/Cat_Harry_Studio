import Link from "next/link";
import { Aperture } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Aperture className="w-8 h-8 text-warning" />
              <span className="font-bold text-2xl tracking-wider text-white">StudioSpace</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              StudioSpace is the premier peer-to-peer workspace sharing marketplace connecting filmmakers, photographers, and creators with world-class production facilities.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h6 className="font-bold uppercase tracking-wider text-sm text-white mb-2">Explore</h6> 
            <Link href="/studios" className="text-gray-400 hover:text-warning transition-colors duration-300">All Workspaces</Link>
            <Link href="/#how-it-works" className="text-gray-400 hover:text-warning transition-colors duration-300">How It Works</Link>
            <Link href="/#about-us" className="text-gray-400 hover:text-warning transition-colors duration-300">About Us</Link>
            <Link href="/register" className="text-gray-400 hover:text-warning transition-colors duration-300">Host Your Studio</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h6 className="font-bold uppercase tracking-wider text-sm text-white mb-2">Categories</h6> 
            <Link href="/studios?category=photo" className="text-gray-400 hover:text-warning transition-colors duration-300">Photo Studios</Link>
            <Link href="/studios?category=film" className="text-gray-400 hover:text-warning transition-colors duration-300">Cinema & Sound Stages</Link>
            <Link href="/studios?category=podcast" className="text-gray-400 hover:text-warning transition-colors duration-300">Podcast Lounges</Link>
            <Link href="/studios?category=music" className="text-gray-400 hover:text-warning transition-colors duration-300">Music & Audio Suites</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h6 className="font-bold uppercase tracking-wider text-sm text-white mb-2">Newsletter</h6> 
            <p className="text-sm text-gray-400 mb-2">Join our creator network for the latest updates.</p>
            <form className="flex w-full">
              <input type="email" placeholder="email@site.com" className="input input-bordered w-full rounded-r-none bg-base-100 focus:outline-none focus:border-warning" required /> 
              <button type="submit" className="btn btn-warning rounded-l-none font-bold">Subscribe</button>
            </form>
          </div>

        </div>
      </div>
      
      <div className="border-t border-base-300 bg-base-300/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 StudioSpace Platform. All rights reserved.</p>
          
          <div className="flex gap-6">
            <a href="#" aria-label="X" className="text-gray-400 hover:text-warning transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-warning transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-warning transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-warning transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M2.5 7.1C2.6 5.9 3.5 5 4.7 5h14.6c1.2 0 2.1.9 2.2 2.1.2 1.6.2 3.3.2 4.9s0 3.3-.2 4.9c-.1 1.2-1 2.1-2.2 2.1H4.7c-1.2 0-2.1-.9-2.2-2.1C2.3 15.3 2.3 13.6 2.3 12s0-3.3.2-4.9z"/><path d="m10 15 5-3-5-3v6z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}