import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ onFiltersChange, savedReports, onLoadReport, onSaveReport }) => {
  const [dateRange, setDateRange] = useState({ start: '2024-07-01', end: '2024-08-24' });
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [selectedModels, setSelectedModels] = useState([]);
  const [reportName, setReportName] = useState('');

  const projects = [
    { id: 'proj1', name: 'E-commerce Chatbot' },
    { id: 'proj2', name: 'Content Generation' },
    { id: 'proj3', name: 'Code Assistant' },
    { id: 'proj4', name: 'Customer Support' },
    { id: 'proj5', name: 'Data Analysis' }
  ];

  const strategies = [
    { id: 'role', name: 'Role Prompting' },
    { id: 'fewshot', name: 'Few-shot Learning' },
    { id: 'cot', name: 'Chain-of-Thought' },
    { id: 'zero', name: 'Zero-shot' },
    { id: 'template', name: 'Template-based' }
  ];

  const models = [
    { id: 'gpt4', name: 'GPT-4' },
    { id: 'gpt35', name: 'GPT-3.5 Turbo' },
    { id: 'claude', name: 'Claude-3' },
    { id: 'cohere', name: 'Cohere Command' },
    { id: 'palm', name: 'PaLM 2' }
  ];

  const handleProjectToggle = (projectId) => {
    setSelectedProjects(prev => 
      prev?.includes(projectId) 
        ? prev?.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleStrategyToggle = (strategyId) => {
    setSelectedStrategies(prev => 
      prev?.includes(strategyId) 
        ? prev?.filter(id => id !== strategyId)
        : [...prev, strategyId]
    );
  };

  const handleModelToggle = (modelId) => {
    setSelectedModels(prev => 
      prev?.includes(modelId) 
        ? prev?.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleApplyFilters = () => {
    onFiltersChange({
      dateRange,
      projects: selectedProjects,
      strategies: selectedStrategies,
      models: selectedModels
    });
  };

  const handleClearFilters = () => {
    setDateRange({ start: '2024-07-01', end: '2024-08-24' });
    setSelectedProjects([]);
    setSelectedStrategies([]);
    setSelectedModels([]);
    onFiltersChange({
      dateRange: { start: '2024-07-01', end: '2024-08-24' },
      projects: [],
      strategies: [],
      models: []
    });
  };

  const handleSaveReport = () => {
    if (reportName?.trim()) {
      onSaveReport({
        name: reportName,
        filters: {
          dateRange,
          projects: selectedProjects,
          strategies: selectedStrategies,
          models: selectedModels
        },
        savedAt: new Date()?.toISOString()
      });
      setReportName('');
    }
  };

  return (
    <div className="w-80 bg-card border-r border-border p-6 overflow-y-auto">
      {/* Date Range */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Date Range</h3>
        <div className="space-y-3">
          <Input
            label="Start Date"
            type="date"
            value={dateRange?.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.target?.value }))}
          />
          <Input
            label="End Date"
            type="date"
            value={dateRange?.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.target?.value }))}
          />
        </div>
      </div>
      {/* Projects Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Projects</h3>
        <div className="space-y-2">
          {projects?.map(project => (
            <label key={project?.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedProjects?.includes(project?.id)}
                onChange={() => handleProjectToggle(project?.id)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-foreground">{project?.name}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Strategy Types Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Strategy Types</h3>
        <div className="space-y-2">
          {strategies?.map(strategy => (
            <label key={strategy?.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedStrategies?.includes(strategy?.id)}
                onChange={() => handleStrategyToggle(strategy?.id)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-foreground">{strategy?.name}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Models Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Models</h3>
        <div className="space-y-2">
          {models?.map(model => (
            <label key={model?.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedModels?.includes(model?.id)}
                onChange={() => handleModelToggle(model?.id)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-foreground">{model?.name}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Filter Actions */}
      <div className="mb-6 space-y-2">
        <Button 
          variant="default" 
          fullWidth 
          onClick={handleApplyFilters}
          iconName="Filter"
          iconPosition="left"
        >
          Apply Filters
        </Button>
        <Button 
          variant="outline" 
          fullWidth 
          onClick={handleClearFilters}
          iconName="X"
          iconPosition="left"
        >
          Clear All
        </Button>
      </div>
      {/* Save Report */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-3">Save Configuration</h3>
        <div className="space-y-2">
          <Input
            placeholder="Report name"
            value={reportName}
            onChange={(e) => setReportName(e?.target?.value)}
          />
          <Button 
            variant="secondary" 
            fullWidth 
            onClick={handleSaveReport}
            disabled={!reportName?.trim()}
            iconName="Save"
            iconPosition="left"
          >
            Save Report
          </Button>
        </div>
      </div>
      {/* Saved Reports */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Saved Reports</h3>
        <div className="space-y-2">
          {savedReports?.map(report => (
            <div key={report?.id} className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{report?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(report.savedAt)?.toLocaleDateString()}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLoadReport(report)}
                iconName="Play"
              >
                Load
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;