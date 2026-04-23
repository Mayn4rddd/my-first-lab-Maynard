import React, { useEffect, useState, useRef } from "react";
import './Profile.css';
import './Card.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('currentUser');
      const cu = raw ? JSON.parse(raw) : null;
      if (!cu) {
        setUser(null);
        return;
      }

      // Try to find username from registeredUsers if not present
      let username = cu.username || '';
      try {
        const all = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const found = all.find(u => u.email === cu.email);
        if (found && found.username) username = found.username;
      } catch (e) {}

      const u = {
        firstName: cu.firstName || '',
        lastName: cu.lastName || '',
        username: username || '',
        email: cu.email || ''
      };
      setUser(u);

      // load saved image for this user
      try {
        const imgs = JSON.parse(localStorage.getItem('profileImages') || '{}');
        if (imgs && imgs[u.email]) setImage(imgs[u.email]);
      } catch (e) {}
    } catch (e) {
      setUser(null);
    }
  }, []);

  const handleFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f || !user) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result;
      try {
        const imgs = JSON.parse(localStorage.getItem('profileImages') || '{}');
        imgs[user.email] = data;
        localStorage.setItem('profileImages', JSON.stringify(imgs));
      } catch (err) {}
      setImage(data);
    };
    reader.readAsDataURL(f);
  };

  const triggerUpload = () => {
    if (fileRef.current) fileRef.current.click();
  };

  if (!user) return (
    <div style={center}>
      <div className="card-container small">
        <div className="profile-header">
          <h3>Profile</h3>
        </div>
        <div className="profile-body">
          <p>No user information available.</p>
        </div>
      </div>
    </div>
  );

  const initials = `${(user.firstName[0]||'').toUpperCase()}${(user.lastName[0]||'').toUpperCase()}`;

  return (
    <div style={center}>
      <div className="card-container">
        <div className="profile-header">
          <h3>Profile</h3>
        </div>

        <div className="profile-body">
          <div className="avatar">
            {image ? <img src={image} alt="profile" className="avatar-img" /> : initials || 'U'}
          </div>

          <div className="fields">
            <div className="upload-row">
              <button className="upload-btn" onClick={triggerUpload} aria-label="Upload profile photo">Upload Photo</button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} aria-hidden />
              <span className="muted">PNG, JPG — saved to local device storage</span>
            </div>

            <div className="field">
              <div className="label">Email</div>
              <div className="value">{user.email}</div>
            </div>

            <div className="field">
              <div className="label">First Name</div>
              <div className="value">{user.firstName}</div>
            </div>

            <div className="field">
              <div className="label">Last Name</div>
              <div className="value">{user.lastName}</div>
            </div>

            <div className="field">
              <div className="label">Username</div>
              <div className="value">{user.username || '(not set)'}</div>
            </div>
          </div>
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
