import React from 'react';

import logoSmall from '../images/logo-small.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <img src={logoSmall} width="35" alt="ColorStop" />
    </footer>
  );
};

export default Footer;
