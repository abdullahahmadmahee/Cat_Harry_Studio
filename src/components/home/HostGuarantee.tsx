import { ShieldCheck, UserCheck, Wrench, HeadphonesIcon } from "lucide-react";

export default function HostGuarantee() {
  const assurances = [
    {
      id: 1,
      title: "Liability Protection",
      icon: <ShieldCheck className="w-10 h-10 text-warning" />,
      description: "Comprehensive property and stage damage protection for every reservation.",
    },
    {
      id: 2,
      title: "Verified Profiles",
      icon: <UserCheck className="w-10 h-10 text-warning" />,
      description: "Every creator and host undergoes strict ID and portfolio verification.",
    },
    {
      id: 3,
      title: "Equipment Safety",
      icon: <Wrench className="w-10 h-10 text-warning" />,
      description: "Pre-shoot inspections ensure all lighting grids and gear are safely rigged.",
    },
    {
      id: 4,
      title: "24/7 Host Support",
      icon: <HeadphonesIcon className="w-10 h-10 text-warning" />,
      description: "Round-the-clock technical and booking support so you can focus on creating.",
    },
  ];

  return (
    <section id="about-us" className="py-20 bg-base-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <span className="text-warning font-bold tracking-wider uppercase text-sm">
              Trust, Safety & Peace of Mind
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              Built on Uncompromising Protection
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              We understand creative production is unpredictable. StudioSpace provides enterprise-grade safety umbrellas, verified host guarantees, and around-the-clock support so you can focus entirely on your craft.
            </p>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {assurances.map((item) => (
              <div key={item.id} className="card bg-base-100 shadow-md border border-base-300 hover:border-warning/50 transition-colors duration-300">
                <div className="card-body">
                  <div className="mb-4">
                    {item.icon}
                  </div>
                  <h3 className="card-title text-lg">{item.title}</h3>
                  <p className="text-gray-400 text-sm mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}