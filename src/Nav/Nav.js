import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context';

import menuBlack from '../images/menu-black.png';
import logo from '../images/logo.png';
import './Nav.css';

export class Nav extends Component {
  static contextType = Context;

  state = {
    showMenu: false,
  };

  handleMenuClick = (e) => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
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
        {this.state.showMenu ? (
          <div className="nav-menu">
            {/* {setTimeout(this.handleMenuClick, 3000)} */}
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
                <Link to="/sign-in">
                  <li>Sign In</li>
                </Link>
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
          <Link to="/sign-in">
            <button className="nav-signin">Sign In</button>
          </Link>
        )}
      </nav>
    );
  }
}

export default Nav;
