import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplateLibrary = ({ onTemplateSelect, isCollapsed, onToggleCollapse }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templateCategories = [
    { id: 'all', name: 'All Templates', count: 24 },
    { id: 'role-prompting', name: 'Role Prompting', count: 8 },
    { id: 'few-shot', name: 'Few-Shot Learning', count: 6 },
    { id: 'chain-of-thought', name: 'Chain of Thought', count: 5 },
    { id: 'creative', name: 'Creative Writing', count: 3 },
    { id: 'analysis', name: 'Data Analysis', count: 2 }
  ];

  const promptTemplates = [
    {
      id: 1,
      name: 'Expert Consultant',
      category: 'role-prompting',
      description: 'Act as an expert consultant in a specific domain',
      content: `You are an expert consultant in {domain}. Your task is to provide comprehensive, actionable advice based on industry best practices and your extensive experience.\n\nContext: {context}\n\nPlease provide:\n1. Analysis of the current situation\n2. Specific recommendations\n3. Implementation steps\n4. Potential risks and mitigation strategies`,
      tags: ['consulting', 'expertise', 'analysis'],
      usage: 156
    },
    {
      id: 2,
      name: 'Code Review Assistant',
      category: 'role-prompting',
      description: 'Comprehensive code review with suggestions',
      content: `You are a senior software engineer conducting a thorough code review. Analyze the following code and provide detailed feedback.\n\nCode:\n{code}\n\nPlease review for:\n- Code quality and readability\n- Performance optimizations\n- Security vulnerabilities\n- Best practices adherence\n- Potential bugs or edge cases`,
      tags: ['code', 'review', 'programming'],
      usage: 203
    },
    {
      id: 3,
      name: 'Few-Shot Classification',
      category: 'few-shot',
      description: 'Text classification with examples',
      content: `Classify the following text into one of these categories: {categories}\n\nExamples:\nText: "The quarterly earnings exceeded expectations"\nCategory: Business\n\nText: "New breakthrough in quantum computing research"\nCategory: Technology\n\nText: "Local team wins championship game"\nCategory: Sports\n\nNow classify:\nText: {input_text}\nCategory:`,
      tags: ['classification', 'examples', 'categorization'],
      usage: 89
    },
    {
      id: 4,
      name: 'Step-by-Step Problem Solving',
      category: 'chain-of-thought',
      description: 'Structured problem-solving approach',
      content: `Let's solve this problem step by step.\n\nProblem: {problem}\n\nStep 1: Understanding the problem\n- What are we trying to solve?\n- What information do we have?\n- What are the constraints?\n\nStep 2: Breaking down the problem\n- What are the key components?\n- How do they relate to each other?\n\nStep 3: Developing a solution approach\n- What methods can we use?\n- What's the most logical sequence?\n\nStep 4: Implementation\n- Execute the solution step by step\n- Show all calculations/reasoning\n\nStep 5: Verification\n- Check if the solution makes sense\n- Validate against the original problem`,
      tags: ['problem-solving', 'structured', 'reasoning'],
      usage: 134
    },
    {
      id: 5,
      name: 'Creative Story Generator',
      category: 'creative',
      description: 'Generate engaging stories with specific elements',
      content: `Create an engaging story with the following elements:\n\nGenre: {genre}\nSetting: {setting}\nMain Character: {character}\nConflict: {conflict}\nTone: {tone}\n\nRequirements:\n- 500-800 words\n- Include dialogue\n- Build tension and resolution\n- Use vivid descriptions\n- Maintain consistent point of view\n\nBegin the story:`,
      tags: ['creative', 'storytelling', 'narrative'],
      usage: 67
    },
    {
      id: 6,
      name: 'Data Analysis Report',
      category: 'analysis',
      description: 'Comprehensive data analysis and insights',
      content: `Analyze the following dataset and provide a comprehensive report.\n\nDataset: {dataset_description}\nData: {data}\n\nPlease provide:\n\n1. Executive Summary\n   - Key findings\n   - Main insights\n   - Recommendations\n\n2. Data Overview\n   - Dataset characteristics\n   - Data quality assessment\n   - Missing values or anomalies\n\n3. Statistical Analysis\n   - Descriptive statistics\n   - Trends and patterns\n   - Correlations\n\n4. Visualizations Recommended\n   - Chart types suggested\n   - Key metrics to highlight\n\n5. Actionable Insights\n   - Business implications\n   - Next steps\n   - Areas for further investigation`,
      tags: ['analysis', 'data', 'insights'],
      usage: 45
    }
  ];

  const filteredTemplates = promptTemplates?.filter(template => {
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         template?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template) => {
    onTemplateSelect(template);
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-card border-r border-border flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="mb-4"
        >
          <Icon name="PanelLeftOpen" size={20} />
        </Button>
        <div className="flex flex-col space-y-2">
          <Button variant="ghost" size="icon" title="Templates">
            <Icon name="FileText" size={18} />
          </Button>
          <Button variant="ghost" size="icon" title="Search">
            <Icon name="Search" size={18} />
          </Button>
          <Button variant="ghost" size="icon" title="Categories">
            <Icon name="Filter" size={18} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-r border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Template Library</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
          >
            <Icon name="PanelLeftClose" size={20} />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>
      {/* Categories */}
      <div className="p-4 border-b border-border">
        <h3 className="text-sm font-medium text-foreground mb-2">Categories</h3>
        <div className="space-y-1">
          {templateCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-micro ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <span>{category?.name}</span>
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
      {/* Templates List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredTemplates?.map((template) => (
            <div
              key={template?.id}
              className="p-3 bg-background border border-border rounded-lg hover:shadow-elevation-1 transition-micro cursor-pointer"
              onClick={() => handleTemplateSelect(template)}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground text-sm">{template?.name}</h4>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Icon name="Eye" size={12} />
                  <span>{template?.usage}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{template?.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {template?.tags?.slice(0, 2)?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {template?.tags?.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{template?.tags?.length - 2}</span>
                  )}
                </div>
                <Button variant="ghost" size="xs">
                  <Icon name="Plus" size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateLibrary;