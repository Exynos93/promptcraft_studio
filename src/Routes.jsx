import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProjectManagement from './pages/project-management';
import AnalyticsDashboard from './pages/analytics-dashboard';
import TemplateLibrary from './pages/template-library';
import PromptEditorPage from './pages/prompt-editor';
import Dashboard from './pages/dashboard';
import PortfolioShowcase from './pages/portfolio-showcase';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AnalyticsDashboard />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        <Route path="/template-library" element={<TemplateLibrary />} />
        <Route path="/prompt-editor" element={<PromptEditorPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio-showcase" element={<PortfolioShowcase />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
