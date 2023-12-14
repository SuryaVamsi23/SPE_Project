
  import React, { Component } from 'react';
  import './LoginScreen.css';
  import { Link } from 'react-router-dom'; 
  import Cookies from 'js-cookie';  
  import baseurl from '../Baseurl';

  class LoginScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLogin: true,
        url: baseurl,
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        token: ''
      };
    }

    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    };

    handlelogin = async (e) =>{
      try {
        console.log("Inside llogin")
        console.log(this.state.name);
        console.log(this.state.password);
        const newurl = this.state.url + 'login_user';
        console.log(newurl);
        await fetch(newurl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_name: this.state.name,
            password: this.state.password,
          }),
        }).then(res => res.json()).then((response => {
          console.log(response.success)
          if (response.success === "true") {
            Cookies.set('cookie',response.id, { expires: 7 })
            Cookies.set('name',response.id, { expires: 7 })
            this.props.history.push('/viewgroups');
          } else {
            alert('Not able to Login In. Please check your information.');
            console.log('Request was not successful');
          }
        }));
      } 
      catch (error) {
        console.error('Error:', error);
      }
    }
    
    handleclick = async (e) =>{
      e.preventDefault();
      try {
        console.log(this.state.email);
        console.log(this.state.name);
        const newurl = this.state.url + 'create_user';
        console.log(newurl);
        await fetch(newurl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_name: this.state.name,
            email: this.state.email,
            password: this.state.password,
          }),
        }).then(res => res.json()).then((response => {
          console.log(response.success)
          if (response.success === "true") {
            Cookies.set('cookie',response.id, { expires: 7 })
            Cookies.set('name',response.name, { expires: 7 })
            this.props.history.push('/viewgroups');
          } else {
            alert('Not able to sign up. Please check your information.');
            console.log('Request was not successful');
          }
        }));
      } 
      catch (error) {
        console.error('Error:', error);
      }
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
                      <button type="proceed" onClick={this.handlelogin}>Proceed</button>
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
