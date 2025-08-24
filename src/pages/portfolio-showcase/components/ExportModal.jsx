import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportModal = ({ isOpen, onClose, exportType, onExport, selectedProjects }) => {
  const [exportSettings, setExportSettings] = useState({
    title: 'Prompt Engineering Portfolio',
    author: 'John Doe',
    description: 'A comprehensive showcase of advanced prompt engineering techniques',
    includeMetrics: true,
    includeCode: true,
    includeCharts: true,
    format: 'markdown',
    visibility: 'public'
  });

  if (!isOpen) return null;

  const formatOptions = {
    github: [
      { value: 'markdown', label: 'Markdown (.md)' },
      { value: 'rst', label: 'reStructuredText (.rst)' }
    ],
    pdf: [
      { value: 'standard', label: 'Standard PDF' },
      { value: 'presentation', label: 'Presentation Style' },
      { value: 'technical', label: 'Technical Report' }
    ],
    web: [
      { value: 'static', label: 'Static HTML' },
      { value: 'interactive', label: 'Interactive Dashboard' },
      { value: 'showcase', label: 'Portfolio Showcase' }
    ]
  };

  const visibilityOptions = [
    { value: 'public', label: 'Public' },
    { value: 'private', label: 'Private' },
    { value: 'unlisted', label: 'Unlisted' }
  ];

  const getExportTitle = () => {
    switch (exportType) {
      case 'github': return 'Export to GitHub README';
      case 'pdf': return 'Export as PDF';
      case 'web': return 'Create Web Showcase';
      default: return 'Export Portfolio';
    }
  };

  const getExportDescription = () => {
    switch (exportType) {
      case 'github': 
        return 'Generate a professional README.md file with embedded charts and code examples for your GitHub repository.';
      case 'pdf': 
        return 'Create a polished PDF document suitable for presentations, client deliverables, or portfolio submissions.';
      case 'web': 
        return 'Build an interactive web showcase that can be hosted and shared with stakeholders and potential clients.';
      default: 
        return 'Export your portfolio in the selected format.';
    }
  };

  const handleExport = () => {
    onExport(exportType, exportSettings);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{getExportTitle()}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {selectedProjects?.length} project{selectedProjects?.length !== 1 ? 's' : ''} selected
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm text-foreground">{getExportDescription()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="font-medium text-foreground mb-4">Portfolio Information</h3>
              <div className="space-y-4">
                <Input
                  label="Portfolio Title"
                  value={exportSettings?.title}
                  onChange={(e) => setExportSettings({ ...exportSettings, title: e?.target?.value })}
                  placeholder="Enter portfolio title"
                />
                <Input
                  label="Author Name"
                  value={exportSettings?.author}
                  onChange={(e) => setExportSettings({ ...exportSettings, author: e?.target?.value })}
                  placeholder="Enter your name"
                />
                <Input
                  label="Description"
                  value={exportSettings?.description}
                  onChange={(e) => setExportSettings({ ...exportSettings, description: e?.target?.value })}
                  placeholder="Brief description of your portfolio"
                />
              </div>
            </div>

            {/* Format Settings */}
            <div>
              <h3 className="font-medium text-foreground mb-4">Export Format</h3>
              <Select
                label="Output Format"
                options={formatOptions?.[exportType] || []}
                value={exportSettings?.format}
                onChange={(value) => setExportSettings({ ...exportSettings, format: value })}
              />
            </div>

            {/* Content Options */}
            <div>
              <h3 className="font-medium text-foreground mb-4">Include Content</h3>
              <div className="space-y-3">
                <Checkbox
                  label="Performance Metrics & Charts"
                  description="Include coherence scores, quality ratings, and visual charts"
                  checked={exportSettings?.includeMetrics}
                  onChange={(e) => setExportSettings({ ...exportSettings, includeMetrics: e?.target?.checked })}
                />
                <Checkbox
                  label="Code Examples & Implementation"
                  description="Include prompt templates and implementation code"
                  checked={exportSettings?.includeCode}
                  onChange={(e) => setExportSettings({ ...exportSettings, includeCode: e?.target?.checked })}
                />
                {exportType === 'web' && (
                  <Checkbox
                    label="Interactive Charts & Visualizations"
                    description="Add interactive elements and dynamic charts"
                    checked={exportSettings?.includeCharts}
                    onChange={(e) => setExportSettings({ ...exportSettings, includeCharts: e?.target?.checked })}
                  />
                )}
              </div>
            </div>

            {/* Visibility Settings */}
            {exportType === 'web' && (
              <div>
                <h3 className="font-medium text-foreground mb-4">Visibility Settings</h3>
                <Select
                  label="Portfolio Visibility"
                  description="Control who can access your web showcase"
                  options={visibilityOptions}
                  value={exportSettings?.visibility}
                  onChange={(value) => setExportSettings({ ...exportSettings, visibility: value })}
                />
              </div>
            )}

            {/* Preview Information */}
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">Export Preview</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex justify-between">
                  <span>Projects:</span>
                  <span>{selectedProjects?.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <span className="capitalize">{exportSettings?.format}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated size:</span>
                  <span>{exportType === 'pdf' ? '2-5 MB' : exportType === 'web' ? '10-20 MB' : '50-100 KB'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={handleExport}
            iconName={exportType === 'github' ? 'Github' : exportType === 'pdf' ? 'FileDown' : 'Globe'}
            iconPosition="left"
          >
            {exportType === 'github' ? 'Generate README' : 
             exportType === 'pdf'? 'Export PDF' : 'Create Showcase'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;