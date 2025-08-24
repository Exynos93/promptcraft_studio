import React from 'react';
import Icon from '../../../components/AppIcon';
import TemplateCard from './TemplateCard';

const FeaturedSection = ({ featuredTemplates, viewMode }) => {
  if (!featuredTemplates || featuredTemplates?.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Star" size={20} className="text-warning" />
          <h2 className="text-xl font-semibold text-foreground">Featured Templates</h2>
        </div>
        <div className="h-px bg-border flex-1"></div>
      </div>
      <div className={`grid gap-6 ${
        viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' :'grid-cols-1'
      }`}>
        {featuredTemplates?.map((template) => (
          <TemplateCard 
            key={template?.id} 
            template={template} 
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;