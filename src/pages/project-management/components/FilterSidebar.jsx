import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, savedPresets, onSavePreset, onLoadPreset }) => {
  const [presetName, setPresetName] = useState('');
  const [showPresetInput, setShowPresetInput] = useState(false);

  const statusOptions = [
    { value: 'active', label: 'Active', count: 12 },
    { value: 'completed', label: 'Completed', count: 8 },
    { value: 'paused', label: 'Paused', count: 3 },
    { value: 'archived', label: 'Archived', count: 5 }
  ];

  const strategyOptions = [
    { value: 'role-prompting', label: 'Role Prompting', count: 15 },
    { value: 'few-shot', label: 'Few-shot Learning', count: 10 },
    { value: 'chain-of-thought', label: 'Chain of Thought', count: 8 },
    { value: 'zero-shot', label: 'Zero-shot', count: 6 }
  ];

  const teamMembers = [
    { id: 1, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Sarah Chen', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Mike Johnson', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
    { id: 4, name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' }
  ];

  const handleStatusChange = (status, checked) => {
    const newStatuses = checked
      ? [...filters?.status, status]
      : filters?.status?.filter(s => s !== status);
    onFiltersChange({ ...filters, status: newStatuses });
  };

  const handleStrategyChange = (strategy, checked) => {
    const newStrategies = checked
      ? [...filters?.strategies, strategy]
      : filters?.strategies?.filter(s => s !== strategy);
    onFiltersChange({ ...filters, strategies: newStrategies });
  };

  const handleTeamMemberChange = (memberId, checked) => {
    const newMembers = checked
      ? [...filters?.teamMembers, memberId]
      : filters?.teamMembers?.filter(id => id !== memberId);
    onFiltersChange({ ...filters, teamMembers: newMembers });
  };

  const handleDateRangeChange = (field, value) => {
    onFiltersChange({
      ...filters,
      dateRange: { ...filters?.dateRange, [field]: value }
    });
  };

  const handleTagsChange = (value) => {
    const tags = value?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag);
    onFiltersChange({ ...filters, tags });
  };

  const handleSavePreset = () => {
    if (presetName?.trim()) {
      onSavePreset(presetName?.trim(), filters);
      setPresetName('');
      setShowPresetInput(false);
    }
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: [],
      strategies: [],
      teamMembers: [],
      dateRange: { start: '', end: '' },
      tags: []
    });
  };

  const hasActiveFilters = filters?.status?.length > 0 || filters?.strategies?.length > 0 || 
    filters?.teamMembers?.length > 0 || filters?.dateRange?.start || filters?.dateRange?.end || 
    filters?.tags?.length > 0;

  return (
    <div className="w-80 bg-card border-r border-border h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
        </div>

        {/* Saved Presets */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-foreground">Saved Presets</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPresetInput(!showPresetInput)}
              iconName="Plus"
              iconSize={14}
            >
              Save
            </Button>
          </div>
          
          {showPresetInput && (
            <div className="mb-3 space-y-2">
              <Input
                type="text"
                placeholder="Preset name"
                value={presetName}
                onChange={(e) => setPresetName(e?.target?.value)}
                className="text-sm"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handleSavePreset}>
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowPresetInput(false);
                    setPresetName('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            {savedPresets?.map((preset, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <button
                  onClick={() => onLoadPreset(preset)}
                  className="text-sm text-foreground hover:text-primary flex-1 text-left"
                >
                  {preset?.name}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6"
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Status</h3>
          <div className="space-y-2">
            {statusOptions?.map((option) => (
              <div key={option?.value} className="flex items-center justify-between">
                <Checkbox
                  label={option?.label}
                  checked={filters?.status?.includes(option?.value)}
                  onChange={(e) => handleStatusChange(option?.value, e?.target?.checked)}
                />
                <span className="text-xs text-muted-foreground">{option?.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Strategy Types</h3>
          <div className="space-y-2">
            {strategyOptions?.map((option) => (
              <div key={option?.value} className="flex items-center justify-between">
                <Checkbox
                  label={option?.label}
                  checked={filters?.strategies?.includes(option?.value)}
                  onChange={(e) => handleStrategyChange(option?.value, e?.target?.checked)}
                />
                <span className="text-xs text-muted-foreground">{option?.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Team Members</h3>
          <div className="space-y-2">
            {teamMembers?.map((member) => (
              <div key={member?.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={filters?.teamMembers?.includes(member?.id)}
                  onChange={(e) => handleTeamMemberChange(member?.id, e?.target?.checked)}
                />
                <img
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-foreground">{member?.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Date Range</h3>
          <div className="space-y-3">
            <Input
              type="date"
              label="Start Date"
              value={filters?.dateRange?.start}
              onChange={(e) => handleDateRangeChange('start', e?.target?.value)}
            />
            <Input
              type="date"
              label="End Date"
              value={filters?.dateRange?.end}
              onChange={(e) => handleDateRangeChange('end', e?.target?.value)}
            />
          </div>
        </div>

        {/* Tags Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Tags</h3>
          <Input
            type="text"
            placeholder="Enter tags separated by commas"
            value={filters?.tags?.join(', ')}
            onChange={(e) => handleTagsChange(e?.target?.value)}
            description="e.g., experimental, production, testing"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;