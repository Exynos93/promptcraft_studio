import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ProjectCard from './components/ProjectCard';
import ProjectListItem from './components/ProjectListItem';
import FilterSidebar from './components/FilterSidebar';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import TopActionBar from './components/TopActionBar';
import NewProjectModal from './components/NewProjectModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [filters, setFilters] = useState({
    status: [],
    strategies: [],
    teamMembers: [],
    dateRange: { start: '', end: '' },
    tags: []
  });
  const [savedPresets, setSavedPresets] = useState([
    { name: 'Active Projects', filters: { status: ['active'], strategies: [], teamMembers: [], dateRange: { start: '', end: '' }, tags: [] } },
    { name: 'My Projects', filters: { status: [], strategies: [], teamMembers: [1], dateRange: { start: '', end: '' }, tags: [] } }
  ]);

  // Mock data
  const mockProjects = [
    {
      id: 1,
      title: "Customer Support Chatbot",
      description: "Developing an intelligent customer support system using role prompting and few-shot learning techniques to handle common inquiries and escalate complex issues appropriately.",
      status: "active",
      strategies: ["role-prompting", "few-shot"],
      teamMembers: [
        { id: 1, name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 2, name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/44.jpg" }
      ],
      progress: 75,
      lastActivity: "2 hours ago",
      metrics: { tests: 45, successRate: 87, avgScore: 4.2 },
      tags: ["production", "chatbot"],
      isLiveEditing: true,
      createdAt: "2024-08-20T10:30:00Z"
    },
    {
      id: 2,
      title: "Content Generation Pipeline",
      description: "Building a comprehensive content generation system for marketing materials using chain-of-thought prompting to ensure consistent brand voice and messaging.",
      status: "completed",
      strategies: ["chain-of-thought", "role-prompting"],
      teamMembers: [
        { id: 1, name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 3, name: "Mike Johnson", avatar: "https://randomuser.me/api/portraits/men/65.jpg" },
        { id: 4, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
      ],
      progress: 100,
      lastActivity: "1 day ago",
      metrics: { tests: 78, successRate: 92, avgScore: 4.6 },
      tags: ["marketing", "content"],
      isLiveEditing: false,
      createdAt: "2024-08-15T14:20:00Z"
    },
    {
      id: 3,
      title: "Code Review Assistant",
      description: "Creating an AI-powered code review system that provides detailed feedback on code quality, security vulnerabilities, and best practices using specialized prompting strategies.",
      status: "active",
      strategies: ["zero-shot", "few-shot"],
      teamMembers: [
        { id: 2, name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: 3, name: "Mike Johnson", avatar: "https://randomuser.me/api/portraits/men/65.jpg" }
      ],
      progress: 60,
      lastActivity: "4 hours ago",
      metrics: { tests: 32, successRate: 78, avgScore: 3.9 },
      tags: ["development", "code-review"],
      isLiveEditing: false,
      createdAt: "2024-08-18T09:15:00Z"
    },
    {
      id: 4,
      title: "Data Analysis Interpreter",
      description: "Developing prompts for interpreting complex data visualizations and generating actionable insights for business stakeholders using structured reasoning approaches.",
      status: "paused",
      strategies: ["chain-of-thought"],
      teamMembers: [
        { id: 4, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
      ],
      progress: 35,
      lastActivity: "3 days ago",
      metrics: { tests: 18, successRate: 65, avgScore: 3.4 },
      tags: ["analytics", "business"],
      isLiveEditing: false,
      createdAt: "2024-08-12T16:45:00Z"
    },
    {
      id: 5,
      title: "Educational Tutor Bot",
      description: "Building an adaptive learning assistant that provides personalized explanations and practice problems across various subjects using multiple prompting techniques.",
      status: "active",
      strategies: ["role-prompting", "few-shot", "chain-of-thought"],
      teamMembers: [
        { id: 1, name: "John Doe", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
        { id: 2, name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
        { id: 4, name: "Emily Davis", avatar: "https://randomuser.me/api/portraits/women/68.jpg" }
      ],
      progress: 45,
      lastActivity: "6 hours ago",
      metrics: { tests: 56, successRate: 81, avgScore: 4.1 },
      tags: ["education", "tutoring"],
      isLiveEditing: true,
      createdAt: "2024-08-22T11:30:00Z"
    },
    {
      id: 6,
      title: "Legal Document Analyzer",
      description: "Creating specialized prompts for analyzing legal documents, extracting key clauses, and identifying potential risks or compliance issues.",
      status: "archived",
      strategies: ["zero-shot", "role-prompting"],
      teamMembers: [
        { id: 3, name: "Mike Johnson", avatar: "https://randomuser.me/api/portraits/men/65.jpg" }
      ],
      progress: 90,
      lastActivity: "2 weeks ago",
      metrics: { tests: 67, successRate: 89, avgScore: 4.3 },
      tags: ["legal", "compliance"],
      isLiveEditing: false,
      createdAt: "2024-07-28T13:20:00Z"
    }
  ];

  useEffect(() => {
    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  }, []);

  useEffect(() => {
    let filtered = [...projects];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter(project =>
        project?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply status filter
    if (filters?.status?.length > 0) {
      filtered = filtered?.filter(project => filters?.status?.includes(project?.status));
    }

    // Apply strategy filter
    if (filters?.strategies?.length > 0) {
      filtered = filtered?.filter(project =>
        project?.strategies?.some(strategy => filters?.strategies?.includes(strategy))
      );
    }

    // Apply team member filter
    if (filters?.teamMembers?.length > 0) {
      filtered = filtered?.filter(project =>
        project?.teamMembers?.some(member => filters?.teamMembers?.includes(member?.id))
      );
    }

    // Apply date range filter
    if (filters?.dateRange?.start || filters?.dateRange?.end) {
      filtered = filtered?.filter(project => {
        const projectDate = new Date(project.createdAt);
        const startDate = filters?.dateRange?.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters?.dateRange?.end ? new Date(filters.dateRange.end) : null;
        
        if (startDate && projectDate < startDate) return false;
        if (endDate && projectDate > endDate) return false;
        return true;
      });
    }

    // Apply tags filter
    if (filters?.tags?.length > 0) {
      filtered = filtered?.filter(project =>
        filters?.tags?.some(tag => project?.tags?.includes(tag))
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'performance':
          return b?.metrics?.successRate - a?.metrics?.successRate;
        case 'alphabetical':
          return a?.title?.localeCompare(b?.title);
        case 'progress':
          return b?.progress - a?.progress;
        case 'team-size':
          return b?.teamMembers?.length - a?.teamMembers?.length;
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchQuery, filters, sortBy]);

  const handleProjectSelect = (projectId, isSelected) => {
    setSelectedProjects(prev =>
      isSelected
        ? [...prev, projectId]
        : prev?.filter(id => id !== projectId)
    );
  };

  const handleSelectAll = () => {
    setSelectedProjects(
      selectedProjects?.length === filteredProjects?.length
        ? []
        : filteredProjects?.map(p => p?.id)
    );
  };

  const handleClearSelection = () => {
    setSelectedProjects([]);
  };

  const handleNewProject = () => {
    setShowNewProjectModal(true);
  };

  const handleCreateProject = (projectData) => {
    const newProject = {
      id: projects?.length + 1,
      ...projectData,
      status: 'active',
      progress: 0,
      lastActivity: 'just now',
      metrics: { tests: 0, successRate: 0, avgScore: 0 },
      isLiveEditing: false,
      teamMembers: projectData?.teamMembers?.map(id => {
        const member = mockProjects?.[0]?.teamMembers?.find(m => m?.id === id);
        return member || { id, name: `User ${id}`, avatar: `https://randomuser.me/api/portraits/men/${id}.jpg` };
      })
    };
    setProjects(prev => [newProject, ...prev]);
  };

  const handleEdit = (projectId) => {
    console.log('Edit project:', projectId);
  };

  const handleDuplicate = (projectId) => {
    const project = projects?.find(p => p?.id === projectId);
    if (project) {
      const duplicatedProject = {
        ...project,
        id: projects?.length + 1,
        title: `${project?.title} (Copy)`,
        status: 'active',
        progress: 0,
        lastActivity: 'just now',
        isLiveEditing: false
      };
      setProjects(prev => [duplicatedProject, ...prev]);
    }
  };

  const handleShare = (projectIds) => {
    console.log('Share projects:', projectIds);
  };

  const handleDelete = (projectIds) => {
    setProjects(prev => prev?.filter(p => !projectIds?.includes(p?.id)));
    setSelectedProjects([]);
  };

  const handleArchive = (projectIds) => {
    setProjects(prev =>
      prev?.map(p =>
        projectIds?.includes(p?.id) ? { ...p, status: 'archived' } : p
      )
    );
    setSelectedProjects([]);
  };

  const handleExport = async (projectIds, format) => {
    console.log('Export projects:', projectIds, 'as', format);
    // Simulate export delay
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleSavePreset = (name, filterData) => {
    setSavedPresets(prev => [...prev, { name, filters: filterData }]);
  };

  const handleLoadPreset = (preset) => {
    setFilters(preset?.filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-15 flex h-screen">
        {/* Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          savedPresets={savedPresets}
          onSavePreset={handleSavePreset}
          onLoadPreset={handleLoadPreset}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Top Action Bar */}
            <TopActionBar
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onNewProject={handleNewProject}
            />

            {/* Bulk Actions */}
            <BulkActionsToolbar
              selectedProjects={selectedProjects}
              onArchive={handleArchive}
              onShare={handleShare}
              onExport={handleExport}
              onDelete={handleDelete}
              onClearSelection={handleClearSelection}
            />

            {/* Projects Grid/List */}
            <div className="space-y-4">
              {/* Select All */}
              {filteredProjects?.length > 0 && (
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    checked={selectedProjects?.length === filteredProjects?.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    Select all {filteredProjects?.length} projects
                  </span>
                </div>
              )}

              {/* Projects Display */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProjects?.map((project) => (
                    <ProjectCard
                      key={project?.id}
                      project={project}
                      onEdit={handleEdit}
                      onDuplicate={handleDuplicate}
                      onShare={handleShare}
                      onDelete={handleDelete}
                      isSelected={selectedProjects?.includes(project?.id)}
                      onSelect={handleProjectSelect}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProjects?.map((project) => (
                    <ProjectListItem
                      key={project?.id}
                      project={project}
                      onEdit={handleEdit}
                      onDuplicate={handleDuplicate}
                      onShare={handleShare}
                      onDelete={handleDelete}
                      isSelected={selectedProjects?.includes(project?.id)}
                      onSelect={handleProjectSelect}
                    />
                  ))}
                </div>
              )}

              {/* Empty State */}
              {filteredProjects?.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="FolderOpen" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery || Object.values(filters)?.some(f => Array.isArray(f) ? f?.length > 0 : f)
                      ? 'Try adjusting your search or filters' :'Create your first project to get started'
                    }
                  </p>
                  <Button onClick={handleNewProject} iconName="Plus" iconPosition="left">
                    Create New Project
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* New Project Modal */}
      <NewProjectModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
};

export default ProjectManagement;