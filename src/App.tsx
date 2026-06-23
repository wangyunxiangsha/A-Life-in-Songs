import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AppProvider } from '@/context/AppContext';
import { AmbientMusicProvider } from '@/context/AmbientMusicContext';
import { useLenis } from '@/hooks/useLenis';
import VideoBackground from '@/sections/VideoBackground';
import Navbar from '@/sections/Navbar';
import TimeSlider from '@/sections/TimeSlider';
import Hero from '@/sections/Hero';
import ChapterProgressNav from '@/components/ChapterProgressNav';

const About = lazy(() => import('@/sections/About'));
const Companions = lazy(() => import('@/sections/Companions'));
const Seasons = lazy(() => import('@/sections/Seasons'));
const Footer = lazy(() => import('@/sections/Footer'));

function LazySection({
  minHeight,
  children,
}: {
  minHeight: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shouldMount) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {shouldMount ? (
        <Suspense fallback={null}>{children}</Suspense>
      ) : null}
    </div>
  );
}

function AppContent() {
  useLenis();

  return (
    <>
      {/* Background layers */}
      <VideoBackground />
      <div className="vignette-overlay" />

      {/* Fixed UI */}
      <Navbar />
      <TimeSlider />
      <ChapterProgressNav />

      {/* Page content */}
      <main className="relative z-10">
        <Hero />
        <LazySection minHeight="1px">
          <About />
        </LazySection>
        <LazySection minHeight="100dvh">
          <Companions />
        </LazySection>
        <LazySection minHeight="1800dvh">
          <Seasons />
        </LazySection>
        <LazySection minHeight="40dvh">
          <Footer />
        </LazySection>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AmbientMusicProvider>
        <AppContent />
      </AmbientMusicProvider>
    </AppProvider>
  );
}
