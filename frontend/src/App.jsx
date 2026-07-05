import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/HomePage";
import { CoursePage } from "@/pages/CoursePage";
import { CurriculumPage } from "@/pages/CurriculumPage";
import { WeeklySessionsPage } from "@/pages/WeeklySessionsPage";
import { SathvamPage } from "@/pages/SathvamPage";
import { DhyanaVahiniPage } from "@/pages/DhyanaVahiniPage";
import { SamithiConnectPage } from "@/pages/SamithiConnectPage";
import { FaqPage } from "@/pages/FaqPage";
import { ContactPage } from "@/pages/ContactPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/programme/weekly-sessions" element={<WeeklySessionsPage />} />
          <Route path="/programme/sathvam" element={<SathvamPage />} />
          <Route path="/programme/dhyana-vahini" element={<DhyanaVahiniPage />} />
          <Route path="/programme/samithi-connect" element={<SamithiConnectPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
