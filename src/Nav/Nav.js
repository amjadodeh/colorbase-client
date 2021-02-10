import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context';

import menuBlack from '../images/menu-black.png';
import logo from '../images/logo.png';
import './Nav.css';

export class Nav extends Component {
  static contextType = Context;

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleMenuClick = (e) => {
    e.preventDefault();
    this.context.handleShowMenu();
  };

  render() {
    return (
      <nav className="nav">
        <img
          src={menuBlack}
          width="25"
          height="30"
          alt="Menu"
          className="nav-menu-button"
          onClick={this.handleMenuClick}
        />
        {this.context.showMenu ? (
          <div className="nav-menu" onClick={this.handleMenuClick}>
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/palette-maker">
                <li>Create</li>
              </Link>
              <Link to="/browse-palettes">
                <li>Explore</li>
              </Link>
              <hr />
              {this.context.signedInAs.user ? (
                <>
                  <Link to={`/user/${this.context.signedInAs.user.id}`}>
                    <li>My Account</li>
                  </Link>
                  <Link onClick={this.context.handleSignOutUser}>
                    <li>Sign Out</li>
                  </Link>
                </>
              ) : (
                <a href="true" onClick={this.context.handleShowSignIn}>
                  <li>Sign In</li>
                </a>
              )}
              <hr />
              <Link to="/learn-about-colors">
                <li>Learn About Colors</li>
              </Link>
            </ul>
          </div>
        ) : null}
        <Link to="/">
          <img src={logo} width="125" alt="ColorStop" className="nav-logo" />
        </Link>
        {this.context.signedInAs.user ? (
          <Link to={`/user/${this.context.signedInAs.user.id}`}>
            <img
              className="nav-user-img"
              src={this.context.signedInAs.user.profile_picture}
              alt=""
            />
          </Link>
        ) : (
          <button
            onClick={this.context.handleShowSignIn}
            className="nav-signin"
          >
            Sign In
          </button>
        )}
      </nav>
    );
  }
}

export default Nav;
