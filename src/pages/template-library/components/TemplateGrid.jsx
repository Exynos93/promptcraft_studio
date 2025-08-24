import React from 'react';
import TemplateCard from './TemplateCard';
import Icon from '../../../components/AppIcon';

const TemplateGrid = ({ templates, viewMode, loading, searchQuery }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-3 text-muted-foreground">
          <div className="animate-spin">
            <Icon name="Loader2" size={20} />
          </div>
          <span>Loading templates...</span>
        </div>
      </div>
    );
  }

  if (!templates || templates?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <Icon name="FileText" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">
          {searchQuery ? 'No templates found' : 'No templates available'}
        </h3>
        <p className="text-muted-foreground max-w-md">
          {searchQuery 
            ? `We couldn't find any templates matching "${searchQuery}". Try adjusting your search terms or filters.`
            : 'There are no templates available in this category. Check back later for new additions.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
    }`}>
      {templates?.map((template) => (
        <TemplateCard 
          key={template?.id} 
          template={template} 
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;