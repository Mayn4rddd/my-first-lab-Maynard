import React, { useEffect, useState } from 'react';
import './Accounts.css';
import './Card.css';

export default function Accounts() {
  const [users, setUsers] = useState([]);
  const [profileImages, setProfileImages] = useState({});

  useEffect(() => {
    // Load initial data
    const loadData = () => {
      try {
        const all = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        setUsers(Array.isArray(all) ? all : []);

        // Load profile images
        const imgs = JSON.parse(localStorage.getItem('profileImages') || '{}');
        setProfileImages(imgs || {});
      } catch (e) {
        setUsers([]);
        setProfileImages({});
      }
    };

    loadData();

    // Listen for changes to profileImages in localStorage from other tabs/windows
    const handleStorageChange = (e) => {
      if (e.key === 'profileImages' || e.key === 'registeredUsers') {
        loadData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleDelete = (email) => {
    try {
      const all = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const filtered = Array.isArray(all) ? all.filter(u => u.email !== email) : [];
      localStorage.setItem('registeredUsers', JSON.stringify(filtered));
      setUsers(filtered);
      // If deleted user is currentUser, leave login state untouched (login/logout handled elsewhere)
    } catch (e) {}
  };

  const getInitials = (firstName, lastName) => {
    return `${(firstName?.[0] || '').toUpperCase()}${(lastName?.[0] || '').toUpperCase()}`;
  };

  return (
    <div style={center}>
      <div className="card-container">
        <div className="accounts-header">
          <h3>Registered Accounts</h3>
        </div>

        <div className="accounts-body">
          {users.length === 0 ? (
            <p className="muted">No registered users.</p>
          ) : (
            <div className="table-wrap">
              <table className="accounts-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => {
                    const initials = getInitials(u.firstName, u.lastName);
                    const image = profileImages[u.email];
                    return (
                      <tr key={i}>
                        <td>
                          <div className="table-avatar">
                            {image ? (
                              <img src={image} alt={u.username} />
                            ) : (
                              <div className="table-initials">{initials || 'U'}</div>
                            )}
                          </div>
                        </td>
                        <td>{u.firstName || ''}</td>
                        <td>{u.lastName || ''}</td>
                        <td>{u.username || '(not set)'}</td>
                        <td>{u.email || ''}</td>
                        <td><button className="btn btn--logout" onClick={() => handleDelete(u.email)}>Delete</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const center = {
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};
