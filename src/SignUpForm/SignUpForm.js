import React, { Component } from 'react';
import Context from '../Context';

import './SignUpForm.css';

export class SignInPage extends Component {
  static contextType = Context;

  state = {
    signUp: {
      username: '',
      password: '',
      repeatPassword: '',
    },
    showPassword: false,
  };

  validateSignUp = () => {
    const { username, password, repeatPassword } = this.state.signUp;
    const { users = [] } = this.context;

    if (!username || !password || !repeatPassword) {
      return alert('Please enter missing values');
    }

    if (users.find((user) => user.username === username)) {
      return alert('Username is taken');
    } else if (!/^\w+$/.test(username)) {
      return alert('Invalid characters');
    }

    if (password !== repeatPassword) {
      return alert('Passwords do not match');
    }

    return true;
  };

  handleShowPassword = (e) => {
    e.preventDefault();
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleChangeSignUp = (e) => {
    this.setState({
      signUp: { ...this.state.signUp, [e.target.name]: e.target.value },
    });
  };

  handleClickSignUp = (e) => {
    e.preventDefault();
    if (this.validateSignUp()) {
      const username = this.state.signUp.username;
      const password = this.state.signUp.password;

      const newUser = {
        username,
        password,
      };

      this.context.handleAddNewUser(newUser);
    } else {
      return alert('Please resolve any mistakes before continuing');
    }
  };

  render() {
    return (
      <>
        <section className="signup-section">
          <h2>Sign up today!</h2>

          <form className="signup-form">
            <div className="signup-form-username-div">
              <input
                className="signup-form-username-input"
                value={this.state.signUp.username}
                onChange={this.handleChangeSignUp}
                placeholder="Username"
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div className="signup-form-password-div">
              <input
                className="signup-form-password-input"
                value={this.state.signUp.password}
                onChange={this.handleChangeSignUp}
                placeholder="Password"
                type={this.state.showPassword ? 'text' : 'password'}
                name="password"
                id="password"
              />
            </div>
            <div className="signup-form-password-div">
              <input
                className="signup-form-password-input"
                value={this.state.signUp.repeatPassword}
                onChange={this.handleChangeSignUp}
                placeholder="Repeat Password"
                type="password"
                name="repeatPassword"
                id="repeatPassword"
              />
              <button
                className="signup-form-password-show-button"
                style={{ left: this.state.showPassword ? '124px' : '121px' }}
                onClick={this.handleShowPassword}
              >
                {this.state.showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button
              className="signup-form-submit-button"
              onClick={this.handleClickSignUp}
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </section>
      </>
    );
  }
}

export default SignInPage;
