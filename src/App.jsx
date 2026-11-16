import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { ScrollProgress, BackToTop, Intro } from './components/Chrome';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Properties from './pages/Properties';
import Locations from './pages/Locations';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      return window.sessionStorage.getItem('feranmi-intro') === 'done';
    } catch {
      return false;
    }
  });
  const { pathname } = useLocation();

  const finishIntro = useCallback(() => {
    setIntroDone(true);
    try {
      window.sessionStorage.setItem('feranmi-intro', 'done');
    } catch {
      /* storage blocked — fine */
    }
  }, []);

  // Re-trigger the page-in animation whenever the route changes.
  useEffect(() => {
    const main = document.getElementById('main');
    if (main) {
      main.classList.remove('page');
      // eslint-disable-next-line no-unused-expressions
      void main.offsetWidth;
      main.classList.add('page');
    }
    document.body.classList.toggle('is-locked', !introDone);
    return () => document.body.classList.remove('is-locked');
  }, [pathname, introDone]);

  return (
    <>
      {!introDone && <Intro onDone={finishIntro} />}
      <ScrollProgress />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      <main id="main" className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
