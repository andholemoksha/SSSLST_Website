import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/HomePage";
import { CoursePage } from "@/pages/CoursePage";
import { FaqPage } from "@/pages/FaqPage";
import { ContactPage } from "@/pages/ContactPage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { SatsangPage } from "@/pages/SatsangPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/satsang" element={<SatsangPage />} />
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
