import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onEdit, onView }) => {
  const getStrategyIcon = (strategy) => {
    switch (strategy) {
      case 'Role Prompting': return 'UserCheck';
      case 'Few-shot Learning': return 'Target';
      case 'Chain-of-Thought': return 'GitBranch';
      case 'Zero-shot': return 'Zap';
      default: return 'FileText';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-success text-success-foreground';
      case 'Testing': return 'bg-warning text-warning-foreground';
      case 'Completed': return 'bg-primary text-primary-foreground';
      case 'Draft': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-elevation-2 transition-state">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name={getStrategyIcon(project?.strategy)} size={16} color="white" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{project?.title}</h3>
            <p className="text-sm text-muted-foreground">{project?.strategy}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
          {project?.status}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">{project?.experiments}</p>
          <p className="text-xs text-muted-foreground">Experiments</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-success">{project?.successRate}%</p>
          <p className="text-xs text-muted-foreground">Success Rate</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">{project?.apiCalls}</p>
          <p className="text-xs text-muted-foreground">API Calls</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <span>Last modified: {project?.lastModified}</span>
        <span>Cost: ${project?.cost}</span>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={() => onEdit(project?.id)} className="flex-1">
          <Icon name="Edit3" size={14} className="mr-1" />
          Edit
        </Button>
        <Button variant="default" size="sm" onClick={() => onView(project?.id)} className="flex-1">
          <Icon name="Eye" size={14} className="mr-1" />
          View
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;