import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const NewProjectModal = ({ isOpen, onClose, onCreateProject }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    strategies: [],
    teamMembers: [],
    tags: '',
    template: ''
  });

  const [errors, setErrors] = useState({});

  const strategyOptions = [
    { value: 'role-prompting', label: 'Role Prompting', description: 'Define specific roles for the AI' },
    { value: 'few-shot', label: 'Few-shot Learning', description: 'Provide examples to guide responses' },
    { value: 'chain-of-thought', label: 'Chain of Thought', description: 'Step-by-step reasoning approach' },
    { value: 'zero-shot', label: 'Zero-shot', description: 'Direct prompting without examples' }
  ];

  const teamMembers = [
    { id: 1, name: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', role: 'Lead Engineer' },
    { id: 2, name: 'Sarah Chen', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', role: 'AI Researcher' },
    { id: 3, name: 'Mike Johnson', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', role: 'Data Scientist' },
    { id: 4, name: 'Emily Davis', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', role: 'Product Manager' }
  ];

  const templates = [
    { value: '', label: 'Start from scratch' },
    { value: 'chatbot', label: 'Chatbot Assistant' },
    { value: 'content-generation', label: 'Content Generation' },
    { value: 'data-analysis', label: 'Data Analysis' },
    { value: 'code-assistant', label: 'Code Assistant' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleStrategyChange = (strategy, checked) => {
    const newStrategies = checked
      ? [...formData?.strategies, strategy]
      : formData?.strategies?.filter(s => s !== strategy);
    handleInputChange('strategies', newStrategies);
  };

  const handleTeamMemberChange = (memberId, checked) => {
    const newMembers = checked
      ? [...formData?.teamMembers, memberId]
      : formData?.teamMembers?.filter(id => id !== memberId);
    handleInputChange('teamMembers', newMembers);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.title?.trim()) {
      newErrors.title = 'Project title is required';
    }
    
    if (!formData?.description?.trim()) {
      newErrors.description = 'Project description is required';
    }
    
    if (formData?.strategies?.length === 0) {
      newErrors.strategies = 'Please select at least one strategy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      const projectData = {
        ...formData,
        tags: formData?.tags?.split(',')?.map(tag => tag?.trim())?.filter(tag => tag),
        createdAt: new Date()?.toISOString()
      };
      onCreateProject(projectData);
      onClose();
      // Reset form
      setFormData({
        title: '',
        description: '',
        strategies: [],
        teamMembers: [],
        tags: '',
        template: ''
      });
      setErrors({});
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Create New Project</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Set up a new prompt engineering project with your preferred strategies and team
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Template Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Start with a template (optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {templates?.map((template) => (
                <button
                  key={template?.value}
                  type="button"
                  onClick={() => handleInputChange('template', template?.value)}
                  className={`p-3 border rounded-lg text-left transition-micro ${
                    formData?.template === template?.value
                      ? 'border-primary bg-primary bg-opacity-5' :'border-border hover:border-muted-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      formData?.template === template?.value
                        ? 'border-primary bg-primary' :'border-muted-foreground'
                    }`}>
                      {formData?.template === template?.value && (
                        <div className="w-full h-full rounded-full bg-primary"></div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-foreground">{template?.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Project Title"
              type="text"
              placeholder="Enter project title"
              value={formData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              error={errors?.title}
              required
            />
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Description
              </label>
              <textarea
                placeholder="Describe your project goals and objectives"
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                className={`w-full px-3 py-2 border rounded-lg text-sm resize-none h-24 ${
                  errors?.description ? 'border-error' : 'border-border'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors?.description && (
                <p className="text-sm text-error mt-1">{errors?.description}</p>
              )}
            </div>
          </div>

          {/* Strategy Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Prompt Strategies
            </label>
            <div className="space-y-3">
              {strategyOptions?.map((strategy) => (
                <div key={strategy?.value} className="border border-border rounded-lg p-3">
                  <Checkbox
                    label={strategy?.label}
                    description={strategy?.description}
                    checked={formData?.strategies?.includes(strategy?.value)}
                    onChange={(e) => handleStrategyChange(strategy?.value, e?.target?.checked)}
                  />
                </div>
              ))}
            </div>
            {errors?.strategies && (
              <p className="text-sm text-error mt-2">{errors?.strategies}</p>
            )}
          </div>

          {/* Team Members */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">
              Team Members (optional)
            </label>
            <div className="space-y-2">
              {teamMembers?.map((member) => (
                <div key={member?.id} className="flex items-center space-x-3 p-2 hover:bg-muted rounded-lg transition-micro">
                  <Checkbox
                    checked={formData?.teamMembers?.includes(member?.id)}
                    onChange={(e) => handleTeamMemberChange(member?.id, e?.target?.checked)}
                  />
                  <img
                    src={member?.avatar}
                    alt={member?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{member?.name}</div>
                    <div className="text-xs text-muted-foreground">{member?.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <Input
            label="Tags (optional)"
            type="text"
            placeholder="experimental, production, testing"
            value={formData?.tags}
            onChange={(e) => handleInputChange('tags', e?.target?.value)}
            description="Separate tags with commas"
          />

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProjectModal;