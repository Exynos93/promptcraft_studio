import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TopActionBar = ({ 
  viewMode, 
  onViewModeChange, 
  sortBy, 
  onSortChange, 
  searchQuery, 
  onSearchChange, 
  onNewProject 
}) => {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const sortOptions = [
    { value: 'recent', label: 'Most Recent', icon: 'Clock' },
    { value: 'performance', label: 'Best Performance', icon: 'TrendingUp' },
    { value: 'alphabetical', label: 'Alphabetical', icon: 'AlphabeticalOrder' },
    { value: 'progress', label: 'Progress', icon: 'BarChart3' },
    { value: 'team-size', label: 'Team Size', icon: 'Users' }
  ];

  const getSortLabel = () => {
    const option = sortOptions?.find(opt => opt?.value === sortBy);
    return option ? option?.label : 'Sort by';
  };

  const getSortIcon = () => {
    const option = sortOptions?.find(opt => opt?.value === sortBy);
    return option ? option?.icon : 'ArrowUpDown';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        {/* Left Section - Search */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={16} className="text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search projects by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              iconName={getSortIcon()}
              iconPosition="left"
              iconSize={16}
              className="min-w-0"
            >
              <span className="hidden sm:inline">{getSortLabel()}</span>
              <Icon name="ChevronDown" size={16} className="ml-2" />
            </Button>

            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-1 w-56 bg-popover border border-border rounded-lg shadow-elevation-2 z-50">
                <div className="py-2">
                  {sortOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => {
                        onSortChange(option?.value);
                        setShowSortDropdown(false);
                      }}
                      className={`flex items-center space-x-3 w-full px-3 py-2 text-sm transition-micro ${
                        sortBy === option?.value
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={option?.icon} size={16} />
                      <span>{option?.label}</span>
                      {sortBy === option?.value && (
                        <Icon name="Check" size={16} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              iconName="Grid3X3"
              iconSize={16}
              className="w-10 h-8"
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              iconName="List"
              iconSize={16}
              className="w-10 h-8"
            />
          </div>

          {/* New Project Button */}
          <Button
            onClick={onNewProject}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            New Project
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopActionBar;