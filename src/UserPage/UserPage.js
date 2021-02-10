import React, { Component } from 'react';

import Context from '../Context';
import editImg from '../images/edit.png';
import xImg from '../images/X.png';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import PaletteList from '../PaletteList/PaletteList';
import './UserPage.css';

export class UserPage extends Component {
  static contextType = Context;

  state = {
    editMode: false,
    deletionStarted: false,
    deletionPass: '',
    signOutVerify: false,
    editProfile: false,
    newPicture: '',
    newUsername: '',
  };

  checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  checkUsername(username) {
    const { users = [] } = this.context;

    if (users.find((user) => user.username === username)) {
      return alert('Username is taken');
    } else if (!/^\w+$/.test(username)) {
      return alert('Invalid characters');
    }

    return true;
  }

  handleShowInput = () => {
    this.setState({
      editProfile: !this.state.editProfile,
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
      if (this.state.deletionPass === this.context.signedInAs.user.username) {
        this.context.handleDeleteUser(this.context.signedInAs.user.id);
        this.props.history.push(`/`);
      } else {
        return alert('Incorrect username');
      }
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
      this.props.history.push(`/`);
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

  onChangeUsername = (e) => {
    this.setState({
      newUsername: e.target.value,
    });
  };

  onChangeDeletionPass = (e) => {
    this.setState({
      deletionPass: e.target.value,
    });
  };

  handleSubmit = (e) => {
    if (!this.state.newUsername && !this.state.newPicture) {
      return alert('Please enter a what you want to change');
    }

    if (this.state.newUsername) {
      if (!this.checkUsername(this.state.newUsername)) {
        return alert('Username invalid!');
      }
    }

    if (this.state.newPicture) {
      if (!this.checkURL(this.state.newPicture)) {
        return alert('not an image!');
      }
    }

    this.setState({
      editProfile: !this.state.editProfile,
    });

    this.context.handleChangeUserInfo(
      this.state.newUsername,
      this.state.newPicture
    );
  };

  handleClickEdit = () => {
    this.setState({
      editMode: !this.state.editMode,
    });
  };

  render() {
    const { signedInAs, users, palettes } = this.context;
    const { userId } = this.props.match.params;
    if (signedInAs.user.id === Number(userId)) {
      return (
        <div>
          <Nav />
          <img
            className="user-page-edit-profile"
            src={this.state.editMode ? xImg : editImg}
            alt="Edit profile"
            onClick={this.handleClickEdit}
          />
          <header role="banner">
            <img
              className="user-page-img"
              src={signedInAs.user.profile_picture}
              alt="Profile"
            />
            <h1>{signedInAs.user.username}</h1>
            {this.state.editMode ? (
              <>
                {this.state.editProfile ? (
                  <div>
                    <label htmlFor="user-page-username">Username</label>
                    <input
                      type="text"
                      id="user-page-username"
                      name="username-input"
                      value={this.state.newUsername}
                      onChange={this.onChangeUsername}
                      required
                    />
                    <label htmlFor="user-page-picture-url">Picture Url</label>
                    <input
                      type="text"
                      id="user-page-picture-url"
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
                  <button onClick={this.handleShowInput}>Edit profile?</button>
                )}
                {this.state.signOutVerify ? (
                  <>
                    <p>Signing out already?</p>
                    <button onClick={this.handleClickSignOut(2, false)}>
                      No
                    </button>
                    <button onClick={this.handleClickSignOut(2, true)}>
                      Yes
                    </button>
                  </>
                ) : (
                  <button onClick={this.handleClickSignOut(1)}>Sign Out</button>
                )}
                {!this.state.deletionStarted ? (
                  <button onClick={this.handleClickDeleteUser()}>
                    Delete my account
                  </button>
                ) : (
                  <>
                    <div>
                      PLEASE READ CAREFULLY: Deleting an account is permanent.
                      Your account and all data linked to it will be lost
                      forever. This CAN NOT be reversed. If you understand and
                      still want to continue, enter your username below and
                      submit.
                    </div>
                    <p>{signedInAs.user.username}</p>
                    <input
                      type="text"
                      id="user-page-account-deletion"
                      name="user-page-account-deletion"
                      value={this.state.deletionPass}
                      onChange={this.onChangeDeletionPass}
                      required
                    />
                    <button
                      onClick={this.handleClickDeleteUser('DELETE ACCOUNT')}
                    >
                      DELETE MY ACCOUNT
                    </button>
                    <button onClick={this.handleClickDeleteUser('Back')}>
                      Back
                    </button>
                  </>
                )}
              </>
            ) : null}
          </header>

          {this.state.editMode ? null : (
            <>
              {' '}
              <hr />
              <div>Your Palettes</div>
              <br />
              <PaletteList palettes={palettes} userId={userId} />
              <Footer />
            </>
          )}
        </div>
      );
    } else {
      const user = users.find((user) => user.id === Number(userId));
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
