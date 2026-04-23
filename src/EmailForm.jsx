import React, { useState } from "react";
import "./Login.css";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email) {
      setEmailError("Please enter your email.");
      return;
    }
    
    if (!email.includes("@")) {
      setEmailError("Email must contain @");
      return;
    }
    
    // Email is valid
    setEmailError("");
    setSubmitted(true);
    console.log("Email submitted:", email);
    
    // Reset form after successful submission
    setTimeout(() => {
      setEmail("");
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-form-section">
          <div className="login-box">
            <h2>Email Verification</h2>
            <p className="subtitle">Enter your email address</p>

            {(emailError || submitted) && (
              <div style={{ marginBottom: "20px", padding: "12px", backgroundColor: emailError ? "#fee" : "#efe", border: `1px solid ${emailError ? "#fcc" : "#cfc"}`, borderRadius: "4px", color: emailError ? "#c00" : "#0c0" }}>
                {emailError && <p style={{ margin: "0" }}>{emailError}</p>}
                {submitted && <p style={{ margin: "0" }}>Email submitted successfully!</p>}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  className="input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <button type="submit" className="btn-primary">
                Submit Email
              </button>
            </form>
          </div>
        </div>

        <div className="login-graphic-section">
          <img src="/maynard.jpg" alt="Welcome" className="login-graphic-image" />
        </div>
      </div>
    </div>
  );
}
