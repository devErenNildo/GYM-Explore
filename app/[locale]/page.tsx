import Navbar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="bg-primary min-h-screen">
        <HeroSection />
      </main>
    </>
  );
}
