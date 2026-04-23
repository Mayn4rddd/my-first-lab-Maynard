import React, { useState } from "react";
import "./Login.css";

const Login = ({ onLogin, onShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  // Fixed credentials
  const fixedEmail = "maynardsabijon@gmail.com";
  const fixedPassword = "Maynard123";
  const fixedFirstName = "Maynard";
  const fixedLastName = "Sabijon";

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    // Basic validation
    if (!email) {
      setEmailError("Please enter your email.");
    }
    if (!password) {
      setPasswordError("Please enter your password.");
    }
    if (!email || !password) return;

    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // load registered users
    let users = [];
    try { users = JSON.parse(localStorage.getItem('registeredUsers') || '[]'); } catch (e) { users = []; }

    // Check registered users first
    const registeredUser = users.find(u => u.email === email);
    if (registeredUser) {
      if (registeredUser.password === password) {
        const user = {
          firstName: registeredUser.firstName || '',
          lastName: registeredUser.lastName || '',
          email: registeredUser.email,
        }
        if (typeof onLogin === 'function') onLogin(user)
        return;
      } else {
        setPasswordError('Wrong password.')
        return;
      }
    }

    // Check fixed credentials
    const emailMatches = email === fixedEmail;
    const passwordMatches = password === fixedPassword;

    if (emailMatches && passwordMatches) {
      const user = {
        firstName: fixedFirstName,
        lastName: fixedLastName,
        email: fixedEmail,
      }
      if (typeof onLogin === 'function') onLogin(user)
      return;
    }

    setGeneralError("Invalid email or password.");
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* FORM SECTION */}
        <div className="login-form-section">
          <div className="login-box">
            <h2>Holla, Welcome Back</h2>
            <p className="subtitle">Sign in to continue to your Todo Task</p>

            {(emailError || passwordError || generalError) && (
              <div className="error-box" style={{ marginBottom: "20px", padding: "12px", backgroundColor: "#fee", border: "1px solid #fcc", borderRadius: "4px", color: "#c00" }}>
                {emailError && <p style={{ margin: "0 0 8px 0" }}>{emailError}</p>}
                {passwordError && <p style={{ margin: "0 0 8px 0" }}>{passwordError}</p>}
                {generalError && <p style={{ margin: "0" }}>{generalError}</p>}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="input-group">
                <input
                  className="input"
                
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                    if (generalError) setGeneralError("");
                  }}
                />
              </div>

              {/* Password Input */}
              <div className="input-group">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) setPasswordError("");
                    if (generalError) setGeneralError("");
                  }}
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="form-row">
                <label className="checkbox-group">
                  <input
                    type="checkbox"
                    className="checkbox-input"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkbox-label">Remember me</span>
                </label>
                <a href="#" className="forgot-password-link">Forgot Password?</a>
              </div>

              {/* Sign In Button */}
              <button type="submit" className="btn-primary">
                Sign In
              </button>

              {/* Create Account Button */}
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  if (typeof onShowRegister === 'function') onShowRegister();
                }}
              >
                Create New Account
              </button>
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
};

export default Login;
