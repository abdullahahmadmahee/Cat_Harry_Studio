import { Search, Clock, CheckCircle, Clapperboard } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "1. Discover Spaces",
      icon: <Search className="w-12 h-12 text-warning" />,
      description: "Filter verified cyc walls, podcast lounges, and stages by location and gear.",
    },
    {
      id: 2,
      title: "2. Select Shoot Hours",
      icon: <Clock className="w-12 h-12 text-warning" />,
      description: "Inspect live calendar availability and choose precise hourly blocks.",
    },
    {
      id: 3,
      title: "3. Book Instantly",
      icon: <CheckCircle className="w-12 h-12 text-warning" />,
      description: "Lock in your reservation with double-booking prevention and clear pricing.",
    },
    {
      id: 4,
      title: "4. Create & Produce",
      icon: <Clapperboard className="w-12 h-12 text-warning" />,
      description: "Arrive at the stage with verified access and start producing your vision.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">How StudioSpace Works</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Four simple steps from pre-production concept to rolling cameras in world-class creative facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-base-200 flex items-center justify-center mb-6 group-hover:bg-warning/20 transition-colors duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}