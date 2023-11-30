import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignUp: false,
    };
  }

  toggleForm = () => {
    this.setState((prevState) => ({
      isSignUp: !prevState.isSignUp,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  render() {
    const { isSignUp } = this.state;

    return (
      <div>
        <div className="section">
          <div className="container">
            <div className="row full-height justify-content-center">
              <div className="col-12 text-center align-self-center py-5">
                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                  <h6 className="mb-0 pb-3">
                    <span onClick={this.toggleForm}>Log In </span>
                    <span onClick={this.toggleForm}>Sign Up</span>
                  </h6>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="reg-log"
                    name="reg-log"
                  />
                  <label htmlFor="reg-log"></label>
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front">
                        {isSignUp ? null : (
                          <form onSubmit={this.handleSubmit}>
                            <div className="center-wrap">
                              <div className="section text-center">
                                <h4 className="mb-4 pb-3">Log In</h4>
                                <div className="form-group">
                                  <input
                                    type="email"
                                    name="logemail"
                                    className="form-style"
                                    placeholder="Your Email"
                                    id="logemail"
                                    autoComplete="off"
                                  />
                                  <i className="input-icon uil uil-at"></i>
                                </div>
                                <div className="form-group mt-2">
                                  <input
                                    type="password"
                                    name="logpass"
                                    className="form-style"
                                    placeholder="Your Password"
                                    id="logpass"
                                    autoComplete="off"
                                  />
                                  <i className="input-icon uil uil-lock-alt"></i>
                                </div>
                                <button type="submit" className="btn mt-4">
                                  Submit
                                </button>
                                <p className="mb-0 mt-4 text-center">
                                  <a href="#0" className="link">
                                    Forgot your password?
                                  </a>
                                </p>
                              </div>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
