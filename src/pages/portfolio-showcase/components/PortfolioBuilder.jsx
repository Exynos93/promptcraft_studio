import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import ProjectCard from './ProjectCard';

const PortfolioBuilder = ({ projects, selectedProjects, onProjectToggle, onProjectCustomize, onSettingsChange, settings }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStrategy, setFilterStrategy] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const strategyOptions = [
    { value: 'all', label: 'All Strategies' },
    { value: 'role-prompting', label: 'Role Prompting' },
    { value: 'few-shot', label: 'Few-Shot Learning' },
    { value: 'chain-of-thought', label: 'Chain of Thought' },
    { value: 'zero-shot', label: 'Zero-Shot' },
    { value: 'retrieval-augmented', label: 'Retrieval Augmented' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date Created' },
    { value: 'coherence', label: 'Coherence Score' },
    { value: 'quality', label: 'Quality Score' },
    { value: 'title', label: 'Title (A-Z)' }
  ];

  const themeOptions = [
    { value: 'professional', label: 'Professional' },
    { value: 'technical', label: 'Technical' },
    { value: 'academic', label: 'Academic' },
    { value: 'creative', label: 'Creative' }
  ];

  const audienceOptions = [
    { value: 'technical', label: 'Technical Teams' },
    { value: 'business', label: 'Business Stakeholders' },
    { value: 'academic', label: 'Academic Community' },
    { value: 'general', label: 'General Audience' }
  ];

  const filteredProjects = projects?.filter(project => {
      const matchesSearch = project?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           project?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesStrategy = filterStrategy === 'all' || project?.strategy === filterStrategy;
      return matchesSearch && matchesStrategy;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'coherence':
          return b?.metrics?.coherence - a?.metrics?.coherence;
        case 'quality':
          return b?.metrics?.quality - a?.metrics?.quality;
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'date':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  const handleSectionToggle = (section, enabled) => {
    onSettingsChange({
      ...settings,
      sections: {
        ...settings?.sections,
        [section]: enabled
      }
    });
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Portfolio Builder</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {selectedProjects?.length} selected
            </span>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
          
          <div className="grid grid-cols-2 gap-3">
            <Select
              options={strategyOptions}
              value={filterStrategy}
              onChange={setFilterStrategy}
              placeholder="Filter by strategy"
            />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
            />
          </div>
        </div>
      </div>
      {/* Project List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {filteredProjects?.map(project => (
            <ProjectCard
              key={project?.id}
              project={project}
              isSelected={selectedProjects?.includes(project?.id)}
              onToggle={onProjectToggle}
              onCustomize={onProjectCustomize}
            />
          ))}
          
          {filteredProjects?.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Portfolio Settings */}
      <div className="p-6 border-t border-border">
        <h3 className="font-medium text-foreground mb-4">Portfolio Settings</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Theme</label>
            <Select
              options={themeOptions}
              value={settings?.theme}
              onChange={(value) => onSettingsChange({ ...settings, theme: value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Target Audience</label>
            <Select
              options={audienceOptions}
              value={settings?.audience}
              onChange={(value) => onSettingsChange({ ...settings, audience: value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Include Sections</label>
            <div className="space-y-2">
              <Checkbox
                label="Executive Summary"
                checked={settings?.sections?.summary}
                onChange={(e) => handleSectionToggle('summary', e?.target?.checked)}
              />
              <Checkbox
                label="Methodology Overview"
                checked={settings?.sections?.methodology}
                onChange={(e) => handleSectionToggle('methodology', e?.target?.checked)}
              />
              <Checkbox
                label="Performance Metrics"
                checked={settings?.sections?.metrics}
                onChange={(e) => handleSectionToggle('metrics', e?.target?.checked)}
              />
              <Checkbox
                label="Code Examples"
                checked={settings?.sections?.codeExamples}
                onChange={(e) => handleSectionToggle('codeExamples', e?.target?.checked)}
              />
              <Checkbox
                label="Results Analysis"
                checked={settings?.sections?.results}
                onChange={(e) => handleSectionToggle('results', e?.target?.checked)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;