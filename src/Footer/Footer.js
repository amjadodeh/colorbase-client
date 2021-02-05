import React, { Component } from 'react';

import logoSmall from '../images/logo-small.png';
import './Footer.css';

export class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <img src={logoSmall} width="35" alt="ColorStop" />
      </footer>
    );
  }
}

export default Footer;
