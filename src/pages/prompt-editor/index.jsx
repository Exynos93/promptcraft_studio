import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import TemplateLibrary from './components/TemplateLibrary';
import PromptEditor from './components/PromptEditor';
import ResultsPanel from './components/ResultsPanel';
import BatchTestingPanel from './components/BatchTestingPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PromptEditorPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [isTestingLoading, setIsTestingLoading] = useState(false);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [showBatchTesting, setShowBatchTesting] = useState(false);
  const [showInputPanel, setShowInputPanel] = useState(false);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handlePromptChange = (promptData) => {
    setCurrentPrompt(promptData);
  };

  const handleTest = async (promptData) => {
    setIsTestingLoading(true);
    setTestResults(null);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        response: `Based on your prompt configuration using ${promptData?.model} with temperature ${promptData?.temperature}, here's a comprehensive analysis:\n\nThe ${promptData?.strategy} approach you've implemented shows strong potential for generating high-quality responses. The structured format and clear instructions provide excellent guidance for the AI model.\n\nKey observations:\n1. The prompt structure is well-organized and logical\n2. Variable placeholders are appropriately positioned\n3. The context setting establishes clear expectations\n4. Output format specifications are detailed\n\nThis configuration should yield consistent, relevant responses while maintaining the desired tone and style. Consider testing with various input scenarios to validate performance across different use cases.`,
        metrics: {
          coherence: 0.89,
          relevance: 0.94,
          creativity: 0.78,
          accuracy: 0.91,
          responseTime: 2.1,
          tokenCount: 187,
          cost: 0.0031
        },
        evaluation: {
          strengths: [
            'Excellent prompt structure and clarity',
            'Appropriate use of variables and placeholders',
            'Clear output format specifications',
            'Good balance of guidance and flexibility'
          ],
          improvements: [
            'Consider adding more specific examples',
            'Could benefit from edge case handling',
            'Might need refinement for specific domains'
          ],
          score: 8.7
        }
      };
      
      setTestResults(mockResults);
      setIsTestingLoading(false);
    }, 2500);
  };

  const handleRetest = () => {
    if (currentPrompt) {
      handleTest(currentPrompt);
    }
  };

  const handleBatchTestComplete = (results) => {
    console.log('Batch test results:', results);
    setShowBatchTesting(false);
  };

  // Input parameters for testing
  const [inputParameters, setInputParameters] = useState({
    domain: 'artificial intelligence',
    context: 'business implementation',
    audience: 'technical stakeholders',
    tone: 'professional',
    length: 'detailed'
  });

  const handleInputParameterChange = (key, value) => {
    setInputParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-15 h-screen flex">
        {/* Left Panel - Template Library */}
        <TemplateLibrary
          onTemplateSelect={handleTemplateSelect}
          isCollapsed={leftPanelCollapsed}
          onToggleCollapse={() => setLeftPanelCollapsed(!leftPanelCollapsed)}
        />

        {/* Center Panel - Editor */}
        <div className="flex-1 flex flex-col">
          <PromptEditor
            selectedTemplate={selectedTemplate}
            onPromptChange={handlePromptChange}
            onTest={handleTest}
          />

          {/* Bottom Panel - Input Parameters */}
          <div className={`border-t border-border bg-card transition-all duration-300 ${
            showInputPanel ? 'h-48' : 'h-12'
          }`}>
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInputPanel(!showInputPanel)}
                >
                  <Icon name={showInputPanel ? "ChevronDown" : "ChevronUp"} size={16} />
                  Input Parameters
                </Button>
                {showInputPanel && (
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Settings" size={14} />
                    <span>Configure test variables</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBatchTesting(true)}
                >
                  <Icon name="TestTube" size={16} />
                  Batch Test
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Save" size={16} />
                  Save Session
                </Button>
              </div>
            </div>

            {showInputPanel && (
              <div className="px-3 pb-3 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(inputParameters)?.map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-foreground mb-1 capitalize">
                        {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                      </label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleInputParameterChange(key, e?.target?.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder={`Enter ${key}...`}
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Upload" size={16} />
                      Import Variables
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={16} />
                      Export Variables
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="RotateCcw" size={16} />
                    Reset to Defaults
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Results */}
        <ResultsPanel
          testResults={testResults}
          isLoading={isTestingLoading}
          onRetest={handleRetest}
          isCollapsed={rightPanelCollapsed}
          onToggleCollapse={() => setRightPanelCollapsed(!rightPanelCollapsed)}
        />
      </div>
      {/* Batch Testing Modal */}
      <BatchTestingPanel
        isVisible={showBatchTesting}
        onClose={() => setShowBatchTesting(false)}
        onRunBatch={handleBatchTestComplete}
      />
    </div>
  );
};

export default PromptEditorPage;