import React, { Component } from 'react';
import bcrypt from 'bcryptjs';

import Context from '../Context';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import PaletteList from '../PaletteList/PaletteList';
import './UserPage.css';

export class UserPage extends Component {
  static contextType = Context;

  state = {
    deletionStarted: false,
    deletionPass: '',
    signOutVerify: false,
    changingPicture: false,
    newPicture: '',
  };

  checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  handleShowInput = () => {
    this.setState({
      changingPicture: !this.state.changingPicture,
    });
  };

  handleClickDeleteUser = (go) => () => {
    this.setState({
      deletionStarted: true,
    });

    if (go === 'Back') {
      return this.setState({
        deletionStarted: false,
      });
    } else if (go === 'DELETE ACCOUNT') {
      bcrypt.compare(
        this.state.deletionPass,
        this.context.signedInAs.user.hashedPassword,
        (err, res) => {
          if (res) {
            this.context.handleDeleteUser(this.context.signedInAs.user.id);
            this.props.history.push(`/`);
          } else {
            return alert('Incorrect password');
          }
        }
      );
    }
  };

  handleClickSignOut = (step, yes) => () => {
    if (step === 1) {
      this.setState({
        signOutVerify: true,
      });
    } else if (yes) {
      this.setState({
        signOutVerify: false,
      });
      this.context.handleSignOutUser();
    } else {
      this.setState({
        signOutVerify: false,
      });
    }
  };

  onChangeUrl = (e) => {
    this.setState({
      newPicture: e.target.value,
    });
  };

  onChangeDeletionPass = (e) => {
    this.setState({
      deletionPass: e.target.value,
    });
  };

  handleSubmit = (e) => {
    if (this.checkURL(this.state.newPicture)) {
      this.context.handleChangeUserProfilePic(this.state.newPicture);
    } else {
      alert('not an image!');
    }
  };

  render() {
    const { signedInAs, users, palettes } = this.context;
    const { userId } = this.props.match.params;
    if (signedInAs.user.id === userId) {
      return (
        <div>
          <Nav />
          <header role="banner">
            <img
              className="user-page-img"
              src={signedInAs.user.profile_picture}
              alt="Profile"
            />
            <h1>{signedInAs.user.username}</h1>
            {this.state.changingPicture ? (
              <div>
                <label htmlFor="user-page-input">Picture Url</label>
                <input
                  type="text"
                  id="user-page-input"
                  name="picture-url-input"
                  value={this.state.newPicture}
                  onChange={this.onChangeUrl}
                  required
                />
                <button onClick={this.handleShowInput}>
                  Changed your mind?
                </button>
                <button onClick={this.handleSubmit}>Submit</button>
              </div>
            ) : (
              <button onClick={this.handleShowInput}>
                Change profile picture?
              </button>
            )}
            <br />
            <br />
            {this.state.signOutVerify ? (
              <>
                <p>Signing out already?</p>
                <button onClick={this.handleClickSignOut(2, false)}>No</button>
                <button onClick={this.handleClickSignOut(2, true)}>Yes</button>
              </>
            ) : (
              <button onClick={this.handleClickSignOut(1)}>Sign Out</button>
            )}
            <br />
            <br />
            {!this.state.deletionStarted ? (
              <button onClick={this.handleClickDeleteUser()}>
                Delete my account
              </button>
            ) : (
              <>
                <div>
                  PLEASE READ CAREFULLY: Deleting an account is permanent. Your
                  account and all data linked to it will be lost forever. This
                  CAN NOT be reversed. If you understand and still want to
                  continue, enter your username below and submit.
                </div>
                <p>{signedInAs.user.username}</p>
                <input
                  type="password"
                  id="user-page-account-deletion"
                  name="user-page-account-deletion"
                  value={this.state.deletionPass}
                  onChange={this.onChangeDeletionPass}
                  required
                />
                <button onClick={this.handleClickDeleteUser('DELETE ACCOUNT')}>
                  DELETE MY ACCOUNT
                </button>
                <button onClick={this.handleClickDeleteUser('Back')}>
                  Back
                </button>
              </>
            )}
          </header>

          <hr />

          <div>Your Palettes</div>

          <br />

          <PaletteList palettes={palettes} userId={userId} />

          <Footer />
        </div>
      );
    } else {
      const user = users.find((user) => user.id === userId);
      if (user) {
        return (
          <div>
            <Nav />
            <header role="banner">
              <img
                className="user-page-img"
                src={user.profile_picture}
                alt="Profile"
              />
              <h1>{user.username}</h1>
            </header>

            <hr />

            <div>{user.username}'s Palettes</div>

            <br />

            <PaletteList palettes={palettes} userId={userId} />

            <Footer />
          </div>
        );
      } else {
        return <>{this.props.history.push('/')}</>;
      }
    }
  }
}

export default UserPage;
