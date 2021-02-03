import React, { Component } from 'react';
import './SignInPage.css';

export class SignInPage extends Component {
  render() {
    return (
      <div>
        <section class="signup-section">
          <header role="banner">
            <h1>Sign up today!</h1>
            <h6>
              When you're done, you can upload your favorite palettes for
              everyone to enjoy!
            </h6>
          </header>
          <form class="signup-form">
            <div>
              <label for="username">Username</label>
              <input
                placeholder="Your username"
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div>
              <label for="email">Email</label>
              <input type="text" name="email" id="email" />
            </div>
            <div>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </section>

        <br />
        <br />
        <br />

        <section class="signin-section">
          <br />
          <h2>Already a member?</h2>
          <h2>Sign in here!</h2>
          <br />

          <form class="signin-form">
            <div>
              <label for="username">Username/Email</label>
              <input type="text" name="username" id="username" />
            </div>
            <div>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <br />
          <br />
        </section>

        <br />
      </div>
    );
  }
}

export default SignInPage;
