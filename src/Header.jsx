import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

export default function Header({ onLogout }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [headerImage, setHeaderImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('currentUser');
      if (raw) {
        const cu = JSON.parse(raw);
        setCurrentUser(cu);
        try {
          const imgs = JSON.parse(localStorage.getItem('profileImages') || '{}');
          if (imgs && imgs[cu.email]) setHeaderImage(imgs[cu.email]);
        } catch (e) {}
      }
    } catch (e) {
      setCurrentUser(null);
    }
  }, []);

  const handleLogout = () => {
    try { localStorage.removeItem('currentUser'); } catch (e) {}
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <div className="app-header" style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
      <div className="header-left">
        <div className="header-avatar">
          {headerImage ? <img src={headerImage} alt="user" /> : <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%',height:'100%'}}>{currentUser ? `${(currentUser.firstName[0]||'').toUpperCase()}${(currentUser.lastName[0]||'').toUpperCase()}` : 'U'}</div>}
        </div>
        <div className="header-greeting">{currentUser ? `Welcome!! ${currentUser.lastName}, ${currentUser.firstName}` : 'Welcome'}</div>
      </div>

      <div className="header-buttons">
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <button className="btn btn--profile">Dashboard</button>
        </NavLink>
        <NavLink to="/profile" style={{ textDecoration: 'none' }}>
          <button className="btn btn--profile">Profile</button>
        </NavLink>
        <NavLink to="/accounts" style={{ textDecoration: 'none' }}>
          <button className="btn btn--accounts">View Accounts</button>
        </NavLink>
        <NavLink to="/contacts" style={{ textDecoration: 'none' }}>
          <button className="btn btn--profile">Contacts</button>
        </NavLink>
        <button className="btn btn--logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
