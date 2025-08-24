import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import PortfolioBuilder from './components/PortfolioBuilder';
import PortfolioPreview from './components/PortfolioPreview';
import ExportModal from './components/ExportModal';
import CustomizationPanel from './components/CustomizationPanel';

const PortfolioShowcase = () => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [portfolioSettings, setPortfolioSettings] = useState({
    theme: 'professional',
    audience: 'technical',
    sections: {
      summary: true,
      methodology: true,
      metrics: true,
      codeExamples: true,
      results: true
    }
  });
  const [exportModal, setExportModal] = useState({ isOpen: false, type: null });
  const [customizationPanel, setCustomizationPanel] = useState({ isOpen: false, project: null });

  // Mock projects data
  const projects = [
    {
      id: 'proj-001',
      title: 'Advanced Role-Based Customer Service Assistant',
      description: 'Developed a sophisticated role-prompting system for customer service automation with context-aware responses and escalation protocols.',
      date: '2024-08-15',
      duration: 180,
      strategy: 'role-prompting',
      metrics: {
        coherence: 92,
        quality: 88,
        errorRate: 3.2
      },
      tags: ['Customer Service', 'Role Prompting', 'Automation', 'Context Awareness'],
      promptTemplate: `You are a professional customer service representative with 10+ years of experience.\nYour role is to provide helpful, empathetic, and solution-oriented responses.\n\nCustomer Query: {query}\nContext: {context}\n\nPlease provide a comprehensive response that:\n1. Acknowledges the customer's concern\n2. Offers a clear solution or next steps\n3. Maintains a professional and friendly tone`
    },
    {
      id: 'proj-002',title: 'Few-Shot Learning for Technical Documentation',description: 'Implemented few-shot learning techniques to generate consistent technical documentation across multiple programming languages and frameworks.',date: '2024-08-10',duration: 240,strategy: 'few-shot',
      metrics: {
        coherence: 89,
        quality: 91,
        errorRate: 2.8
      },
      tags: ['Technical Writing', 'Few-Shot Learning', 'Documentation', 'Multi-Language'],
      promptTemplate: `Generate technical documentation following these examples:\n\nExample 1: [Function documentation example]\nExample 2: [API endpoint example]\nExample 3: [Configuration example]\n\nNow generate documentation for: {input}`
    },
    {
      id: 'proj-003',title: 'Chain-of-Thought Financial Analysis',description: 'Created a chain-of-thought prompting system for complex financial analysis and investment recommendations with step-by-step reasoning.',date: '2024-08-05',duration: 320,strategy: 'chain-of-thought',
      metrics: {
        coherence: 94,
        quality: 87,
        errorRate: 4.1
      },
      tags: ['Financial Analysis', 'Chain of Thought', 'Investment', 'Reasoning'],
      promptTemplate: `Analyze the following financial data step by step:\n\nData: {financial_data}\n\nPlease follow this reasoning process:\n1. First, examine the key financial metrics\n2. Then, identify trends and patterns\n3. Next, consider market context and external factors\n4. Finally, provide investment recommendations with rationale`
    },
    {
      id: 'proj-004',title: 'Zero-Shot Code Review Assistant',description: 'Built a zero-shot prompting system for automated code review that identifies bugs, suggests improvements, and ensures coding standards compliance.',date: '2024-07-28',duration: 150,strategy: 'zero-shot',
      metrics: {
        coherence: 86,
        quality: 89,
        errorRate: 5.3
      },
      tags: ['Code Review', 'Zero-Shot', 'Quality Assurance', 'Best Practices'],
      promptTemplate: `Review the following code for:\n- Bugs and potential issues\n- Performance optimizations\n- Code style and best practices\n- Security vulnerabilities\n\nCode:\n{code}\n\nProvide detailed feedback with specific suggestions for improvement.`
    },
    {
      id: 'proj-005',title: 'Retrieval-Augmented Legal Research',description: 'Developed a retrieval-augmented generation system for legal research that combines external knowledge bases with contextual understanding.',date: '2024-07-20',duration: 280,strategy: 'retrieval-augmented',
      metrics: {
        coherence: 91,
        quality: 93,
        errorRate: 2.1
      },
      tags: ['Legal Research', 'RAG', 'Knowledge Base', 'Contextual Analysis'],
      promptTemplate: `Based on the retrieved legal documents and precedents:\n\nRetrieved Context: {retrieved_docs}\nQuery: {legal_query}\n\nProvide a comprehensive legal analysis that:\n1. References relevant statutes and cases\n2. Explains applicable legal principles\n3. Offers practical recommendations`
    },
    {
      id: 'proj-006',title: 'Multi-Modal Content Creation Assistant',description: 'Created a sophisticated content creation system that combines text, image, and video prompting for comprehensive marketing campaigns.',date: '2024-07-15',duration: 200,strategy: 'role-prompting',
      metrics: {
        coherence: 88,
        quality: 85,
        errorRate: 6.2
      },
      tags: ['Content Creation', 'Multi-Modal', 'Marketing', 'Creative Writing'],
      promptTemplate: `You are a creative marketing director with expertise in multi-channel campaigns.\n\nCampaign Brief: {brief}\nTarget Audience: {audience}\nPlatform: {platform}\n\nCreate engaging content that:\n1. Captures attention within the first 3 seconds\n2. Aligns with brand voice and values\n3. Includes clear call-to-action`
    }
  ];

  const handleProjectToggle = (projectId) => {
    setSelectedProjects(prev => 
      prev?.includes(projectId) 
        ? prev?.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleProjectCustomize = (projectId) => {
    const project = projects?.find(p => p?.id === projectId);
    setCustomizationPanel({ isOpen: true, project });
  };

  const handleExport = (type, settings) => {
    // Mock export functionality
    console.log('Exporting portfolio:', { type, settings, selectedProjects });
    
    // Simulate export process
    const exportData = {
      projects: projects?.filter(p => selectedProjects?.includes(p?.id)),
      settings,
      metadata: {
        exportedAt: new Date()?.toISOString(),
        version: '1.0.0',
        totalProjects: selectedProjects?.length
      }
    };

    // In a real application, this would trigger the actual export process
    switch (type) {
      case 'github':
        // Generate GitHub README
        console.log('Generating GitHub README...', exportData);
        break;
      case 'pdf':
        // Generate PDF document
        console.log('Generating PDF...', exportData);
        break;
      case 'web':
        // Create web showcase
        console.log('Creating web showcase...', exportData);
        break;
    }

    // Show success notification (in real app)
    alert(`Portfolio exported successfully as ${type?.toUpperCase()}!`);
  };

  const handleExportClick = (type) => {
    if (selectedProjects?.length === 0) {
      alert('Please select at least one project to export.');
      return;
    }
    setExportModal({ isOpen: true, type });
  };

  const handleCustomizationSave = (updatedProject) => {
    // In a real application, this would update the project data
    console.log('Saving project customization:', updatedProject);
    alert('Project customization saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-15 h-screen flex">
        {/* Left Panel - Portfolio Builder */}
        <div className="w-2/5 min-w-[400px]">
          <PortfolioBuilder
            projects={projects}
            selectedProjects={selectedProjects}
            onProjectToggle={handleProjectToggle}
            onProjectCustomize={handleProjectCustomize}
            onSettingsChange={setPortfolioSettings}
            settings={portfolioSettings}
          />
        </div>

        {/* Right Panel - Portfolio Preview */}
        <div className="flex-1">
          <PortfolioPreview
            selectedProjects={selectedProjects}
            projects={projects}
            settings={portfolioSettings}
            onExport={handleExportClick}
          />
        </div>
      </div>
      {/* Export Modal */}
      <ExportModal
        isOpen={exportModal?.isOpen}
        onClose={() => setExportModal({ isOpen: false, type: null })}
        exportType={exportModal?.type}
        onExport={handleExport}
        selectedProjects={selectedProjects}
      />
      {/* Customization Panel */}
      <CustomizationPanel
        isOpen={customizationPanel?.isOpen}
        onClose={() => setCustomizationPanel({ isOpen: false, project: null })}
        project={customizationPanel?.project}
        onSave={handleCustomizationSave}
      />
    </div>
  );
};

export default PortfolioShowcase;