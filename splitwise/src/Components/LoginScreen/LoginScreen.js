
import React, { Component } from 'react';
import './LoginScreen.css';
import { Link } from 'react-router-dom'; 

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
    };
  }

  toggleSlider = () => {
    this.setState((prevState) => ({
      isLogin: !prevState.isLogin,
    }));
  };

  render() {
    return (
        <div className="login-container">
          <div className={`slider ${this.state.isLogin ? 'login' : 'signup'}`}>
            <div className="slider-content">
              <div className="toggle-btn" onClick={this.toggleSlider}>
                {this.state.isLogin ? 'Login' : 'Signup'}
              </div>
              <div className="slider-text">
                {this.state.isLogin ? "Don't have an account?" : 'Already have an account?'}
                <span className="toggle-link" onClick={this.toggleSlider}>
                  {this.state.isLogin ? ' Sign up' : ' Login'}
                </span>
              </div>
            </div>
          </div>

          <div className="form-container">
            <form className={this.state.isLogin ? 'login-form' : 'signup-form'}>
              {this.state.isLogin ? (
                <>
                  <label>Email:</label>
                  <input type="email" placeholder="Enter your email" />
                  <label>Password:</label>
                  <input type="password" placeholder="Enter your password" />
                  <Link to="viewgroups">
                    <button type="submit">Login</button>
                  </Link>
                </>
              ) : (
                <>
                  <label>Name:</label>
                  <input type="text" placeholder="Enter your name" />
                  <label>Email:</label>
                  <input type="email" placeholder="Enter your email" />
                  <label>Password:</label>
                  <input type="password" placeholder="Enter your password" />
                  <label>Confirm Password:</label>
                  <input type="password" placeholder="Confirm your password" />
                  <Link to = "/viewgroups">
                    <button type="submit">Signup</button>
                  </Link>
                </>
              )}
            </form>
          </div>
        </div>
    );
  }
}

export default LoginScreen;
