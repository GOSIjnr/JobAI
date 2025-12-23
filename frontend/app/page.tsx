import type { Metadata } from 'next';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: "Free Career Assessment - Find Your Perfect Career Path",
  description: "Take our free 4-minute career assessment. Answer 18 focused questions about how you work and get matched with careers that fit your strengths. No signup required.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
