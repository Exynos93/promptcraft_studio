import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';


const CustomizationPanel = ({ isOpen, onClose, project, onSave }) => {
  const [customization, setCustomization] = useState({
    title: project?.title || '',
    summary: project?.customSummary || '',
    highlights: project?.highlights || [''],
    methodology: project?.methodology || '',
    codeExample: project?.codeExample || '',
    results: project?.results || '',
    tags: project?.tags?.join(', ') || '',
    displayOrder: project?.displayOrder || 1
  });

  if (!isOpen || !project) return null;

  const handleAddHighlight = () => {
    setCustomization({
      ...customization,
      highlights: [...customization?.highlights, '']
    });
  };

  const handleRemoveHighlight = (index) => {
    setCustomization({
      ...customization,
      highlights: customization?.highlights?.filter((_, i) => i !== index)
    });
  };

  const handleHighlightChange = (index, value) => {
    const newHighlights = [...customization?.highlights];
    newHighlights[index] = value;
    setCustomization({
      ...customization,
      highlights: newHighlights
    });
  };

  const handleSave = () => {
    const updatedProject = {
      ...project,
      customTitle: customization?.title,
      customSummary: customization?.summary,
      highlights: customization?.highlights?.filter(h => h?.trim()),
      methodology: customization?.methodology,
      codeExample: customization?.codeExample,
      results: customization?.results,
      customTags: customization?.tags?.split(',')?.map(t => t?.trim())?.filter(t => t),
      displayOrder: customization?.displayOrder
    };
    onSave(updatedProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg shadow-elevation-3 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Customize Project</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Personalize how this project appears in your portfolio
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-foreground mb-4">Basic Information</h3>
                <div className="space-y-4">
                  <Input
                    label="Custom Title"
                    description="Override the default project title"
                    value={customization?.title}
                    onChange={(e) => setCustomization({ ...customization, title: e?.target?.value })}
                    placeholder={project?.title}
                  />
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Executive Summary</label>
                    <textarea
                      className="w-full h-24 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      value={customization?.summary}
                      onChange={(e) => setCustomization({ ...customization, summary: e?.target?.value })}
                      placeholder="Write a compelling summary for this project..."
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Brief overview highlighting the project's key achievements
                    </p>
                  </div>

                  <Input
                    label="Tags"
                    description="Comma-separated tags for categorization"
                    value={customization?.tags}
                    onChange={(e) => setCustomization({ ...customization, tags: e?.target?.value })}
                    placeholder="AI, NLP, Few-shot Learning"
                  />
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Key Highlights</h3>
                <div className="space-y-3">
                  {customization?.highlights?.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={highlight}
                        onChange={(e) => handleHighlightChange(index, e?.target?.value)}
                        placeholder={`Highlight ${index + 1}`}
                        className="flex-1"
                      />
                      {customization?.highlights?.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveHighlight(index)}
                          className="text-error hover:text-error"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddHighlight}
                    iconName="Plus"
                    iconPosition="left"
                    className="w-full"
                  >
                    Add Highlight
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Content */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-foreground mb-4">Detailed Content</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Methodology Description</label>
                    <textarea
                      className="w-full h-24 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      value={customization?.methodology}
                      onChange={(e) => setCustomization({ ...customization, methodology: e?.target?.value })}
                      placeholder="Explain the approach and techniques used..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Results Analysis</label>
                    <textarea
                      className="w-full h-24 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      value={customization?.results}
                      onChange={(e) => setCustomization({ ...customization, results: e?.target?.value })}
                      placeholder="Describe the outcomes and key findings..."
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Custom Code Example</label>
                    <textarea
                      className="w-full h-32 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none font-mono text-sm"
                      value={customization?.codeExample}
                      onChange={(e) => setCustomization({ ...customization, codeExample: e?.target?.value })}
                      placeholder="# Custom implementation example
prompt = '''
Your custom prompt template here...
'''

response = model.generate(prompt)"
                    />
                  </div>
                </div>
              </div>

              {/* Display Settings */}
              <div>
                <h3 className="font-medium text-foreground mb-4">Display Settings</h3>
                <div className="bg-muted rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Display Order</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCustomization({ ...customization, displayOrder: Math.max(1, customization?.displayOrder - 1) })}
                      >
                        <Icon name="ChevronUp" size={16} />
                      </Button>
                      <span className="text-sm text-foreground w-8 text-center">{customization?.displayOrder}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCustomization({ ...customization, displayOrder: customization?.displayOrder + 1 })}
                      >
                        <Icon name="ChevronDown" size={16} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lower numbers appear first in the portfolio
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-medium text-foreground mb-4">Preview</h3>
            <div className="bg-muted rounded-lg p-6">
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {customization?.title || project?.title}
              </h4>
              {customization?.summary && (
                <p className="text-muted-foreground mb-3">{customization?.summary}</p>
              )}
              {customization?.highlights?.filter(h => h?.trim())?.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-foreground mb-2">Key Highlights:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {customization?.highlights?.filter(h => h?.trim())?.map((highlight, index) => (
                      <li key={index} className="text-sm text-muted-foreground">{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {(customization?.tags ? customization?.tags?.split(',')?.map(t => t?.trim())?.filter(t => t) : project?.tags)?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSave} iconName="Save" iconPosition="left">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;