import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useParams } from 'react-router-dom';
import './styles/global.css';
import { usePageMeta } from '../hooks/usePageMeta';
import { HeroSection } from './sections/HeroSection';
import { MetricsSection } from './sections/MetricsSection';
import { CreativeShowcaseSection } from './sections/CreativeShowcaseSection';
import { SecuritySection } from './sections/SecuritySection';
import { ClientShowcaseSection } from './sections/ClientShowcaseSection';
import { StudioShowcaseSection } from './sections/StudioShowcaseSection';
import { AcademySection } from './sections/AcademySection';
import { ContactSalesSection } from './sections/ContactSalesSection';
import { FaqSection } from './sections/FaqSection';
import { MegaFooter } from './sections/MegaFooter';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { AcademyPage } from './pages/AcademyPage';
import type { ShowcaseCategoryId, ContactServiceOption } from './data/enterpriseData';

interface EnterpriseLandingPageProps {
  preselectedService: ContactServiceOption | null;
  onSelectService: (service: ContactServiceOption) => void;
}

const EnterpriseLandingPage: React.FC<EnterpriseLandingPageProps> = ({
  preselectedService,
  onSelectService,
}) => {
  const [activeCategory, setActiveCategory] = useState<ShowcaseCategoryId>('video-generation');

  usePageMeta({
    title: 'Nunnarivu.ai — Enterprise AI Creative Production',
    description:
      'Every leading AI model in one secure workspace, delivering campaign-ready video, imagery, voice, cinema, and enterprise AI automation.',
    canonical: 'https://www.nunnarivu.ai/',
    ogImage: 'https://www.nunnarivu.ai/assets/images/og-cover.jpg',
  });

  const handleRequestService = useCallback(
    (service: ContactServiceOption) => {
      onSelectService(service);
      document.getElementById('enterprise-contact')?.scrollIntoView({ behavior: 'smooth' });
    },
    [onSelectService]
  );

  return (
    <>
      <main id="main">
        {/* PHASE 1 — PRESERVED CINEMATIC HERO VIDEO (UNMODIFIED) */}
        <HeroSection />

        {/* VERIFIED NUNNARIVU CAPABILITY METRICS & WORKFLOW */}
        <MetricsSection onRequestService={handleRequestService} />

        {/* PHASE 3 — AI CREATIVE PRODUCTION SHOWCASE (4 CATEGORIES) */}
        <CreativeShowcaseSection
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onRequestService={handleRequestService}
        />

        {/* PHASE 4 — YOUR DATA AND IP ARE PROTECTED (6 NUNNARIVU CARDS) */}
        <SecuritySection onRequestService={handleRequestService} />

        {/* PHASE 5 — OUR WORK / VERIFIED CASE STUDIES */}
        <ClientShowcaseSection />

        {/* PHASE 6 — NUNNARIVU CINEMA STUDIO SHOWCASE */}
        <StudioShowcaseSection onRequestService={handleRequestService} />

        {/* PHASE 7 — NUNNARIVU.AI ACADEMY BANNER */}
        <AcademySection />

        {/* PHASE 2 & 8 — SINGLE RETAINED REAL CONTACT SALES FORM */}
        <ContactSalesSection
          sectionId="enterprise-contact"
          preselectedService={preselectedService}
        />

        {/* FAQ ACCORDION */}
        <FaqSection />
      </main>

      {/* PHASE 9 — SIMPLIFIED NUNNARIVU FOOTER */}
      <MegaFooter
        onSelectShowcaseCategory={setActiveCategory}
        onRequestService={handleRequestService}
      />
    </>
  );
};

const WorkSlugRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={slug ? `/case-studies/${slug}` : '/#our-work'} replace />;
};

export const NewSiteApp: React.FC = () => {
  const location = useLocation();
  const [preselectedService, setPreselectedService] = useState<ContactServiceOption | null>(null);

  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevTitle = document.title;
    const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    const prevTheme = themeMeta?.getAttribute('content') ?? null;

    html.classList.add('new-site-active');
    body.classList.add('new-site-active');
    document.title = 'Nunnarivu.ai — Enterprise AI Creative Production';
    if (themeMeta) {
      themeMeta.setAttribute('content', '#171122');
    }

    return () => {
      html.classList.remove('new-site-active');
      body.classList.remove('new-site-active');
      document.title = prevTitle;
      if (themeMeta && prevTheme !== null) {
        themeMeta.setAttribute('content', prevTheme);
      }
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.slice(1);
      const timer = window.setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location.pathname, location.hash]);

  return (
    <div className="new-site-root">
      <Routes>
        <Route
          index
          element={
            <EnterpriseLandingPage
              preselectedService={preselectedService}
              onSelectService={setPreselectedService}
            />
          }
        />
        <Route
          path="enterprise"
          element={
            <EnterpriseLandingPage
              preselectedService={preselectedService}
              onSelectService={setPreselectedService}
            />
          }
        />
        <Route
          path="case-studies/:slug"
          element={<CaseStudyPage onSelectService={setPreselectedService} />}
        />
        <Route path="work/:slug" element={<WorkSlugRedirect />} />
        <Route
          path="academy"
          element={<AcademyPage onSelectService={setPreselectedService} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default NewSiteApp;
