import React, { Component } from 'react';
import Context from '../Context';

import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import xImg from '../images/X.png';
import './SignInOverlay.css';

export class SignInPage extends Component {
  static contextType = Context;

  state = {
    newUser: false,
  };

  handleSwitchForm = (e) => {
    e.preventDefault();
    this.setState({
      newUser: !this.state.newUser,
    });
  };

  handleExitClick = () => {
    this.context.handleShowSignIn();
  };

  render() {
    if (!this.state.newUser) {
      return (
        <div className="signin-overlay">
          <section className="signin-overlay-section">
            <div className="signin-overlay-x-div">
              <img
                src={xImg}
                alt="Exit"
                className="signin-overlay-x"
                onClick={this.handleExitClick}
              />
            </div>
            <SignInForm />
            <hr />
            <div className="signin-overlay-form-change">
              Don't have an account?{' '}
              <a href="true" onClick={this.handleSwitchForm}>
                Sign up
              </a>
            </div>
          </section>
        </div>
      );
    } else {
      return (
        <div className="signin-overlay">
          <section className="signin-overlay-section">
            <div className="signin-overlay-x-div">
              <img
                src={xImg}
                alt="Exit"
                className="signin-overlay-x"
                onClick={this.handleExitClick}
              />
            </div>
            <SignUpForm />
            <hr />
            <div className="signin-overlay-form-change">
              Already have an account?{' '}
              <a href="true" onClick={this.handleSwitchForm}>
                Sign in
              </a>
            </div>
          </section>
        </div>
      );
    }
  }
}

export default SignInPage;
