import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, sortBy, onSortChange, onViewModeChange, viewMode }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const sortOptions = [
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'recent', label: 'Recently Added', icon: 'Clock' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'alphabetical', label: 'A-Z', icon: 'ArrowUpDown' },
    { value: 'usage', label: 'Most Used', icon: 'Users' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', tooltip: 'Grid View' },
    { value: 'list', icon: 'List', tooltip: 'List View' }
  ];

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search Input */}
        <div className="flex-1 lg:max-w-md">
          <div className={`relative transition-micro ${isSearchFocused ? 'ring-2 ring-primary/20' : ''} rounded-lg`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={18} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search templates by keyword, tag, or content..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-micro"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon name="X" size={16} className="text-muted-foreground hover:text-foreground transition-micro" />
              </button>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e?.target?.value)}
              className="appearance-none bg-background border border-border rounded-lg px-4 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-micro"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            {viewModes?.map((mode) => (
              <button
                key={mode?.value}
                onClick={() => onViewModeChange(mode?.value)}
                className={`p-2 rounded-md transition-micro ${
                  viewMode === mode?.value
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title={mode?.tooltip}
              >
                <Icon name={mode?.icon} size={16} />
              </button>
            ))}
          </div>

          {/* Advanced Search Button */}
          <Button variant="outline" size="sm">
            <Icon name="SlidersHorizontal" size={16} />
            <span className="hidden sm:inline ml-2">Advanced</span>
          </Button>
        </div>
      </div>
      {/* Search Results Info */}
      {searchQuery && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Search results for "<span className="text-foreground font-medium">{searchQuery}</span>"
          </p>
          <button
            onClick={() => onSearchChange('')}
            className="text-sm text-primary hover:text-primary/80 transition-micro"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;