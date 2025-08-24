import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import CategorySidebar from './components/CategorySidebar';
import SearchBar from './components/SearchBar';
import FeaturedSection from './components/FeaturedSection';
import TemplateGrid from './components/TemplateGrid';
import Icon from '../../components/AppIcon';

const TemplateLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilters, setSelectedFilters] = useState({
    strategy: [],
    difficulty: [],
    popularity: []
  });
  const [loading, setLoading] = useState(false);

  // Mock data
  const categories = [
    { id: 'all', name: 'All Templates', icon: 'Grid3X3', count: 156 },
    { id: 'content', name: 'Content Generation', icon: 'FileText', count: 42 },
    { id: 'analysis', name: 'Analysis & Research', icon: 'Search', count: 38 },
    { id: 'coding', name: 'Code Generation', icon: 'Code', count: 29 },
    { id: 'creative', name: 'Creative Writing', icon: 'Pen', count: 25 },
    { id: 'business', name: 'Business & Marketing', icon: 'Briefcase', count: 22 }
  ];

  const strategyTypes = [
    'Role Prompting',
    'Few-Shot Learning', 
    'Chain-of-Thought',
    'Zero-Shot',
    'Template-Based'
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner', color: 'bg-success' },
    { value: 'intermediate', label: 'Intermediate', color: 'bg-warning' },
    { value: 'advanced', label: 'Advanced', color: 'bg-error' }
  ];

  const allTemplates = [
    {
      id: 1,
      name: "Blog Post Generator",
      description: "Create engaging blog posts with structured content, SEO optimization, and compelling headlines that drive reader engagement.",
      strategy: "Role Prompting",
      difficulty: "beginner",
      rating: 4.8,
      usageCount: 12450,
      lastUpdated: "2 days ago",
      category: "content",
      tags: ["SEO", "Content Marketing", "Blogging"],
      compatibility: ["GPT-4", "Claude", "Gemini"],
      content: `You are an expert content writer and SEO specialist. Create a comprehensive blog post about [TOPIC] that includes:

1. An attention-grabbing headline
2. A compelling introduction that hooks the reader
3. Well-structured main content with subheadings
4. SEO-optimized keywords naturally integrated
5. A strong conclusion with a call-to-action

Target audience: [AUDIENCE]
Tone: [TONE - professional, casual, friendly, etc.]
Word count: [WORD_COUNT]

Please ensure the content is original, valuable, and optimized for search engines while maintaining readability and engagement.`,
      example: `Topic: "Benefits of Remote Work"
Audience: Working professionals
Tone: Professional yet approachable
Word count: 1200 words

Output: A complete blog post with headline, introduction, 5 main sections with subheadings, and conclusion with CTA.`
    },
    {
      id: 2,
      name: "Code Review Assistant",
      description: "Comprehensive code analysis template that identifies bugs, suggests improvements, and ensures best practices compliance.",
      strategy: "Chain-of-Thought",
      difficulty: "advanced",
      rating: 4.9,
      usageCount: 8920,
      lastUpdated: "1 day ago",
      category: "coding",
      tags: ["Code Review", "Best Practices", "Debugging"],
      compatibility: ["GPT-4", "Claude"],
      content: `As a senior software engineer and code reviewer, analyze the following code systematically:

**Step 1: Initial Assessment**
- Language and framework identification
- Overall code structure evaluation
- Immediate red flags or critical issues

**Step 2: Detailed Analysis**
- Logic and algorithm efficiency
- Security vulnerabilities
- Performance bottlenecks
- Code readability and maintainability

**Step 3: Best Practices Check**
- Naming conventions
- Code organization
- Documentation quality
- Error handling

**Step 4: Recommendations**
- Specific improvement suggestions
- Alternative approaches
- Priority ranking of issues

Code to review:
[PASTE_CODE_HERE]

Provide detailed feedback with examples and explanations for each recommendation.`,
      example: `Input: Python function for user authentication
Output: Detailed review covering security issues, error handling improvements, code structure suggestions, and refactored code examples.`
    },
    {
      id: 3,
      name: "Market Research Analyzer",
      description: "Analyze market trends, competitor strategies, and consumer behavior to provide actionable business insights.",
      strategy: "Few-Shot Learning",
      difficulty: "intermediate",
      rating: 4.7,
      usageCount: 6780,
      lastUpdated: "3 days ago",
      category: "analysis",
      tags: ["Market Research", "Business Intelligence", "Competitive Analysis"],
      compatibility: ["GPT-4", "Claude", "Gemini"],
      content: `You are a market research analyst. Analyze the provided market data and generate insights following this structure:

**Example Analysis 1:**
Market: Electric Vehicles
Data: Sales figures, consumer surveys, competitor pricing
Output: Growth trends, market opportunities, consumer preferences, competitive landscape

**Example Analysis 2:**
Market: Streaming Services
Data: Subscription numbers, content spending, user engagement
Output: Market saturation analysis, content strategy insights, pricing optimization

**Your Analysis:**
Market: [MARKET_NAME]
Data: [PROVIDED_DATA]

Please provide:
1. Market size and growth trends
2. Key player analysis
3. Consumer behavior insights
4. Opportunities and threats
5. Strategic recommendations

Use data-driven insights and industry benchmarks to support your analysis.`,
      example: `Market: Sustainable Fashion
Data: Consumer survey results, sales data, competitor analysis
Output: Comprehensive market analysis with growth projections, consumer sentiment, and strategic recommendations.`
    },
    {
      id: 4,
      name: "Creative Story Prompt",
      description: "Generate compelling story ideas, character development, and plot structures for creative writing projects.",
      strategy: "Template-Based",
      difficulty: "beginner",
      rating: 4.6,
      usageCount: 15230,
      lastUpdated: "1 week ago",
      category: "creative",
      tags: ["Creative Writing", "Storytelling", "Character Development"],
      compatibility: ["GPT-4", "Claude", "Gemini"],
      content: `Create a compelling story concept with the following elements:

**Genre:** [GENRE]
**Setting:** [TIME_PERIOD] in [LOCATION]
**Main Character:** [CHARACTER_DESCRIPTION]

**Story Elements to Include:**
1. **Protagonist:** Name, age, background, primary motivation
2. **Central Conflict:** What challenge or problem drives the story?
3. **Supporting Characters:** 2-3 key characters and their relationships
4. **Plot Structure:** 
   - Inciting incident
   - Rising action (3 key events)
   - Climax
   - Resolution
5. **Themes:** What deeper messages or questions does the story explore?
6. **Unique Elements:** What makes this story stand out?

**Additional Requirements:**
- Target audience: [AUDIENCE]
- Estimated length: [LENGTH]
- Tone: [TONE]

Provide a detailed story outline that could serve as the foundation for a complete narrative.`,
      example: `Genre: Science Fiction
Setting: 2087 in Neo-Tokyo
Character: Young hacker discovering corporate conspiracy
Output: Complete story concept with character profiles, plot outline, and thematic elements.`
    },
    {
      id: 5,
      name: "Business Proposal Generator",
      description: "Create professional business proposals with executive summaries, project scopes, and compelling value propositions.",
      strategy: "Role Prompting",
      difficulty: "intermediate",
      rating: 4.8,
      usageCount: 9340,
      lastUpdated: "4 days ago",
      category: "business",
      tags: ["Business Proposals", "Sales", "Project Management"],
      compatibility: ["GPT-4", "Claude"],
      content: `You are a business development expert creating a professional proposal. Structure your proposal as follows:

**1. Executive Summary**
- Brief overview of the proposed solution
- Key benefits and value proposition
- Investment required and expected ROI

**2. Problem Statement**
- Clear definition of the client's challenge
- Impact of the current situation
- Urgency and importance of addressing it

**3. Proposed Solution**
- Detailed description of your approach
- Why this solution is optimal
- Unique advantages and differentiators

**4. Implementation Plan**
- Project phases and timeline
- Key milestones and deliverables
- Resource requirements

**5. Investment and ROI**
- Detailed cost breakdown
- Expected returns and benefits
- Payment terms and schedule

**6. About Us**
- Company credentials and experience
- Team qualifications
- Success stories and testimonials

**Project Details:**
Client: [CLIENT_NAME]
Industry: [INDUSTRY]
Challenge: [SPECIFIC_CHALLENGE]
Budget Range: [BUDGET]
Timeline: [TIMELINE]

Create a compelling, professional proposal that addresses the client's specific needs and demonstrates clear value.`,
      example: `Client: Tech Startup
Challenge: Need digital marketing strategy
Budget: $50K-100K
Output: Complete business proposal with strategy, timeline, costs, and expected outcomes.`
    },
    {
      id: 6,
      name: "Data Analysis Report",
      description: "Transform raw data into actionable insights with statistical analysis, visualizations, and strategic recommendations.",
      strategy: "Chain-of-Thought",
      difficulty: "advanced",
      rating: 4.9,
      usageCount: 5670,
      lastUpdated: "5 days ago",
      category: "analysis",
      tags: ["Data Analysis", "Statistics", "Business Intelligence"],
      compatibility: ["GPT-4", "Claude"],
      content: `As a data analyst, create a comprehensive analysis report following this systematic approach:

**Step 1: Data Overview**
- Dataset description and source
- Key variables and metrics
- Data quality assessment
- Sample size and time period

**Step 2: Exploratory Analysis**
- Descriptive statistics summary
- Distribution patterns
- Outliers and anomalies identification
- Initial observations

**Step 3: Statistical Analysis**
- Correlation analysis
- Trend identification
- Significance testing
- Comparative analysis

**Step 4: Key Findings**
- Most important insights
- Surprising discoveries
- Pattern explanations
- Statistical significance

**Step 5: Business Implications**
- Strategic recommendations
- Action items
- Risk assessment
- Opportunity identification

**Step 6: Visualization Recommendations**
- Suggested chart types
- Key metrics to highlight
- Dashboard components

Dataset: [DESCRIBE_YOUR_DATA]
Business Context: [BUSINESS_CONTEXT]
Specific Questions: [ANALYSIS_QUESTIONS]

Provide detailed analysis with supporting evidence and clear recommendations.`,
      example: `Dataset: E-commerce sales data (12 months)
Context: Online retail performance analysis
Output: Complete analysis report with trends, customer insights, and growth recommendations.`
    }
  ];

  // Featured templates (subset of all templates)
  const featuredTemplates = allTemplates?.slice(0, 3);

  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    let filtered = allTemplates;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(template => template?.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(template =>
        template?.name?.toLowerCase()?.includes(query) ||
        template?.description?.toLowerCase()?.includes(query) ||
        template?.tags?.some(tag => tag?.toLowerCase()?.includes(query)) ||
        template?.content?.toLowerCase()?.includes(query)
      );
    }

    // Strategy filter
    if (selectedFilters?.strategy?.length > 0) {
      filtered = filtered?.filter(template =>
        selectedFilters?.strategy?.includes(template?.strategy)
      );
    }

    // Difficulty filter
    if (selectedFilters?.difficulty?.length > 0) {
      filtered = filtered?.filter(template =>
        selectedFilters?.difficulty?.includes(template?.difficulty)
      );
    }

    // Sort templates
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b?.usageCount - a?.usageCount;
        case 'rating':
          return b?.rating - a?.rating;
        case 'recent':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'alphabetical':
          return a?.name?.localeCompare(b?.name);
        case 'usage':
          return b?.usageCount - a?.usageCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchQuery, selectedFilters, sortBy]);

  const handleFilterChange = (filterType, values) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: values
    }));
  };

  // Simulate loading when filters change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedFilters, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-15 flex h-screen">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            categories={categories}
            strategyTypes={strategyTypes}
            difficultyLevels={difficultyLevels}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onViewModeChange={setViewMode}
            viewMode={viewMode}
          />

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Template Library</h1>
                    <p className="text-muted-foreground">
                      Discover and utilize pre-built prompt templates for various AI use cases and strategies
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="FileText" size={16} />
                      <span>{filteredTemplates?.length} templates</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Filter" size={16} />
                      <span>{Object.values(selectedFilters)?.flat()?.length} filters</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Section - only show when no search/filters */}
              {!searchQuery && selectedCategory === 'all' && Object.values(selectedFilters)?.every(f => f?.length === 0) && (
                <FeaturedSection 
                  featuredTemplates={featuredTemplates} 
                  viewMode={viewMode}
                />
              )}

              {/* Templates Grid */}
              <div className="mb-8">
                {searchQuery || selectedCategory !== 'all' || Object.values(selectedFilters)?.some(f => f?.length > 0) ? (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      {searchQuery ? 'Search Results' : 'Templates'}
                    </h2>
                    <p className="text-muted-foreground">
                      {filteredTemplates?.length} template{filteredTemplates?.length !== 1 ? 's' : ''} found
                    </p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-foreground mb-2">All Templates</h2>
                    <p className="text-muted-foreground">
                      Browse our complete collection of prompt templates
                    </p>
                  </div>
                )}

                <TemplateGrid
                  templates={filteredTemplates}
                  viewMode={viewMode}
                  loading={loading}
                  searchQuery={searchQuery}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Sidebar Overlay */}
      <div className="lg:hidden">
        {/* Mobile sidebar implementation would go here */}
      </div>
    </div>
  );
};

export default TemplateLibrary;