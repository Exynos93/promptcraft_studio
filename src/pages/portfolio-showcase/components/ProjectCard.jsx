import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, isSelected, onToggle, onCustomize }) => {
  const getMetricColor = (value, threshold) => {
    if (value >= threshold?.high) return 'text-success';
    if (value >= threshold?.medium) return 'text-warning';
    return 'text-error';
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className={`bg-card border rounded-lg p-4 transition-all duration-200 ${
      isSelected ? 'border-primary shadow-elevation-2' : 'border-border hover:border-muted-foreground'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-medium text-foreground mb-1">{project?.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{project?.description}</p>
        </div>
        <div className="flex items-center space-x-2 ml-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onToggle(project?.id)}
            className={isSelected ? 'text-primary' : 'text-muted-foreground'}
          >
            <Icon name={isSelected ? 'CheckSquare' : 'Square'} size={16} />
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-4 mb-3 text-xs">
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={12} className="text-muted-foreground" />
          <span className="text-muted-foreground">{project?.date}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={12} className="text-muted-foreground" />
          <span className="text-muted-foreground">{formatDuration(project?.duration)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Zap" size={12} className="text-muted-foreground" />
          <span className="text-muted-foreground">{project?.strategy}</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <div className={`text-sm font-medium ${getMetricColor(project?.metrics?.coherence, { high: 85, medium: 70 })}`}>
            {project?.metrics?.coherence}%
          </div>
          <div className="text-xs text-muted-foreground">Coherence</div>
        </div>
        <div className="text-center">
          <div className={`text-sm font-medium ${getMetricColor(project?.metrics?.quality, { high: 80, medium: 65 })}`}>
            {project?.metrics?.quality}%
          </div>
          <div className="text-xs text-muted-foreground">Quality</div>
        </div>
        <div className="text-center">
          <div className={`text-sm font-medium ${getMetricColor(100 - project?.metrics?.errorRate, { high: 95, medium: 85 })}`}>
            {(100 - project?.metrics?.errorRate)?.toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">Success</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {project?.tags?.slice(0, 3)?.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
            {tag}
          </span>
        ))}
        {project?.tags?.length > 3 && (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
            +{project?.tags?.length - 3}
          </span>
        )}
      </div>
      {isSelected && (
        <div className="pt-3 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCustomize(project?.id)}
            className="w-full"
            iconName="Settings"
            iconPosition="left"
          >
            Customize
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;