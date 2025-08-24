import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BatchTestingPanel = ({ isVisible, onClose, onRunBatch }) => {
  const [testCases, setTestCases] = useState([
    { id: 1, input: 'Analyze the impact of AI on healthcare', variables: { domain: 'healthcare', focus: 'impact analysis' }, enabled: true },
    { id: 2, input: 'Explain quantum computing to a beginner', variables: { domain: 'quantum computing', audience: 'beginner' }, enabled: true },
    { id: 3, input: 'Create a marketing strategy for a startup', variables: { domain: 'marketing', context: 'startup' }, enabled: false }
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);

  const handleAddTestCase = () => {
    const newTestCase = {
      id: Date.now(),
      input: '',
      variables: {},
      enabled: true
    };
    setTestCases([...testCases, newTestCase]);
  };

  const handleUpdateTestCase = (id, field, value) => {
    setTestCases(testCases?.map(tc => 
      tc?.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  const handleRemoveTestCase = (id) => {
    setTestCases(testCases?.filter(tc => tc?.id !== id));
  };

  const handleRunBatch = async () => {
    setIsRunning(true);
    const enabledTests = testCases?.filter(tc => tc?.enabled);
    
    // Simulate batch testing
    setTimeout(() => {
      const mockResults = enabledTests?.map(tc => ({
        id: tc?.id,
        input: tc?.input,
        response: `Mock response for: ${tc?.input}`,
        metrics: {
          coherence: Math.random() * 0.3 + 0.7,
          relevance: Math.random() * 0.3 + 0.7,
          responseTime: Math.random() * 2 + 1,
          tokenCount: Math.floor(Math.random() * 200 + 100)
        },
        score: Math.random() * 2 + 8
      }));
      
      setResults(mockResults);
      setIsRunning(false);
      onRunBatch(mockResults);
    }, 3000);
  };

  const exportResults = () => {
    if (!results) return;
    
    const csvContent = [
      ['Test Case', 'Input', 'Score', 'Coherence', 'Relevance', 'Response Time', 'Tokens'],
      ...results?.map(r => [
        `Test ${r?.id}`,
        r?.input,
        r?.score?.toFixed(1),
        (r?.metrics?.coherence * 100)?.toFixed(1) + '%',
        (r?.metrics?.relevance * 100)?.toFixed(1) + '%',
        r?.metrics?.responseTime?.toFixed(2) + 's',
        r?.metrics?.tokenCount
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'batch-test-results.csv';
    a?.click();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Batch Testing</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Test your prompt against multiple inputs simultaneously
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Test Cases Panel */}
          <div className="w-1/2 border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Test Cases</h3>
                <Button variant="outline" size="sm" onClick={handleAddTestCase}>
                  <Icon name="Plus" size={16} />
                  Add Test
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {testCases?.map((testCase) => (
                <div key={testCase?.id} className="bg-background border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={testCase?.enabled}
                        onChange={(e) => handleUpdateTestCase(testCase?.id, 'enabled', e?.target?.checked)}
                        className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                      />
                      <span className="text-sm font-medium text-foreground">Test Case #{testCase?.id}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleRemoveTestCase(testCase?.id)}
                    >
                      <Icon name="Trash2" size={14} />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <Input
                      label="Test Input"
                      type="text"
                      placeholder="Enter test input..."
                      value={testCase?.input}
                      onChange={(e) => handleUpdateTestCase(testCase?.id, 'input', e?.target?.value)}
                    />

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Variables (JSON)
                      </label>
                      <textarea
                        placeholder='{"variable": "value"}'
                        value={JSON.stringify(testCase?.variables, null, 2)}
                        onChange={(e) => {
                          try {
                            const variables = JSON.parse(e?.target?.value);
                            handleUpdateTestCase(testCase?.id, 'variables', variables);
                          } catch (error) {
                            // Invalid JSON, ignore
                          }
                        }}
                        className="w-full h-20 px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {testCases?.filter(tc => tc?.enabled)?.length} of {testCases?.length} tests enabled
                </span>
                <Button
                  variant="default"
                  onClick={handleRunBatch}
                  disabled={isRunning || testCases?.filter(tc => tc?.enabled)?.length === 0}
                >
                  {isRunning ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      Running Tests...
                    </>
                  ) : (
                    <>
                      <Icon name="Play" size={16} />
                      Run Batch Test
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="w-1/2 flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Results</h3>
                {results && (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={exportResults}>
                      <Icon name="Download" size={16} />
                      Export CSV
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Share" size={16} />
                      Share
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {isRunning ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Running Batch Tests</h3>
                    <p className="text-sm text-muted-foreground">
                      Testing {testCases?.filter(tc => tc?.enabled)?.length} cases...
                    </p>
                  </div>
                </div>
              ) : results ? (
                <div className="space-y-4">
                  {/* Summary */}
                  <div className="bg-background border border-border rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-3">Summary</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {(results?.reduce((sum, r) => sum + r?.score, 0) / results?.length)?.toFixed(1)}
                        </div>
                        <div className="text-sm text-muted-foreground">Average Score</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {results?.length}
                        </div>
                        <div className="text-sm text-muted-foreground">Tests Completed</div>
                      </div>
                    </div>
                  </div>

                  {/* Individual Results */}
                  <div className="space-y-3">
                    {results?.map((result) => (
                      <div key={result?.id} className="bg-background border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">Test #{result?.id}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-primary">
                              {result?.score?.toFixed(1)}/10
                            </span>
                            <Button variant="ghost" size="xs">
                              <Icon name="Eye" size={12} />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{result?.input}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Coherence: </span>
                            <span className="font-medium">{(result?.metrics?.coherence * 100)?.toFixed(1)}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Relevance: </span>
                            <span className="font-medium">{(result?.metrics?.relevance * 100)?.toFixed(1)}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Time: </span>
                            <span className="font-medium">{result?.metrics?.responseTime?.toFixed(2)}s</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Tokens: </span>
                            <span className="font-medium">{result?.metrics?.tokenCount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Icon name="TestTube" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Ready to Test</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure your test cases and run batch testing to see results here.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchTestingPanel;