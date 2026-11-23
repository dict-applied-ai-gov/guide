import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Shell } from "@/components/Shell";
import { Home } from "@/pages/Home";
import { Progress } from "@/pages/Progress";
import { Schedule } from "@/pages/Schedule";
import { Setup } from "@/pages/Setup";
import { DayPage } from "@/pages/DayPage";
import { Models } from "@/pages/Models";
import { DataProtection } from "@/pages/DataProtection";
import { Agents } from "@/pages/Agents";
import { Mcp } from "@/pages/Mcp";
import { LocalAi } from "@/pages/LocalAi";
import { Skills } from "@/pages/Skills";
import { Prompting } from "@/pages/Prompting";
import { Certificates } from "@/pages/Certificates";
import { DecisionSupport } from "@/pages/DecisionSupport";
import { Capstone } from "@/pages/Capstone";
import { ResponsibleAi } from "@/pages/ResponsibleAi";
import { QuickReference } from "@/pages/QuickReference";
import { Glossary } from "@/pages/Glossary";
import { Faq } from "@/pages/Faq";
import { Resources } from "@/pages/Resources";
import { Assessment } from "@/pages/Assessment";
import { NotFound } from "@/pages/NotFound";
import { days } from "@/data/course";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Home />} />
          <Route path="progress" element={<Progress />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="setup" element={<Setup />} />
          {days.map((d) => (
            <Route key={d.id} path={d.id} element={<DayPage day={d} />} />
          ))}
          <Route path="models" element={<Models />} />
          <Route path="data-protection" element={<DataProtection />} />
          <Route path="agents" element={<Agents />} />
          <Route path="mcp" element={<Mcp />} />
          <Route path="local-ai" element={<LocalAi />} />
          <Route path="skills" element={<Skills />} />
          <Route path="prompting" element={<Prompting />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="decision-support" element={<DecisionSupport />} />
          <Route path="capstone" element={<Capstone />} />
          <Route path="responsible-ai" element={<ResponsibleAi />} />
          <Route path="quick-reference" element={<QuickReference />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="faq" element={<Faq />} />
          <Route path="resources" element={<Resources />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
