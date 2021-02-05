import React, { Component } from 'react';
import Context from '../Context';
import { v4 as uuidv4 } from 'uuid';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import './SignInPage.css';

export class SignInPage extends Component {
  static contextType = Context;

  state = {
    signIn: {
      username: '',
      password: '',
    },
    signUp: {
      username: '',
      password: '',
      repeatPassword: '',
    },
  };

  validateSignIn = () => {
    const { username, password } = this.state.signIn;
    // const { users = [] } = this.context;

    if (!username || !password) {
      return alert('Please enter missing values');
    }
    return true;
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

  handleChangeSignIn = (e) => {
    this.setState({
      signIn: { ...this.state.signIn, [e.target.name]: e.target.value },
    });
  };

  handleChangeSignUp = (e) => {
    this.setState({
      signUp: { ...this.state.signUp, [e.target.name]: e.target.value },
    });
  };

  handleClickSignIn = (e) => {
    e.preventDefault();
    if (this.validateSignIn()) {
      const username = this.state.signIn.username;
      const password = this.state.signIn.password;
      const { users = [], handleSignInUser } = this.context;

      const user = users.find((user) => user.username === username);

      if (user) {
        if (password === user.password) {
          handleSignInUser(user);
          this.props.history.push(`/user/${user.id}`);
        } else {
          return alert('Incorrect password');
        }
      } else {
        return alert('User does not exist');
      }
    } else {
      return alert('Please resolve any mistakes before continuing');
    }
  };

  handleClickSignUp = (e) => {
    e.preventDefault();
    if (this.validateSignUp()) {
      const username = this.state.signUp.username;
      const password = this.state.signUp.password;
      const { handleAddNewUser } = this.context;

      const newUser = {
        id: uuidv4(),
        username: username,
        profile_picture:
          'https://images.pexels.com/photos/1887946/pexels-photo-1887946.jpeg',
        password: password,
      };
      handleAddNewUser(newUser);
      this.props.history.push(`/user/${newUser.id}`);
    } else {
      return alert('Please resolve any mistakes before continuing');
    }
  };

  render() {
    return (
      <>
        <Nav />
        <section className="signin-section">
          <br />
          <h1>Sign In</h1>
          <br />

          <form className="signin-form">
            <div>
              <label htmlFor="username">Username</label>
              <input
                value={this.state.signIn.username}
                onChange={this.handleChangeSignIn}
                placeholder="Your username"
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                value={this.state.signIn.password}
                onChange={this.handleChangeSignIn}
                placeholder="Your password"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <button onClick={this.handleClickSignIn} type="submit">
              Sign In
            </button>
          </form>
          <br />
          <br />
        </section>

        <br />
        <br />
        <br />

        <section className="signup-section">
          <header role="banner">
            <h2>New to ColorStop?</h2>
            <h2>Sign up today!</h2>
            <h6>
              When you're done, you can upload your favorite palettes for
              everyone to enjoy!
            </h6>
          </header>
          <form className="signup-form">
            <div>
              <label htmlFor="username">Username</label>
              <input
                value={this.state.signUp.username}
                onChange={this.handleChangeSignUp}
                placeholder="Your username"
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                value={this.state.signUp.password}
                onChange={this.handleChangeSignUp}
                placeholder="Your password"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div>
              <label htmlFor="repeatPassword"></label>
              <input
                value={this.state.signUp.repeatPassword}
                onChange={this.handleChangeSignUp}
                placeholder="Repeat your password"
                type="password"
                name="repeatPassword"
                id="repeatPassword"
              />
            </div>
            <button onClick={this.handleClickSignUp} type="submit">
              Sign Up
            </button>
          </form>
        </section>

        <br />
        <Footer />
      </>
    );
  }
}

export default SignInPage;
