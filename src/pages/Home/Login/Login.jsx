import React, { useState } from 'react';
import './Login.css';
import logo from '../../../assets/logo.png';
import { login, signup } from '../../../firebase';
import netflix_spinner from '../../../assets/netflix_spinner.gif';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      alert("Authentication failed: " + error.message);
    }

    setLoading(false);
  };

  const toggleSignState = () => {
    setSignState(prev => (prev === "Sign In" ? "Sign Up" : "Sign In"));
  };

  return (
    loading ? (
      <div className="login-spinner">
        <img src={netflix_spinner} alt="Loading..." />
      </div>
    ) : (
      <div className="login">
        <img src={logo} className="login-logo" alt="Netflix Logo" />

        <div className="login-form">
          <h1>{signState}</h1>
          <form onSubmit={user_auth}>
            {signState === "Sign Up" && (
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <button type="submit">{signState}</button>

            <div className="form-help">
              <div className="remember">
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <p className="help-link">Need Help?</p>
            </div>
          </form>

          <div className="form-switch">
            <p>
              {signState === "Sign In" ? "New to Netflix?" : "Already have an account?"}
              <span onClick={toggleSignState}>
                {signState === "Sign In" ? " Sign Up Now" : " Sign In Now"}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Login;
