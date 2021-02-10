import React, { Component } from 'react';

import Nav from '../Nav/Nav';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import Footer from '../Footer/Footer';
import './SignInPage.css';

export class SignInPage extends Component {
  render() {
    return (
      <>
        <Nav />
        <SignInForm />
        <br />
        <br />
        <br />
        <SignUpForm />
        <br />
        <Footer />
      </>
    );
  }
}

export default SignInPage;
