import React, { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './styles/global.css';
import { HeroSection } from './sections/HeroSection';
import { ContactSalesSection } from './sections/ContactSalesSection';
import { MetricsSection } from './sections/MetricsSection';
import { WorkflowSection } from './sections/WorkflowSection';
import { SecuritySection } from './sections/SecuritySection';
import { ClientShowcaseSection } from './sections/ClientShowcaseSection';
import { StudioShowcaseSection } from './sections/StudioShowcaseSection';
import { AcademySection } from './sections/AcademySection';
import { FaqSection } from './sections/FaqSection';
import { MegaFooter } from './sections/MegaFooter';
import { DemoToast } from './components/DemoToast';

const EnterpriseLandingPage: React.FC = () => {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showDemoNotice = useCallback((msg: string) => {
    setToastMsg(msg);
  }, []);

  const clearToast = useCallback(() => {
    setToastMsg(null);
  }, []);

  return (
    <>
      <main id="main">
        {/* SECTION 02 — MAIN CINEMATIC HERO */}
        <HeroSection />

        {/* SECTION 05 — ENTERPRISE METRICS */}
        <MetricsSection />

        {/* SECTION 06 — PRO CONTROL OVER WORKFLOW (4 INTERACTIVE TABS) */}
        <WorkflowSection onDemoNotice={showDemoNotice} />

        {/* SECTION 07 — ENTERPRISE SECURITY (6 BENTO CARDS) */}
        <SecuritySection onDemoNotice={showDemoNotice} />

        {/* SECTION 08 — ENTERPRISE CLIENT SHOWCASE (12 CASE STUDIES) */}
        <ClientShowcaseSection onDemoNotice={showDemoNotice} />

        {/* SECTION 09 — INTERACTIVE STUDIO SHOWCASE (6 STUDIOS + 10 CINEMA CONTROLS) */}
        <StudioShowcaseSection onDemoNotice={showDemoNotice} />

        {/* SECTION 10 — ACADEMY */}
        <AcademySection onDemoNotice={showDemoNotice} />

        {/* SECTION 11 — CONTACT SALES */}
        <ContactSalesSection
          sectionId="enterprise-contact"
          onDemoNotice={showDemoNotice}
        />

        {/* SECTION 12 — FAQ ACCORDION (8 VERBATIM ITEMS) */}
        <FaqSection />
      </main>

      {/* SECTION 13 — COMPLETE MEGA FOOTER */}
      <MegaFooter onDemoNotice={showDemoNotice} />

      <DemoToast message={toastMsg} onClose={clearToast} />
    </>
  );
};

export const NewSiteApp: React.FC = () => {
  const location = useLocation();

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
      themeMeta.setAttribute('content', '#000000');
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
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="new-site-root">
      <Routes>
        <Route index element={<EnterpriseLandingPage />} />
        <Route path="enterprise" element={<EnterpriseLandingPage />} />
        <Route path="*" element={<Navigate to="/new-site" replace />} />
      </Routes>
    </div>
  );
};

export default NewSiteApp;
