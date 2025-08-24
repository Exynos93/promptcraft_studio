import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import KPICard from './components/KPICard';
import PerformanceChart from './components/PerformanceChart';
import StrategyComparisonChart from './components/StrategyComparisonChart';
import ModelPerformanceChart from './components/ModelPerformanceChart';
import CostBreakdownChart from './components/CostBreakdownChart';
import FilterSidebar from './components/FilterSidebar';
import ExportPanel from './components/ExportPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AnalyticsDashboard = () => {
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(true);
  const [isExportPanelOpen, setIsExportPanelOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [filters, setFilters] = useState({
    dateRange: { start: '2024-07-01', end: '2024-08-24' },
    projects: [],
    strategies: [],
    models: []
  });

  // Mock KPI data
  const kpiData = [
    {
      title: "Success Rate",
      value: "94.2%",
      change: "+2.4%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "success"
    },
    {
      title: "Avg Response Time",
      value: "1.8s",
      change: "-0.3s",
      changeType: "positive",
      icon: "Clock",
      color: "primary"
    },
    {
      title: "API Costs",
      value: "$247.50",
      change: "+$23.10",
      changeType: "negative",
      icon: "DollarSign",
      color: "warning"
    },
    {
      title: "Total Experiments",
      value: "1,247",
      change: "+89",
      changeType: "positive",
      icon: "Beaker",
      color: "secondary"
    }
  ];

  // Mock performance trend data
  const performanceData = [
    { date: "Jul 1", successRate: 89, responseQuality: 85, coherenceScore: 82 },
    { date: "Jul 8", successRate: 91, responseQuality: 87, coherenceScore: 84 },
    { date: "Jul 15", successRate: 88, responseQuality: 89, coherenceScore: 86 },
    { date: "Jul 22", successRate: 93, responseQuality: 91, coherenceScore: 88 },
    { date: "Jul 29", successRate: 95, responseQuality: 93, coherenceScore: 90 },
    { date: "Aug 5", successRate: 92, responseQuality: 94, coherenceScore: 91 },
    { date: "Aug 12", successRate: 96, responseQuality: 95, coherenceScore: 93 },
    { date: "Aug 19", successRate: 94, responseQuality: 96, coherenceScore: 94 },
    { date: "Aug 24", successRate: 94, responseQuality: 94, coherenceScore: 92 }
  ];

  // Mock strategy comparison data
  const strategyData = [
    { strategy: "Role Prompting", effectiveness: 92, reliability: 89, speed: 85 },
    { strategy: "Few-shot Learning", effectiveness: 88, reliability: 94, speed: 78 },
    { strategy: "Chain-of-Thought", effectiveness: 95, reliability: 87, speed: 72 },
    { strategy: "Zero-shot", effectiveness: 78, reliability: 82, speed: 95 },
    { strategy: "Template-based", effectiveness: 85, reliability: 91, speed: 88 }
  ];

  // Mock model performance data
  const modelData = [
    { model: "GPT-4", value: 35, experiments: 437 },
    { model: "GPT-3.5 Turbo", value: 28, experiments: 349 },
    { model: "Claude-3", value: 22, experiments: 274 },
    { model: "Cohere Command", value: 10, experiments: 125 },
    { model: "PaLM 2", value: 5, experiments: 62 }
  ];

  // Mock cost breakdown data
  const costData = [
    { date: "Jul 1", gpt4: 45.20, claude: 32.10, cohere: 12.50, other: 8.30 },
    { date: "Jul 8", gpt4: 52.30, claude: 38.40, cohere: 15.20, other: 9.80 },
    { date: "Jul 15", gpt4: 48.90, claude: 35.60, cohere: 13.80, other: 7.90 },
    { date: "Jul 22", gpt4: 58.70, claude: 42.30, cohere: 18.40, other: 11.20 },
    { date: "Jul 29", gpt4: 61.20, claude: 45.80, cohere: 19.90, other: 12.60 },
    { date: "Aug 5", gpt4: 55.40, claude: 41.20, cohere: 17.30, other: 10.80 },
    { date: "Aug 12", gpt4: 63.80, claude: 47.90, cohere: 21.20, other: 13.40 },
    { date: "Aug 19", gpt4: 59.30, claude: 44.60, cohere: 19.80, other: 12.10 },
    { date: "Aug 24", gpt4: 57.20, claude: 43.10, cohere: 18.60, other: 11.30 }
  ];

  // Mock saved reports
  const [savedReports] = useState([
    { id: 1, name: "Weekly Performance", savedAt: "2024-08-20T10:30:00Z" },
    { id: 2, name: "Model Comparison Q3", savedAt: "2024-08-15T14:20:00Z" },
    { id: 3, name: "Cost Analysis July", savedAt: "2024-08-01T09:15:00Z" }
  ]);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger data refetch
    console.log('Filters applied:', newFilters);
  };

  const handleLoadReport = (report) => {
    setFilters(report?.filters);
    console.log('Report loaded:', report);
  };

  const handleSaveReport = (reportConfig) => {
    console.log('Report saved:', reportConfig);
    // In a real app, this would save to backend
  };

  const handleExport = async (exportConfig) => {
    setIsExporting(true);
    console.log('Exporting dashboard:', exportConfig);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsExporting(false);
    setIsExportPanelOpen(false);
  };

  const handleRefreshData = () => {
    setLastUpdated(new Date());
    // In a real app, this would trigger data refetch
    console.log('Data refreshed');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex pt-15">
        {/* Filter Sidebar */}
        {isFilterSidebarOpen && (
          <FilterSidebar
            onFiltersChange={handleFiltersChange}
            savedReports={savedReports}
            onLoadReport={handleLoadReport}
            onSaveReport={handleSaveReport}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
                iconName={isFilterSidebarOpen ? "PanelLeftClose" : "PanelLeftOpen"}
                iconPosition="left"
              >
                {isFilterSidebarOpen ? 'Hide Filters' : 'Show Filters'}
              </Button>
              <Button
                variant="ghost"
                onClick={handleRefreshData}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
              </div>
            </div>
            <Button
              variant="default"
              onClick={() => setIsExportPanelOpen(!isExportPanelOpen)}
              iconName="Download"
              iconPosition="left"
            >
              Export Dashboard
            </Button>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData?.map((kpi, index) => (
              <KPICard key={index} {...kpi} />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="lg:col-span-2">
              <PerformanceChart 
                data={performanceData} 
                title="Performance Trends Over Time"
                height={350}
              />
            </div>
            <StrategyComparisonChart 
              data={strategyData} 
              title="Strategy Type Effectiveness"
              height={300}
            />
            <ModelPerformanceChart 
              data={modelData} 
              title="Model Usage Distribution"
              height={300}
            />
            <div className="lg:col-span-2">
              <CostBreakdownChart 
                data={costData} 
                title="API Cost Breakdown Over Time"
                height={300}
              />
            </div>
          </div>

          {/* Advanced Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cohort Analysis */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Users" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Cohort Analysis</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Week 1 Retention</span>
                  <span className="text-sm font-medium text-foreground">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Week 2 Retention</span>
                  <span className="text-sm font-medium text-foreground">72%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Week 4 Retention</span>
                  <span className="text-sm font-medium text-foreground">58%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Week 8 Retention</span>
                  <span className="text-sm font-medium text-foreground">45%</span>
                </div>
              </div>
            </div>

            {/* A/B Test Results */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="GitBranch" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">A/B Test Results</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Variant A</span>
                    <span className="text-sm font-medium text-foreground">92.3%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '92.3%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">Variant B</span>
                    <span className="text-sm font-medium text-foreground">89.7%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '89.7%' }}></div>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Confidence</span>
                    <span className="text-sm font-medium text-success">95.2%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Predictive Modeling */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="TrendingUp" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Predictive Insights</h3>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="ArrowUp" size={16} className="text-success" />
                    <span className="text-sm font-medium text-success">Performance Trend</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Expected 3.2% improvement in next week
                  </p>
                </div>
                <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-warning">Cost Alert</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Monthly budget may exceed by 12%
                  </p>
                </div>
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon name="Lightbulb" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-primary">Recommendation</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Consider increasing few-shot examples
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export Panel */}
        {isExportPanelOpen && (
          <div className="w-96 border-l border-border">
            <ExportPanel
              onExport={handleExport}
              isExporting={isExporting}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;