import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportPanel = ({ onExport, isExporting }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedCharts, setSelectedCharts] = useState(['all']);
  const [includeRawData, setIncludeRawData] = useState(false);

  const exportFormats = [
    { id: 'pdf', name: 'PDF Report', icon: 'FileText', description: 'Comprehensive visual report' },
    { id: 'csv', name: 'CSV Data', icon: 'Database', description: 'Raw data export' },
    { id: 'png', name: 'PNG Images', icon: 'Image', description: 'Individual chart images' },
    { id: 'json', name: 'JSON Data', icon: 'Code', description: 'Structured data export' }
  ];

  const chartOptions = [
    { id: 'all', name: 'All Charts' },
    { id: 'kpi', name: 'KPI Cards' },
    { id: 'performance', name: 'Performance Trends' },
    { id: 'strategy', name: 'Strategy Comparison' },
    { id: 'model', name: 'Model Performance' },
    { id: 'cost', name: 'Cost Breakdown' }
  ];

  const handleChartToggle = (chartId) => {
    if (chartId === 'all') {
      setSelectedCharts(['all']);
    } else {
      setSelectedCharts(prev => {
        const filtered = prev?.filter(id => id !== 'all');
        if (filtered?.includes(chartId)) {
          return filtered?.filter(id => id !== chartId);
        } else {
          return [...filtered, chartId];
        }
      });
    }
  };

  const handleExport = () => {
    onExport({
      format: selectedFormat,
      charts: selectedCharts,
      includeRawData,
      timestamp: new Date()?.toISOString()
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Export Dashboard</h3>
      </div>
      {/* Export Format Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Export Format</h4>
        <div className="grid grid-cols-2 gap-3">
          {exportFormats?.map(format => (
            <label key={format?.id} className="cursor-pointer">
              <input
                type="radio"
                name="exportFormat"
                value={format?.id}
                checked={selectedFormat === format?.id}
                onChange={(e) => setSelectedFormat(e?.target?.value)}
                className="sr-only"
              />
              <div className={`p-3 border rounded-lg transition-micro ${
                selectedFormat === format?.id 
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name={format?.icon} size={16} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">{format?.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{format?.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Chart Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Include Charts</h4>
        <div className="space-y-2">
          {chartOptions?.map(chart => (
            <label key={chart?.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCharts?.includes(chart?.id)}
                onChange={() => handleChartToggle(chart?.id)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-foreground">{chart?.name}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Additional Options */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Additional Options</h4>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={includeRawData}
            onChange={(e) => setIncludeRawData(e?.target?.checked)}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
          />
          <span className="text-sm text-foreground">Include raw data tables</span>
        </label>
      </div>
      {/* Export Actions */}
      <div className="space-y-2">
        <Button
          variant="default"
          fullWidth
          onClick={handleExport}
          loading={isExporting}
          iconName="Download"
          iconPosition="left"
        >
          {isExporting ? 'Exporting...' : 'Export Dashboard'}
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="Eye"
          iconPosition="left"
        >
          Preview Export
        </Button>
      </div>
      {/* Export History */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Exports</h4>
        <div className="space-y-2">
          {[
            { name: 'Analytics Report - Aug 2024.pdf', date: '2024-08-24', size: '2.4 MB' },
            { name: 'Performance Data.csv', date: '2024-08-23', size: '156 KB' },
            { name: 'Strategy Charts.png', date: '2024-08-22', size: '890 KB' }
          ]?.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{file?.name}</p>
                  <p className="text-xs text-muted-foreground">{file?.date} • {file?.size}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" iconName="Download">
                Download
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;