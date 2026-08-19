import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import HowItWorks from "./components/HowItWorks";
import Categories from "./components/Categories";
import Impact from "./components/Impact";
import Transparency from "./components/Transparency";
import Footer from "./components/Footer";
import { getLandingPageStats } from "@/app/actions/stats";

export default async function Home() {
  // Fetch real data from the backend
  const stats = await getLandingPageStats();

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero stats={stats} />
      <HowItWorks />
      <Categories />
      
      {/* Pass the real database stats down as a prop */}
      <Impact stats={stats} />
      
      <Transparency />
      <Footer />
    </main>
  );
}