import Link from "next/link";
import { Camera, Clapperboard, Mic, Music, Paintbrush } from "lucide-react";

export default function BrowseCategories() {
  const categories = [
    {
      id: 1,
      title: "Photo Studios",
      icon: <Camera className="w-10 h-10 text-warning" />,
      href: "/studios?category=photo",
      description: "Cyc walls and natural light spaces",
    },
    {
      id: 2,
      title: "Sound Stages",
      icon: <Clapperboard className="w-10 h-10 text-warning" />,
      href: "/studios?category=film",
      description: "Acoustically treated film stages",
    },
    {
      id: 3,
      title: "Podcast Rooms",
      icon: <Mic className="w-10 h-10 text-warning" />,
      href: "/studios?category=podcast",
      description: "Multi-cam setups with audio gear",
    },
    {
      id: 4,
      title: "Music Suites",
      icon: <Music className="w-10 h-10 text-warning" />,
      href: "/studios?category=music",
      description: "Dolby Atmos mixing & recording",
    },
    {
      id: 5,
      title: "Art Workshops",
      icon: <Paintbrush className="w-10 h-10 text-warning" />,
      href: "/studios?category=art",
      description: "Spacious areas for physical crafting",
    },
  ];

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-warning font-bold tracking-wider uppercase text-sm">
            Curated Production Environments
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">Browse by Creative Discipline</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={category.href}
              className="card bg-base-100 shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-base-300 hover:border-warning group"
            >
              <div className="card-body items-center text-center p-8">
                <div className="p-4 bg-base-200 rounded-full group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="card-title text-lg mt-4">{category.title}</h3>
                <p className="text-sm text-gray-400 mt-2">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}