import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { HomePage } from "@/pages/HomePage";
import { CoursePage } from "@/pages/CoursePage";
import { CurriculumPage } from "@/pages/CurriculumPage";
import { WeeklySessionsPage } from "@/pages/WeeklySessionsPage";
import { SathvamPage } from "@/pages/SathvamPage";
import { DhyanaVahiniPage } from "@/pages/DhyanaVahiniPage";
import { SamithiConnectPage } from "@/pages/SamithiConnectPage";
import { SamithiActivityPage } from "@/pages/SamithiActivityPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProjectCategoryPage } from "@/pages/ProjectCategoryPage";
import { TestimonialsPage } from "@/pages/TestimonialsPage";
import { SatsangPage } from "@/pages/SatsangPage";
import { FaqPage } from "@/pages/FaqPage";
import { ContactPage } from "@/pages/ContactPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

import { AdmissionsLotusCard } from "@/components/ui/admissions-lotus-card";
import { applyNow } from "@/content/applynow";
import { home } from "@/content/home";
import { PublicationsPanel } from "@/components/layout/PublicationsPanel";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />

          <Route
            path="/programme/weekly-sessions"
            element={<WeeklySessionsPage />}
          />
          <Route
            path="/programme/sathvam"
            element={<SathvamPage />}
          />
          <Route
            path="/programme/dhyana-vahini"
            element={<DhyanaVahiniPage />}
          />
          <Route
            path="/programme/samithi-connect"
            element={<SamithiConnectPage />}
          />
          <Route
            path="/programme/samithi-connect/:sectionSlug/:activitySlug"
            element={<SamithiActivityPage />}
          />

          <Route path="/projects" element={<ProjectsPage />} />
          <Route
            path="/projects/:categorySlug"
            element={<ProjectCategoryPage />}
          />

          <Route path="/testimonials" element={<TestimonialsPage />} />
          

          <Route path="/satsang" element={<SatsangPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {applyNow.enabled && <AdmissionsLotusCard />}
      <PublicationsPanel publications={home.hero.publications} />

      <Footer />
    </div>
  );
}

export default App;