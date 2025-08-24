import React from 'react';
import Icon from '../../../components/AppIcon';

const CategorySidebar = ({ 
  selectedCategory, 
  onCategoryChange, 
  selectedFilters, 
  onFilterChange,
  categories,
  strategyTypes,
  difficultyLevels 
}) => {
  const handleFilterToggle = (filterType, value) => {
    const currentFilters = selectedFilters?.[filterType] || [];
    const newFilters = currentFilters?.includes(value)
      ? currentFilters?.filter(f => f !== value)
      : [...currentFilters, value];
    
    onFilterChange(filterType, newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange('strategy', []);
    onFilterChange('difficulty', []);
    onFilterChange('popularity', []);
  };

  const hasActiveFilters = Object.values(selectedFilters)?.some(filters => filters?.length > 0);

  return (
    <div className="w-full h-full bg-card border-r border-border p-6">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">Categories</h3>
        <div className="space-y-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-micro ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={category?.icon} size={18} />
                <span className="font-medium">{category?.name}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {category?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Filters */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary/80 transition-micro"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Strategy Type Filter */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Strategy Type</h4>
          <div className="space-y-2">
            {strategyTypes?.map((strategy) => (
              <label key={strategy} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters?.strategy?.includes(strategy) || false}
                  onChange={() => handleFilterToggle('strategy', strategy)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-foreground">{strategy}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Difficulty Level Filter */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Difficulty Level</h4>
          <div className="space-y-2">
            {difficultyLevels?.map((level) => (
              <label key={level?.value} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters?.difficulty?.includes(level?.value) || false}
                  onChange={() => handleFilterToggle('difficulty', level?.value)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-foreground">{level?.label}</span>
                  <div className={`w-2 h-2 rounded-full ${level?.color}`}></div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Popularity Filter */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Popularity</h4>
          <div className="space-y-2">
            {['Most Popular', 'Trending', 'Recently Added']?.map((popularity) => (
              <label key={popularity} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFilters?.popularity?.includes(popularity) || false}
                  onChange={() => handleFilterToggle('popularity', popularity)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="text-sm text-foreground">{popularity}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;