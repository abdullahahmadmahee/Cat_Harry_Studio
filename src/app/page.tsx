import HeroBanner from "@/components/home/HeroBanner";
import BrowseCategories from "@/components/home/BrowseCategories";
import HowItWorks from "@/components/home/HowItWorks";
import HostGuarantee from "@/components/home/HostGuarantee";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content flex flex-col">
      <HeroBanner />
      <BrowseCategories />
      <HowItWorks />
      <HostGuarantee />
    </main>
  );
}