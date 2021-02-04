import React, { Component } from 'react';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import './SignInPage.css';

export class SignInPage extends Component {
  render() {
    return (
      <>
        <Nav />
        <section className="signup-section">
          <header role="banner">
            <h1>Sign up today!</h1>
            <h6>
              When you're done, you can upload your favorite palettes for
              everyone to enjoy!
            </h6>
          </header>
          <form className="signup-form">
            <div>
              <label htmlFor="username">Username</label>
              <input
                placeholder="Your username"
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </section>

        <br />
        <br />
        <br />

        <section className="signin-section">
          <br />
          <h2>Already a member?</h2>
          <h2>Sign in here!</h2>
          <br />

          <form className="signin-form">
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <br />
          <br />
        </section>

        <br />
        <Footer />
      </>
    );
  }
}

export default SignInPage;
