import React, { createContext, useState, useEffect } from 'react';
import io from 'socket.io-client';

const NotificationContext = createContext();
const socket = io('http://localhost:5000');

export function NotificationProvider({ user, children }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.emit('register', user);
    socket.on('notification', (notif) => setNotifications(prev => [notif, ...prev]));
    return () => socket.off('notification');
  }, [user]);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;