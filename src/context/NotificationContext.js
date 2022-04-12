import React, { useState } from 'react';

const NotificationContext = React.createContext({
  notifications: []
});

const NotificationContextProvider = (props) => {
  const [notifications, setNotifications] = useState([]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export { NotificationContext, NotificationContextProvider };
