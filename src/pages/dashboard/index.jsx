import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import MetricCard from './components/MetricCard';
import ProjectCard from './components/ProjectCard';
import PerformanceChart from './components/PerformanceChart';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import NotificationPanel from './components/NotificationPanel';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStrategy, setFilterStrategy] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [notifications, setNotifications] = useState([]);

  // Mock data for metrics
  const metrics = [
    {
      title: 'Total Experiments',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: 'Flask',
      iconColor: 'bg-primary'
    },
    {
      title: 'Success Rate',
      value: '87.3%',
      change: '+5.2%',
      changeType: 'positive',
      icon: 'Target',
      iconColor: 'bg-success'
    },
    {
      title: 'API Usage',
      value: '15.2K',
      change: '+8.1%',
      changeType: 'positive',
      icon: 'Zap',
      iconColor: 'bg-warning'
    },
    {
      title: 'Total Cost',
      value: '$342.50',
      change: '-2.3%',
      changeType: 'negative',
      icon: 'DollarSign',
      iconColor: 'bg-secondary'
    }
  ];

  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: 'Customer Support Chatbot',
      strategy: 'Role Prompting',
      status: 'Active',
      experiments: 23,
      successRate: 92,
      apiCalls: 1247,
      cost: '45.20',
      lastModified: '2 hours ago'
    },
    {
      id: 2,
      title: 'Code Generation Assistant',
      strategy: 'Few-shot Learning',
      status: 'Testing',
      experiments: 18,
      successRate: 85,
      apiCalls: 892,
      cost: '32.15',
      lastModified: '5 hours ago'
    },
    {
      id: 3,
      title: 'Content Summarization',
      strategy: 'Chain-of-Thought',
      status: 'Completed',
      experiments: 31,
      successRate: 89,
      apiCalls: 1563,
      cost: '67.80',
      lastModified: '1 day ago'
    },
    {
      id: 4,
      title: 'Email Classification',
      strategy: 'Zero-shot',
      status: 'Draft',
      experiments: 7,
      successRate: 78,
      apiCalls: 234,
      cost: '12.45',
      lastModified: '3 days ago'
    },
    {
      id: 5,
      title: 'Product Description Generator',
      strategy: 'Role Prompting',
      status: 'Active',
      experiments: 15,
      successRate: 94,
      apiCalls: 678,
      cost: '28.90',
      lastModified: '6 hours ago'
    },
    {
      id: 6,
      title: 'Sentiment Analysis Tool',
      strategy: 'Few-shot Learning',
      status: 'Testing',
      experiments: 12,
      successRate: 81,
      apiCalls: 456,
      cost: '19.75',
      lastModified: '8 hours ago'
    }
  ];

  // Mock data for performance chart
  const performanceData = [
    { date: 'Aug 17', value: 82 },
    { date: 'Aug 18', value: 85 },
    { date: 'Aug 19', value: 78 },
    { date: 'Aug 20', value: 88 },
    { date: 'Aug 21', value: 92 },
    { date: 'Aug 22', value: 87 },
    { date: 'Aug 23', value: 89 },
    { date: 'Aug 24', value: 94 }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'experiment',
      description: 'Completed batch test for Customer Support Chatbot',
      timestamp: '15 minutes ago'
    },
    {
      id: 2,
      type: 'api',
      description: 'API quota reached 85% - consider upgrading plan',
      timestamp: '1 hour ago'
    },
    {
      id: 3,
      type: 'template',
      description: 'New template "Email Response Generator" added to library',
      timestamp: '2 hours ago'
    },
    {
      id: 4,
      type: 'export',
      description: 'Portfolio exported for "Content Summarization" project',
      timestamp: '4 hours ago'
    },
    {
      id: 5,
      type: 'experiment',
      description: 'Started new experiment series for Code Generation Assistant',
      timestamp: '6 hours ago'
    }
  ];

  // Strategy filter options
  const strategyOptions = [
    { value: 'all', label: 'All Strategies' },
    { value: 'role-prompting', label: 'Role Prompting' },
    { value: 'few-shot', label: 'Few-shot Learning' },
    { value: 'chain-of-thought', label: 'Chain-of-Thought' },
    { value: 'zero-shot', label: 'Zero-shot' }
  ];

  // Status filter options
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'testing', label: 'Testing' },
    { value: 'completed', label: 'Completed' },
    { value: 'draft', label: 'Draft' }
  ];

  // Initialize notifications
  useEffect(() => {
    const initialNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Batch Test Completed',
        message: 'Customer Support Chatbot experiment finished with 94% success rate',
        timestamp: '5 minutes ago'
      },
      {
        id: 2,
        type: 'warning',
        title: 'API Quota Alert',
        message: 'You have used 85% of your monthly API quota. Consider upgrading your plan.',
        timestamp: '1 hour ago'
      }
    ];
    setNotifications(initialNotifications);
  }, []);

  // Filter projects based on search and filters
  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         project?.strategy?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesStrategy = filterStrategy === 'all' || 
                           project?.strategy?.toLowerCase()?.replace(/[^a-z]/g, '-') === filterStrategy;
    
    const matchesStatus = filterStatus === 'all' || 
                         project?.status?.toLowerCase() === filterStatus;

    return matchesSearch && matchesStrategy && matchesStatus;
  });

  // Event handlers
  const handleNewExperiment = () => {
    navigate('/prompt-editor');
  };

  const handleImportTemplate = () => {
    navigate('/template-library');
  };

  const handleViewAnalytics = () => {
    navigate('/analytics-dashboard');
  };

  const handleEditProject = (projectId) => {
    navigate(`/prompt-editor?project=${projectId}`);
  };

  const handleViewProject = (projectId) => {
    navigate(`/project-management?project=${projectId}`);
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev => prev?.filter(n => n?.id !== notificationId));
  };

  const handleViewAllProjects = () => {
    navigate('/project-management');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-15 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your prompt engineering experiments and track performance metrics
            </p>
          </div>

          {/* Notifications */}
          {notifications?.length > 0 && (
            <div className="mb-8">
              <NotificationPanel 
                notifications={notifications}
                onDismiss={handleDismissNotification}
              />
            </div>
          )}

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Projects */}
            <div className="lg:col-span-2 space-y-6">
              {/* Projects Section */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Recent Projects</h2>
                  <Button variant="outline" onClick={handleViewAllProjects}>
                    <Icon name="ArrowRight" size={16} className="ml-1" />
                    View All
                  </Button>
                </div>

                {/* Search and Filters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Input
                    type="search"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e?.target?.value)}
                    className="md:col-span-1"
                  />
                  <Select
                    options={strategyOptions}
                    value={filterStrategy}
                    onChange={setFilterStrategy}
                    placeholder="Filter by strategy"
                  />
                  <Select
                    options={statusOptions}
                    value={filterStatus}
                    onChange={setFilterStatus}
                    placeholder="Filter by status"
                  />
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects?.slice(0, 6)?.map((project) => (
                    <ProjectCard
                      key={project?.id}
                      project={project}
                      onEdit={handleEditProject}
                      onView={handleViewProject}
                    />
                  ))}
                </div>

                {filteredProjects?.length === 0 && (
                  <div className="text-center py-8">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No projects found matching your criteria</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Charts and Actions */}
            <div className="space-y-6">
              {/* Performance Chart */}
              <PerformanceChart 
                data={performanceData}
                title="Success Rate Trend"
              />

              {/* Quick Actions */}
              <QuickActions
                onNewExperiment={handleNewExperiment}
                onImportTemplate={handleImportTemplate}
                onViewAnalytics={handleViewAnalytics}
              />

              {/* Recent Activity */}
              <RecentActivity activities={recentActivities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;