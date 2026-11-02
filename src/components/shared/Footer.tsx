import Link from "next/link";
import { Aperture } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-auto">
      <div className="footer p-10 max-w-7xl mx-auto">
        <aside>
          <div className="flex items-center gap-2 mb-2">
            <Aperture className="w-8 h-8 text-warning" />
            <span className="font-bold text-xl tracking-wider">StudioSpace</span>
          </div>
          <p className="max-w-xs">
            StudioSpace is the premier peer-to-peer workspace sharing marketplace connecting filmmakers, photographers, and creators with world-class production facilities.
          </p>
        </aside> 
        
        <nav>
          <h6 className="footer-title">Explore</h6> 
          <Link href="/studios" className="link link-hover">All Workspaces</Link>
          <Link href="/#how-it-works" className="link link-hover">How It Works</Link>
          <Link href="/#about-us" className="link link-hover">About Us</Link>
          <Link href="/register" className="link link-hover">Host Your Studio</Link>
        </nav> 
        
        <nav>
          <h6 className="footer-title">Categories</h6> 
          <Link href="/studios?category=photo" className="link link-hover">Photo Studios</Link>
          <Link href="/studios?category=film" className="link link-hover">Cinema & Sound Stages</Link>
          <Link href="/studios?category=podcast" className="link link-hover">Podcast Lounges</Link>
          <Link href="/studios?category=music" className="link link-hover">Music & Audio Suites</Link>
        </nav> 
        
        <form>
          <h6 className="footer-title">Join Our Creator Newsletter</h6> 
          <fieldset className="form-control w-80">
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label> 
            <div className="join w-full">
              <input type="text" placeholder="username@site.com" className="input input-bordered join-item w-full" /> 
              <button className="btn btn-warning join-item">Subscribe</button>
            </div>
          </fieldset>
        </form>
      </div>
      
      <div className="footer footer-center p-6 border-t border-base-300">
        <aside className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl mx-auto">
          <p>© 2026 StudioSpace Platform. All rights reserved. Terms & Privacy.</p>
          <div className="flex gap-4 mt-4 sm:mt-0 text-base-content">
            <a href="#" aria-label="X">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M2.5 7.1C2.6 5.9 3.5 5 4.7 5h14.6c1.2 0 2.1.9 2.2 2.1.2 1.6.2 3.3.2 4.9s0 3.3-.2 4.9c-.1 1.2-1 2.1-2.2 2.1H4.7c-1.2 0-2.1-.9-2.2-2.1C2.3 15.3 2.3 13.6 2.3 12s0-3.3.2-4.9z"/><path d="m10 15 5-3-5-3v6z"/></svg>
            </a>
          </div>
        </aside>
      </div>
    </footer>
  );
}