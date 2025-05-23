// app/page.tsx
import Navbar from '@/app/components/Header/NavBar';
import HeroSection from '@/app/components/HomePage/HeroSection';
import Footer from '@/app/components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="bg-primary min-h-screen">
        <HeroSection />
      </main>
      <Footer />
    </>
  );
}