import React, { useState, useRef } from "react";
import "./Login.css";

export default function Register({ onRegistered, onCancel }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [photo, setPhoto] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileRef = useRef(null);

  const validate = () => {
    setError("");
    if (!firstName) return "Please enter first name.";
    if (!lastName) return "Please enter last name.";
    if (!username || username.length < 3) return "Username must be at least 3 characters.";
    if (!email || !email.includes("@")) return "Please enter a valid email.";
    if (!password) return "Please enter a password.";
    if (password.length < 8) return "Password must be at least 8 characters long.";
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNum = /\d/.test(password);
    const hasSpec = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/.test(password);
    if (!hasUpper || !hasLower || !hasNum || !hasSpec) return "Password must include uppercase, lowercase, number and special character.";
    if (password !== confirm) return "Passwords do not match.";
    return "";
  };

  const handlePhotoUpload = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(f);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }

    // load existing
    let users = [];
    try { users = JSON.parse(localStorage.getItem('registeredUsers') || '[]'); } catch (e) { users = []; }

    if (users.some(u => u.email === email)) { setError('Email already registered.'); return; }

    const newUser = { firstName, lastName, username, email, password };
    users.push(newUser);
    try { localStorage.setItem('registeredUsers', JSON.stringify(users)); } catch (e) { /* ignore */ }

    // Save profile photo if uploaded
    if (photo) {
      try {
        const imgs = JSON.parse(localStorage.getItem('profileImages') || '{}');
        imgs[email] = photo;
        localStorage.setItem('profileImages', JSON.stringify(imgs));
      } catch (e) { /* ignore */ }
    }

    setSuccess('Account created. Redirecting to login...');
    setTimeout(() => {
      setSuccess('');
      if (typeof onRegistered === 'function') onRegistered();
    }, 1200);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* FORM SECTION */}
        <div className="login-form-section">
          <div className="login-box">
            <h2>Create Account</h2>
            <p className="subtitle">Sign up to get started</p>

            {(error || success) && (
              <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: error ? "#fee" : "#efe", border: `1px solid ${error ? "#fcc" : "#cfc"}`, borderRadius: "4px", color: error ? "#c00" : "#0c0" }}>
                {error && <p style={{ margin: "0" }}>{error}</p>}
                {success && <p style={{ margin: "0" }}>{success}</p>}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input className="input" placeholder="First Name" value={firstName} onChange={e=>setFirstName(e.target.value)} />
              <input className="input" placeholder="Last Name" value={lastName} onChange={e=>setLastName(e.target.value)} />
              <input className="input" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
              <input className="input"  placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
              <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
              <input className="input" type="password" placeholder="Confirm Password" value={confirm} onChange={e=>setConfirm(e.target.value)} />

              <div style={{ margin: "15px 0", textAlign: "center" }}>
                <button type="button" className="btn-primary" onClick={() => fileRef.current?.click()} style={{ width: "100%" }}>
                  {photo ? "Change Photo" : "Add Profile Photo"}
                </button>
                <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
                {photo && (
                  <div style={{ marginTop: "10px" }}>
                    <img src={photo} alt="profile preview" style={{ width: "80px", height: "80px", borderRadius: "50%", objectFit: "cover" }} />
                  </div>
                )}
              </div>

              <button type="submit" className="btn-primary">Sign Up</button>
              <button type="button" className="btn-secondary" onClick={() => { if (typeof onCancel === 'function') onCancel(); }}>Back to Login</button>
            </form>
          </div>
        </div>

        {/* GRAPHIC SECTION */}
        <div className="login-graphic-section">
          <img src="/maynard.jpg" alt="Welcome" className="login-graphic-image" />
        </div>
      </div>
    </div>
  );
}
