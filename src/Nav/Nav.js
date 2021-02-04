import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context';

import './Nav.css';

export class Nav extends Component {
  static contextType = Context;

  render() {
    const { signedInAs } = this.context;
    return (
      <nav className="nav">
        <img
          src="images/menuBlack.png"
          width="25"
          height="30"
          alt="Menu"
          className="nav-menu"
        />
        <Link to="/">
          <img
            src="images/logo.png"
            width="125"
            alt="ColorStop"
            className="nav-logo"
          />
        </Link>
        {signedInAs.user ? (
          <Link to={`/user/${signedInAs.user.id}`}>
            <img
              className="nav-img"
              src={signedInAs.user.profile_picture}
              alt=""
            />
          </Link>
        ) : (
          <Link to="/sign-in">
            <button className="nav-signin">Sign In</button>
          </Link>
        )}
      </nav>
    );
  }
}

export default Nav;
