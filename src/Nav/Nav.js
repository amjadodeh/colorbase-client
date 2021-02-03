import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

export class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <Link to="/" className="logo">
          <div>ColorStop</div>
        </Link>
        <Link to="/sign-in">
          <button>Sign In</button>
        </Link>
      </nav>
    );
  }
}

export default Nav;
