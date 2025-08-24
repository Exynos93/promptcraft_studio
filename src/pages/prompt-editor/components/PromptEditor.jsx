import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PromptEditor = ({ selectedTemplate, onPromptChange, onTest }) => {
  const [activeStrategy, setActiveStrategy] = useState('role-prompting');
  const [promptContent, setPromptContent] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved');
  const textareaRef = useRef(null);

  const strategies = [
    { id: 'role-prompting', name: 'Role Prompting', icon: 'UserCheck' },
    { id: 'few-shot', name: 'Few-Shot Learning', icon: 'Target' },
    { id: 'chain-of-thought', name: 'Chain of Thought', icon: 'GitBranch' },
    { id: 'creative', name: 'Creative Writing', icon: 'Feather' }
  ];

  const modelOptions = [
    { value: 'gpt-4', label: 'GPT-4', description: 'Most capable model' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', description: 'Fast and efficient' },
    { value: 'claude-3', label: 'Claude 3', description: 'Anthropic\'s latest' },
    { value: 'cohere-command', label: 'Cohere Command', description: 'Enterprise focused' }
  ];

  useEffect(() => {
    if (selectedTemplate) {
      setPromptContent(selectedTemplate?.content);
      setActiveStrategy(selectedTemplate?.category);
      setSaveStatus('unsaved');
    }
  }, [selectedTemplate]);

  useEffect(() => {
    onPromptChange({
      content: promptContent,
      strategy: activeStrategy,
      model: selectedModel,
      temperature,
      maxTokens
    });
  }, [promptContent, activeStrategy, selectedModel, temperature, maxTokens, onPromptChange]);

  const handlePromptChange = (e) => {
    setPromptContent(e?.target?.value);
    setSaveStatus('unsaved');
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
    }, 1000);
  };

  const handleTest = () => {
    onTest({
      content: promptContent,
      strategy: activeStrategy,
      model: selectedModel,
      temperature,
      maxTokens
    });
  };

  const insertTemplate = (template) => {
    const textarea = textareaRef?.current;
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const newContent = promptContent?.substring(0, start) + template + promptContent?.substring(end);
    setPromptContent(newContent);
    setSaveStatus('unsaved');
  };

  const templateSnippets = {
    'role-prompting': [
      { name: 'Expert Role', template: 'You are an expert {domain} with {years} years of experience.' },
      { name: 'Persona', template: 'Act as a {role} who {characteristics}.' },
      { name: 'Context Setting', template: 'Given the context of {situation}, your task is to {objective}.' }
    ],
    'few-shot': [
      { name: 'Example Pattern', template: 'Example 1:\nInput: {input1}\nOutput: {output1}\n\nExample 2:\nInput: {input2}\nOutput: {output2}' },
      { name: 'Classification', template: 'Classify the following:\n\nExamples:\n{examples}\n\nNow classify: {input}' }
    ],
    'chain-of-thought': [
      { name: 'Step by Step', template: 'Let\'s think step by step:\n1. {step1}\n2. {step2}\n3. {step3}' },
      { name: 'Reasoning', template: 'To solve this, I need to:\n- First, {action1}\n- Then, {action2}\n- Finally, {action3}' }
    ],
    'creative': [
      { name: 'Story Elements', template: 'Create a story with:\n- Setting: {setting}\n- Character: {character}\n- Conflict: {conflict}' },
      { name: 'Creative Brief', template: 'Generate {type} that is {tone} and includes {elements}.' }
    ]
  };

  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving': return 'Loader2';
      case 'saved': return 'Check';
      case 'unsaved': return 'Circle';
      default: return 'Circle';
    }
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case 'saving': return 'text-warning';
      case 'saved': return 'text-success';
      case 'unsaved': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border-r border-border flex flex-col ${isFullscreen ? 'fixed inset-0 z-50' : 'flex-1'}`}>
      {/* Header Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-foreground">Prompt Editor</h2>
            <div className={`flex items-center space-x-1 text-sm ${getSaveStatusColor()}`}>
              <Icon name={getSaveStatusIcon()} size={14} className={saveStatus === 'saving' ? 'animate-spin' : ''} />
              <span className="capitalize">{saveStatus}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Icon name="Save" size={16} />
              Save
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
            </Button>
          </div>
        </div>

        {/* Strategy Tabs */}
        <div className="flex items-center space-x-1 mb-4">
          {strategies?.map((strategy) => (
            <button
              key={strategy?.id}
              onClick={() => setActiveStrategy(strategy?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-micro ${
                activeStrategy === strategy?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={strategy?.icon} size={16} />
              <span>{strategy?.name}</span>
            </button>
          ))}
        </div>

        {/* Model Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Select
              label="Model"
              options={modelOptions}
              value={selectedModel}
              onChange={setSelectedModel}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Temperature: {temperature}
            </label>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e?.target?.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Max Tokens
            </label>
            <input
              type="number"
              min="1"
              max="4000"
              value={maxTokens}
              onChange={(e) => setMaxTokens(parseInt(e?.target?.value))}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>
      {/* Template Snippets */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-foreground">Quick Templates</h3>
          <Button variant="ghost" size="sm">
            <Icon name="Plus" size={14} />
            Add Custom
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {templateSnippets?.[activeStrategy]?.map((snippet, index) => (
            <Button
              key={index}
              variant="outline"
              size="xs"
              onClick={() => insertTemplate(snippet?.template)}
            >
              {snippet?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Editor */}
      <div className="flex-1 p-4">
        <div className="h-full relative">
          <textarea
            ref={textareaRef}
            value={promptContent}
            onChange={handlePromptChange}
            placeholder="Start writing your prompt here...\n\nTip: Use {variables} for dynamic content"
            className="w-full h-full p-4 bg-background border border-border rounded-lg text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            style={{ minHeight: '400px' }}
          />
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {promptContent?.length} characters
            </span>
            <Button variant="default" onClick={handleTest}>
              <Icon name="Play" size={16} />
              Test Prompt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptEditor;