import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultsPanel = ({ testResults, isLoading, onRetest, isCollapsed, onToggleCollapse }) => {
  const [activeTab, setActiveTab] = useState('response');
  const [comparisonMode, setComparisonMode] = useState(false);

  const mockResults = {
    response: `Based on the analysis of your prompt engineering requirements, I recommend implementing a structured approach that combines role-based prompting with few-shot learning techniques.

Key recommendations:
1. Define clear persona and expertise level
2. Provide 2-3 relevant examples
3. Specify output format requirements
4. Include evaluation criteria

This approach typically improves response quality by 35-40% and reduces ambiguity in AI outputs. The implementation should focus on maintaining consistency while allowing for creative flexibility within defined parameters.`,
    metrics: {
      coherence: 0.87,
      relevance: 0.92,
      creativity: 0.76,
      accuracy: 0.89,
      responseTime: 2.3,
      tokenCount: 156,
      cost: 0.0023
    },
    evaluation: {
      strengths: [
        'Clear structure and logical flow',
        'Specific actionable recommendations',
        'Quantified benefits provided',
        'Professional tone maintained'
      ],
      improvements: [
        'Could include more specific examples',
        'Consider adding implementation timeline',
        'Expand on potential challenges'
      ],
      score: 8.4
    }
  };

  const results = testResults || mockResults;

  const tabs = [
    { id: 'response', name: 'Response', icon: 'MessageSquare' },
    { id: 'metrics', name: 'Metrics', icon: 'BarChart3' },
    { id: 'evaluation', name: 'Evaluation', icon: 'CheckCircle' },
    { id: 'history', name: 'History', icon: 'Clock' }
  ];

  const formatMetricValue = (key, value) => {
    switch (key) {
      case 'responseTime':
        return `${value}s`;
      case 'cost':
        return `$${value?.toFixed(4)}`;
      case 'tokenCount':
        return value?.toLocaleString();
      default:
        return typeof value === 'number' ? (value * 100)?.toFixed(1) + '%' : value;
    }
  };

  const getMetricColor = (value) => {
    if (value >= 0.8) return 'text-success';
    if (value >= 0.6) return 'text-warning';
    return 'text-error';
  };

  if (isCollapsed) {
    return (
      <div className="w-12 bg-card border-l border-border flex flex-col items-center py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="mb-4"
        >
          <Icon name="PanelRightOpen" size={20} />
        </Button>
        <div className="flex flex-col space-y-2">
          <Button variant="ghost" size="icon" title="Results">
            <Icon name="MessageSquare" size={18} />
          </Button>
          <Button variant="ghost" size="icon" title="Metrics">
            <Icon name="BarChart3" size={18} />
          </Button>
          <Button variant="ghost" size="icon" title="Evaluation">
            <Icon name="CheckCircle" size={18} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-card border-l border-border flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground">Test Results</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setComparisonMode(!comparisonMode)}
              title="Comparison Mode"
            >
              <Icon name="GitCompare" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
            >
              <Icon name="PanelRightClose" size={20} />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={onRetest}
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Icon name="RefreshCw" size={16} />
                Retest
              </>
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} />
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Share" size={16} />
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 text-sm font-medium transition-micro ${
                activeTab === tab?.id
                  ? 'border-b-2 border-primary text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span className="hidden sm:inline">{tab?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'response' && (
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Generating response...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-foreground">AI Response</h3>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="xs">
                        <Icon name="Copy" size={12} />
                      </Button>
                      <Button variant="ghost" size="xs">
                        <Icon name="ThumbsUp" size={12} />
                      </Button>
                      <Button variant="ghost" size="xs">
                        <Icon name="ThumbsDown" size={12} />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {results?.response}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background border border-border rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="Clock" size={14} className="text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">Response Time</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{results?.metrics?.responseTime}s</p>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name="Hash" size={14} className="text-muted-foreground" />
                      <span className="text-xs font-medium text-muted-foreground">Tokens</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">{results?.metrics?.tokenCount}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="space-y-4">
            <div className="grid gap-3">
              {Object.entries(results?.metrics)?.map(([key, value]) => {
                const isPercentage = typeof value === 'number' && value <= 1 && key !== 'responseTime' && key !== 'cost' && key !== 'tokenCount';
                return (
                  <div key={key} className="bg-background border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground capitalize">
                        {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                      </span>
                      <span className={`text-sm font-semibold ${isPercentage ? getMetricColor(value) : 'text-foreground'}`}>
                        {formatMetricValue(key, value)}
                      </span>
                    </div>
                    {isPercentage && (
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            value >= 0.8 ? 'bg-success' : value >= 0.6 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${value * 100}%` }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'evaluation' && (
          <div className="space-y-4">
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground">Overall Score</h3>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold text-primary">{results?.evaluation?.score}</div>
                  <div className="text-sm text-muted-foreground">/10</div>
                </div>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(results?.evaluation?.score / 10) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span>Strengths</span>
                </h4>
                <ul className="space-y-1">
                  {results?.evaluation?.strengths?.map((strength, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <Icon name="Plus" size={12} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-warning" />
                  <span>Areas for Improvement</span>
                </h4>
                <ul className="space-y-1">
                  {results?.evaluation?.improvements?.map((improvement, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <Icon name="ArrowRight" size={12} className="text-warning mt-0.5 flex-shrink-0" />
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground">Test History</h3>
              <Button variant="ghost" size="xs">
                <Icon name="MoreHorizontal" size={14} />
              </Button>
            </div>
            
            {[1, 2, 3, 4, 5]?.map((item) => (
              <div key={item} className="bg-background border border-border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Test #{item}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(Date.now() - item * 3600000)?.toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Score: {(8.5 - item * 0.2)?.toFixed(1)}/10</span>
                  <span>Tokens: {150 + item * 10}</span>
                  <span>{(2.1 + item * 0.1)?.toFixed(1)}s</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPanel;