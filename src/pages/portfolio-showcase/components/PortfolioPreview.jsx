import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PortfolioPreview = ({ selectedProjects, projects, settings, onExport }) => {
  const selectedProjectData = projects?.filter(p => selectedProjects?.includes(p?.id));
  
  const getThemeStyles = () => {
    switch (settings?.theme) {
      case 'technical':
        return {
          headerBg: 'bg-gray-900',
          headerText: 'text-white',
          accentColor: 'text-blue-400',
          codeBlock: 'bg-gray-800 text-green-400'
        };
      case 'academic':
        return {
          headerBg: 'bg-blue-50',
          headerText: 'text-blue-900',
          accentColor: 'text-blue-600',
          codeBlock: 'bg-blue-100 text-blue-800'
        };
      case 'creative':
        return {
          headerBg: 'bg-gradient-to-r from-purple-500 to-pink-500',
          headerText: 'text-white',
          accentColor: 'text-purple-600',
          codeBlock: 'bg-purple-100 text-purple-800'
        };
      default: // professional
        return {
          headerBg: 'bg-primary',
          headerText: 'text-primary-foreground',
          accentColor: 'text-primary',
          codeBlock: 'bg-muted text-foreground'
        };
    }
  };

  const themeStyles = getThemeStyles();

  const calculateOverallMetrics = () => {
    if (selectedProjectData?.length === 0) return { coherence: 0, quality: 0, successRate: 0 };
    
    const totals = selectedProjectData?.reduce((acc, project) => ({
      coherence: acc?.coherence + project?.metrics?.coherence,
      quality: acc?.quality + project?.metrics?.quality,
      successRate: acc?.successRate + (100 - project?.metrics?.errorRate)
    }), { coherence: 0, quality: 0, successRate: 0 });

    return {
      coherence: Math.round(totals?.coherence / selectedProjectData?.length),
      quality: Math.round(totals?.quality / selectedProjectData?.length),
      successRate: Math.round(totals?.successRate / selectedProjectData?.length)
    };
  };

  const overallMetrics = calculateOverallMetrics();

  const renderCodeExample = (project) => {
    const codeExample = `# ${project?.title}

## Prompt Strategy: ${project?.strategy}

\`\`\`python
# Example implementation
prompt_template = """
${project?.promptTemplate || `You are an expert ${project?.strategy} assistant.
Please analyze the following input and provide a detailed response.

Input: {user_input}
Context: {context}

Response:`}
"""

# Usage
response = ai_model.generate(
    prompt=prompt_template.format(
        user_input=user_query,
        context=relevant_context
    ),
    max_tokens=500,
    temperature=0.7
)
\`\`\`

## Performance Metrics
- Coherence Score: ${project?.metrics?.coherence}%
- Quality Score: ${project?.metrics?.quality}%
- Error Rate: ${project?.metrics?.errorRate}%`;

    return codeExample;
  };

  if (selectedProjects?.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20">
        <div className="text-center">
          <Icon name="FileText" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Selected</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Select projects from the left panel to see your portfolio preview
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="ArrowLeft" size={16} />
            <span>Choose projects to get started</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Preview Header */}
      <div className="p-6 border-b border-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Portfolio Preview</h2>
            <p className="text-sm text-muted-foreground">
              {selectedProjects?.length} project{selectedProjects?.length !== 1 ? 's' : ''} • {settings?.theme} theme
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('github')}
              iconName="Github"
              iconPosition="left"
            >
              GitHub README
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport('pdf')}
              iconName="FileDown"
              iconPosition="left"
            >
              Export PDF
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onExport('web')}
              iconName="Globe"
              iconPosition="left"
            >
              Web Showcase
            </Button>
          </div>
        </div>
      </div>
      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Portfolio Header */}
          <div className={`${themeStyles?.headerBg} ${themeStyles?.headerText} rounded-lg p-8 mb-8`}>
            <h1 className="text-3xl font-bold mb-4">Prompt Engineering Portfolio</h1>
            <p className="text-lg opacity-90 mb-6">
              A comprehensive showcase of advanced prompt engineering techniques and methodologies
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{overallMetrics?.coherence}%</div>
                <div className="text-sm opacity-80">Avg Coherence</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{overallMetrics?.quality}%</div>
                <div className="text-sm opacity-80">Avg Quality</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{overallMetrics?.successRate}%</div>
                <div className="text-sm opacity-80">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          {settings?.sections?.summary && (
            <section className="mb-8">
              <h2 className={`text-2xl font-bold ${themeStyles?.accentColor} mb-4`}>Executive Summary</h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <p className="text-foreground leading-relaxed">
                  This portfolio demonstrates expertise in advanced prompt engineering across {selectedProjects?.length} distinct projects, 
                  showcasing proficiency in multiple prompting strategies including role-based prompting, few-shot learning, 
                  and chain-of-thought reasoning. The projects collectively achieve an average coherence score of {overallMetrics?.coherence}% 
                  and quality rating of {overallMetrics?.quality}%, with a {overallMetrics?.successRate}% success rate across diverse use cases.
                </p>
              </div>
            </section>
          )}

          {/* Methodology Overview */}
          {settings?.sections?.methodology && (
            <section className="mb-8">
              <h2 className={`text-2xl font-bold ${themeStyles?.accentColor} mb-4`}>Methodology Overview</h2>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Strategies Employed</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      {[...new Set(selectedProjectData.map(p => p.strategy))]?.map((strategy, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Icon name="CheckCircle" size={16} className="text-success" />
                          <span className="capitalize">{strategy?.replace('-', ' ')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Evaluation Metrics</h3>
                    <ul className="space-y-1 text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <Icon name="Target" size={16} className="text-primary" />
                        <span>Coherence Scoring</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="Award" size={16} className="text-primary" />
                        <span>Quality Assessment</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Icon name="TrendingUp" size={16} className="text-primary" />
                        <span>Error Rate Tracking</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Project Showcase */}
          <section className="mb-8">
            <h2 className={`text-2xl font-bold ${themeStyles?.accentColor} mb-6`}>Featured Projects</h2>
            <div className="space-y-8">
              {selectedProjectData?.map((project, index) => (
                <div key={project?.id} className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{project?.title}</h3>
                        <p className="text-muted-foreground mb-3">{project?.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Icon name="Calendar" size={14} />
                            <span>{project?.date}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Zap" size={14} />
                            <span className="capitalize">{project?.strategy?.replace('-', ' ')}</span>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success">{project?.metrics?.coherence}%</div>
                        <div className="text-sm text-muted-foreground">Coherence</div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    {settings?.sections?.metrics && (
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-muted rounded-lg p-4 text-center">
                          <div className="text-lg font-semibold text-foreground">{project?.metrics?.coherence}%</div>
                          <div className="text-sm text-muted-foreground">Coherence</div>
                        </div>
                        <div className="bg-muted rounded-lg p-4 text-center">
                          <div className="text-lg font-semibold text-foreground">{project?.metrics?.quality}%</div>
                          <div className="text-sm text-muted-foreground">Quality</div>
                        </div>
                        <div className="bg-muted rounded-lg p-4 text-center">
                          <div className="text-lg font-semibold text-foreground">{project?.metrics?.errorRate}%</div>
                          <div className="text-sm text-muted-foreground">Error Rate</div>
                        </div>
                      </div>
                    )}

                    {/* Code Examples */}
                    {settings?.sections?.codeExamples && (
                      <div className="mb-6">
                        <h4 className="font-medium text-foreground mb-3">Implementation Example</h4>
                        <pre className={`${themeStyles?.codeBlock} rounded-lg p-4 text-sm overflow-x-auto`}>
                          <code>{renderCodeExample(project)}</code>
                        </pre>
                      </div>
                    )}

                    {/* Results Analysis */}
                    {settings?.sections?.results && (
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Key Results</h4>
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-foreground text-sm leading-relaxed">
                            This {project?.strategy?.replace('-', ' ')} implementation achieved a {project?.metrics?.coherence}% coherence score 
                            with {project?.metrics?.quality}% quality rating. The approach demonstrated {100 - project?.metrics?.errorRate}% success rate 
                            across {Math.floor(Math.random() * 50) + 20} test scenarios, showing consistent performance in 
                            {project?.tags?.slice(0, 2)?.join(' and ')} applications.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center py-8 border-t border-border">
            <p className="text-muted-foreground">
              Generated with PromptCraft Studio • {new Date()?.getFullYear()}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPreview;