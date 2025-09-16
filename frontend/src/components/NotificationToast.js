import React, { useContext, useEffect, useState } from 'react';
import NotificationContext from '../context/NotificationContext';

function NotificationToast() {
  const { notifications } = useContext(NotificationContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (notifications.length > 0) {
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    }
  }, [notifications]);

  return visible && notifications.length > 0 ? (
    <div className="notification-toast">
      {notifications[0].message}
    </div>
  ) : null;
}

export default NotificationToast;