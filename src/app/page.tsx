import HeroBanner from "@/components/home/HeroBanner";
import BrowseCategories from "@/components/home/BrowseCategories";

export default function Home() {
  return (
    <main className="min-h-screen bg-base-100 text-base-content flex flex-col">
      <HeroBanner />
      <BrowseCategories />
    </main>
  );
}