import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onEdit, onDuplicate, onShare, onDelete, isSelected, onSelect }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'paused': return 'bg-warning text-warning-foreground';
      case 'archived': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStrategyIcon = (strategy) => {
    switch (strategy) {
      case 'role-prompting': return 'User';
      case 'few-shot': return 'Target';
      case 'chain-of-thought': return 'GitBranch';
      case 'zero-shot': return 'Zap';
      default: return 'MessageSquare';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-state ${
      isSelected ? 'ring-2 ring-primary' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(project?.id, e?.target?.checked)}
            className="mt-1 w-4 h-4 text-primary border-border rounded focus:ring-primary"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
              {project?.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project?.description}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
            {project?.status}
          </span>
        </div>
      </div>
      {/* Strategy Types */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project?.strategies?.map((strategy, index) => (
          <div key={index} className="flex items-center space-x-1 bg-muted px-2 py-1 rounded-md">
            <Icon name={getStrategyIcon(strategy)} size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground capitalize">
              {strategy?.replace('-', ' ')}
            </span>
          </div>
        ))}
      </div>
      {/* Team Members */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Team:</span>
          <div className="flex -space-x-2">
            {project?.teamMembers?.slice(0, 3)?.map((member, index) => (
              <div key={index} className="relative">
                <Image
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-6 h-6 rounded-full border-2 border-card"
                />
              </div>
            ))}
            {project?.teamMembers?.length > 3 && (
              <div className="w-6 h-6 bg-muted rounded-full border-2 border-card flex items-center justify-center">
                <span className="text-xs text-muted-foreground">
                  +{project?.teamMembers?.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
        {project?.isLiveEditing && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-success">Live</span>
          </div>
        )}
      </div>
      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress</span>
          <span className="text-sm font-medium text-foreground">{project?.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${project?.progress}%` }}
          ></div>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">{project?.metrics?.tests}</div>
          <div className="text-xs text-muted-foreground">Tests</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-success">{project?.metrics?.successRate}%</div>
          <div className="text-xs text-muted-foreground">Success</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">{project?.metrics?.avgScore}</div>
          <div className="text-xs text-muted-foreground">Avg Score</div>
        </div>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Updated {project?.lastActivity}
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(project?.id)}
            className="w-8 h-8"
          >
            <Icon name="Edit3" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDuplicate(project?.id)}
            className="w-8 h-8"
          >
            <Icon name="Copy" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onShare(project?.id)}
            className="w-8 h-8"
          >
            <Icon name="Share2" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(project?.id)}
            className="w-8 h-8 text-error hover:text-error"
          >
            <Icon name="Trash2" size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;