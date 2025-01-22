import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = ({ isSignUp }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(isSignUp);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isSignUpMode) {
      // Login validation
      if (email === 'test@test.com' && password === 'test123') {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials. Use test@test.com / test123');
      }
    } else {
      // For sign up, just navigate to dashboard for now
      navigate('/dashboard');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="left-content">
        <h1>
          <span>Transform Soil</span>
          <span>Insights into Action</span>
        </h1>
        <p>Leverage AI-powered soil analysis and real-time insights to make informed decisions for sustainable agriculture and soil health</p>
      </div>
      
      <div className="form-container">
        <div className="form-header">
          <button 
            className={isSignUpMode ? 'active' : ''} 
            onClick={() => setIsSignUpMode(true)}
          >
            SIGN UP
          </button>
          <button 
            className={!isSignUpMode ? 'active' : ''} 
            onClick={() => setIsSignUpMode(false)}
          >
            LOGIN
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {isSignUpMode ? (
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Your password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn create-account-btn">Create an Account</button>
            <div className="divider">or</div>
            <button type="button" className="btn gmail-btn">Login via gmail</button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="Your password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn create-account-btn">Login</button>
            <div className="divider">or</div>
            <button type="button" className="btn gmail-btn">Login via gmail</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;
