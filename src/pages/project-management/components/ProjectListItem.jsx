import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectListItem = ({ project, onEdit, onDuplicate, onShare, onDelete, isSelected, onSelect }) => {
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
    <div className={`bg-card border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-state ${
      isSelected ? 'ring-2 ring-primary' : ''
    }`}>
      <div className="flex items-center space-x-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(project?.id, e?.target?.checked)}
          className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
        />

        {/* Project Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-foreground truncate">
              {project?.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
              {project?.status}
            </span>
            {project?.isLiveEditing && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-success">Live</span>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
            {project?.description}
          </p>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Updated {project?.lastActivity}</span>
            <span>•</span>
            <span>{project?.metrics?.tests} tests</span>
            <span>•</span>
            <span className="text-success">{project?.metrics?.successRate}% success</span>
          </div>
        </div>

        {/* Strategies */}
        <div className="hidden md:flex flex-wrap gap-1 w-48">
          {project?.strategies?.slice(0, 3)?.map((strategy, index) => (
            <div key={index} className="flex items-center space-x-1 bg-muted px-2 py-1 rounded-md">
              <Icon name={getStrategyIcon(strategy)} size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground capitalize">
                {strategy?.replace('-', ' ')}
              </span>
            </div>
          ))}
          {project?.strategies?.length > 3 && (
            <div className="bg-muted px-2 py-1 rounded-md">
              <span className="text-xs text-muted-foreground">
                +{project?.strategies?.length - 3}
              </span>
            </div>
          )}
        </div>

        {/* Team Members */}
        <div className="hidden lg:flex items-center space-x-2 w-32">
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

        {/* Progress */}
        <div className="hidden xl:block w-24">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Progress</span>
            <span className="text-xs font-medium text-foreground">{project?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${project?.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Actions */}
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

export default ProjectListItem;