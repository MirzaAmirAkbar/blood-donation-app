import React, { useEffect, useState } from 'react';
//import '../styles/NotificationsPage.css'; // optional styling

const NotificationsPage = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userEmail = storedUser.email;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/appointment/notifications?email=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (userEmail) {
      fetchNotifications();
    }
  }, [userEmail]);

  return (
    <div className="notifications-page">
      <h2>Your Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications available.</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notif) => (
            <li key={notif._id} className="notification-item">
              <p><strong>{new Date(notif.notification_time).toLocaleString()}</strong></p>
              <p>{notif.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
