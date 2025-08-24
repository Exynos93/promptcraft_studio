import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications, onDismiss }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success': return 'text-success bg-success/10 border-success/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'error': return 'text-error bg-error/10 border-error/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  if (notifications?.length === 0) return null;

  return (
    <div className="space-y-3">
      {notifications?.map((notification) => (
        <div
          key={notification?.id}
          className={`border rounded-lg p-4 ${getNotificationColor(notification?.type)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <Icon name={getNotificationIcon(notification?.type)} size={20} />
              <div>
                <p className="font-medium">{notification?.title}</p>
                <p className="text-sm opacity-80 mt-1">{notification?.message}</p>
                <p className="text-xs opacity-60 mt-2">{notification?.timestamp}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDismiss(notification?.id)}
              className="opacity-60 hover:opacity-100"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationPanel;