import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkActionsToolbar = ({ selectedProjects, onArchive, onShare, onExport, onDelete, onClearSelection }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      await onExport(selectedProjects, format);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = () => {
    onDelete(selectedProjects);
    setShowDeleteConfirm(false);
  };

  if (selectedProjects?.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 shadow-elevation-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedProjects?.length} project{selectedProjects?.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear selection
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Archive */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onArchive(selectedProjects)}
            iconName="Archive"
            iconPosition="left"
            iconSize={16}
          >
            Archive
          </Button>

          {/* Share */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShare(selectedProjects)}
            iconName="Share2"
            iconPosition="left"
            iconSize={16}
          >
            Share
          </Button>

          {/* Export Dropdown */}
          <div className="relative group">
            <Button
              variant="outline"
              size="sm"
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Export
            </Button>
            
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-elevation-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-2">
                <button
                  onClick={() => handleExport('json')}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-micro"
                >
                  <Icon name="FileText" size={16} />
                  <span>Export as JSON</span>
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-micro"
                >
                  <Icon name="Table" size={16} />
                  <span>Export as CSV</span>
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-foreground hover:bg-muted transition-micro"
                >
                  <Icon name="FileText" size={16} />
                  <span>Export as PDF Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Delete */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDeleteConfirm(true)}
              iconName="Trash2"
              iconPosition="left"
              iconSize={16}
              className="text-error hover:text-error border-error hover:border-error"
            >
              Delete
            </Button>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000">
                <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-error bg-opacity-10 rounded-full flex items-center justify-center">
                      <Icon name="AlertTriangle" size={20} className="text-error" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Delete Projects</h3>
                      <p className="text-sm text-muted-foreground">
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground mb-6">
                    Are you sure you want to delete {selectedProjects?.length} project{selectedProjects?.length !== 1 ? 's' : ''}? 
                    All associated data, including prompts, test results, and collaboration history will be permanently removed.
                  </p>
                  
                  <div className="flex items-center justify-end space-x-3">
                    <Button
                      variant="ghost"
                      onClick={() => setShowDeleteConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      iconName="Trash2"
                      iconPosition="left"
                      iconSize={16}
                    >
                      Delete Projects
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;