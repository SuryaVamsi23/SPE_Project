
import React, { Component } from 'react';
import './LoginScreen.css';
import { Link } from 'react-router-dom'; 

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      url: 'https://b69a-119-161-98-68.ngrok-free.app/',
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleclick = async () =>{
    var newurl = this.state.url + 'create_user';
      fetch(newurl, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: {
          email: this.state.email,password: this.state.password,name: this.state.name}
        }
      );
      console.log(newurl,this.state.name,this.state.password,this.state.email);

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
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                  <Link to="viewgroups">
                    <button type="submit">Login</button>
                  </Link>
                </>
              ) : (
                <>
                <label>Name:</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <label>Confirm Password:</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={this.handleChange}
                />
                    <button type="submit" onClick={this.handleclick}>Signup</button>
                </>
              )}
            </form>
          </div>
        </div>
    );
  }
}

export default LoginScreen;
