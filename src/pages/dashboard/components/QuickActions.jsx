import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ onNewExperiment, onImportTemplate, onViewAnalytics }) => {
  const actions = [
    {
      title: 'New Experiment',
      description: 'Start a new prompt experiment',
      icon: 'Plus',
      color: 'bg-primary',
      onClick: onNewExperiment
    },
    {
      title: 'Import Template',
      description: 'Use existing template',
      icon: 'Download',
      color: 'bg-secondary',
      onClick: onImportTemplate
    },
    {
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: 'BarChart3',
      color: 'bg-accent',
      onClick: onViewAnalytics
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            onClick={action?.onClick}
            className="w-full justify-start p-4 h-auto hover:bg-muted"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.color}`}>
                <Icon name={action?.icon} size={20} color="white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">{action?.title}</p>
                <p className="text-sm text-muted-foreground">{action?.description}</p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;