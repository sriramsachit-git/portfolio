import { useState, lazy, Suspense } from 'react';
import { useSectionScroll } from '@/hooks/useSectionScroll';
import { Navigation } from '@components/Navigation/Navigation';
import { Hero } from '@components/Hero/Hero';
import { About } from '@components/About/About';
import { Experience } from '@components/Experience/Experience';
import { SkillsSection } from '@components/Skills/SkillsSection';
import { Footer } from '@components/Footer/Footer';
import { Loader } from '@components/Loader/Loader';
import { Cursor } from '@components/Cursor/Cursor';
import { SocialIcons } from '@components/SocialIcons/SocialIcons';

const Projects = lazy(() => import('@components/Projects/Projects').then((m) => ({ default: m.Projects })));
const Contact = lazy(() => import('@components/Contact/Contact').then((m) => ({ default: m.Contact })));

function App() {
  const [loaded, setLoaded] = useState(true); // Temporarily set to true to bypass loader
  useSectionScroll();

  const handleLoadComplete = () => setLoaded(true);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      {!loaded && <Loader onComplete={handleLoadComplete} />}
      <Cursor />
      <SocialIcons />
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <SkillsSection />
        <Suspense fallback={<section className="full-page-section" style={{ minHeight: '100vh' }} />}>
          <Projects />
          <Contact />
        </Suspense>
        <Footer />
      </main>
    </>
  );
}

export default App;
