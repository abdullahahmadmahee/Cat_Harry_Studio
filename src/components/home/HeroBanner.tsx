"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroBanner() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
      title: "Reserve Production Spaces Built for Visionary Creators",
      subtitle: "Step into pre-rigged cycloramas, cinema soundstages, and 4K multi-cam podcast lounges.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop",
      title: "Premium Photography Cyc Walls & Lighting Sets",
      subtitle: "Discover hand-inspected photo studios equipped with industry-leading strobe lighting and modifiers.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070&auto=format&fit=crop",
      title: "Acoustically Treated Music & Audio Suites",
      subtitle: "Produce your next track in Dolby Atmos mixing suites across the continent.",
    }
  ];

  if (!isMounted) {
    return <div className="w-full h-[80vh] bg-base-300 animate-pulse"></div>;
  }

  return (
    <div className="w-full h-[80vh] relative group">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        observer={true}
        observeParents={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center relative flex items-center justify-center text-center px-4"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#1B1B1B]/80 via-[#1B1B1B]/60 to-[#1B1B1B]"></div>
              
              <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
                <span className="badge badge-warning badge-outline px-4 py-3 font-semibold uppercase tracking-widest text-xs">
                  Next-Gen Creative Studios
                </span>
                <h1 className="text-4xl md:text-6xl font-bold text-[#ffffff] leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-[#d1d5db] max-w-2xl font-light">
                  {slide.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Link href="/studios" className="btn btn-warning btn-lg px-8 font-bold text-[#1B1B1B]">
                    Explore All Studios
                  </Link>
                  <Link href="/add-studio" className="btn btn-outline btn-lg px-8 text-[#ffffff] hover:bg-[#ffffff] hover:text-[#1B1B1B] border-[#ffffff]">
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}