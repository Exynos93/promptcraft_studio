import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplateCard = ({ template, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleUseTemplate = () => {
    navigate('/prompt-editor', { state: { template } });
  };

  const handleCopyTemplate = async () => {
    try {
      await navigator.clipboard?.writeText(template?.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy template:', err);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-success text-success-foreground';
      case 'intermediate': return 'bg-warning text-warning-foreground';
      case 'advanced': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStrategyIcon = (strategy) => {
    switch (strategy) {
      case 'Role Prompting': return 'UserCheck';
      case 'Few-Shot Learning': return 'Target';
      case 'Chain-of-Thought': return 'GitBranch';
      case 'Zero-Shot': return 'Zap';
      default: return 'FileText';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-meaningful">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-foreground truncate">{template?.name}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(template?.difficulty)}`}>
                  {template?.difficulty}
                </span>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Icon name={getStrategyIcon(template?.strategy)} size={14} />
                  <span className="text-xs">{template?.strategy}</span>
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{template?.description}</p>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <span>{template?.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} />
                <span>{template?.usageCount?.toLocaleString()} uses</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{template?.lastUpdated}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Icon name="Eye" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyTemplate}
            >
              <Icon name={isCopied ? "Check" : "Copy"} size={16} />
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleUseTemplate}
            >
              Use Template
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation-2 transition-meaningful group">
        {/* Template Header */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name={getStrategyIcon(template?.strategy)} size={20} className="text-primary" />
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(template?.difficulty)}`}>
                {template?.difficulty}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm">{template?.rating}</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-1">{template?.name}</h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{template?.description}</p>
          
          {/* Template Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {template?.tags?.slice(0, 3)?.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                {tag}
              </span>
            ))}
            {template?.tags?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                +{template?.tags?.length - 3} more
              </span>
            )}
          </div>
          
          {/* Template Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={14} />
                <span>{template?.usageCount?.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{template?.lastUpdated}</span>
              </div>
            </div>
            <span className="text-xs">{template?.strategy}</span>
          </div>
          
          {/* Model Compatibility */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xs text-muted-foreground">Compatible with:</span>
            <div className="flex items-center space-x-1">
              {template?.compatibility?.map((model, index) => (
                <span key={index} className="w-2 h-2 rounded-full bg-success"></span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Template Actions */}
        <div className="px-6 py-4 bg-muted/50 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPreviewOpen(true)}
              >
                <Icon name="Eye" size={16} />
                <span className="ml-1">Preview</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyTemplate}
              >
                <Icon name={isCopied ? "Check" : "Copy"} size={16} />
                <span className="ml-1">{isCopied ? 'Copied!' : 'Copy'}</span>
              </Button>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={handleUseTemplate}
            >
              Use Template
            </Button>
          </div>
        </div>
      </div>
      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-semibold text-foreground">{template?.name}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPreviewOpen(false)}
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground">{template?.description}</p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Template Content</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm text-foreground whitespace-pre-wrap overflow-x-auto">
                    {template?.content}
                  </pre>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Usage Example</h3>
                  <pre className="bg-muted p-4 rounded-lg text-sm text-foreground whitespace-pre-wrap overflow-x-auto">
                    {template?.example}
                  </pre>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                Close
              </Button>
              <Button onClick={handleUseTemplate}>
                Use Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateCard;