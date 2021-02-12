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
    deletionInput: '',
    signOutVerify: false,
    editUsername: false,
    editPicture: false,
    newPicture: '',
    newUsername: '',
    usernameError: '',
    pictureError: '',
    deleteError: '',
    editingOptionOpen: '',
  };

  checkURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  handleCloseEditingOption = () => {
    this.setState({
      editingOptionOpen: '',
    });
  };

  checkUsername(username) {
    const { users = [] } = this.context;

    if (users.find((user) => user.username === username)) {
      return this.setState({
        usernameError: 'Username is taken',
      });
    } else if (!/^\w+$/.test(username)) {
      return this.setState({
        usernameError: 'Invalid characters',
      });
    }

    return true;
  }

  handleShowInput = (which) => () => {
    if (which === 'username') {
      if (this.state.editingOptionOpen !== 'username') {
        this.setState({
          editingOptionOpen: 'username',
        });
        this.setState({
          editUsername: true,
        });
      } else {
        this.handleCloseEditingOption();
        this.setState({
          editUsername: false,
        });
      }
    }
    if (which === 'picture') {
      if (this.state.editingOptionOpen !== 'picture') {
        this.setState({
          editingOptionOpen: 'picture',
        });
        this.setState({
          editPicture: true,
        });
      } else {
        this.handleCloseEditingOption();
        this.setState({
          editPicture: false,
        });
      }
    }
  };

  handleClickDeleteUser = (go) => () => {
    if (this.state.editingOptionOpen !== 'delete') {
      this.setState({
        editingOptionOpen: 'delete',
      });
    }
    this.setState({
      deletionStarted: true,
    });

    if (go === 'Back') {
      this.handleCloseEditingOption();
      return this.setState({
        deletionStarted: false,
      });
    } else if (go === 'DELETE ACCOUNT') {
      if (this.state.deletionInput === this.context.signedInAs.user.username) {
        this.context.handleDeleteUser(this.context.signedInAs.user.id);
        this.props.history.push(`/`);
      } else {
        return this.setState({
          deleteError: 'Incorrect username',
        });
      }
    }
  };

  handleClickSignOut = (step, yes) => () => {
    if (step === 1) {
      this.setState({
        editingOptionOpen: 'signout',
      });
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
      this.handleCloseEditingOption();
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

  onChangeDeletionInput = (e) => {
    this.setState({
      deletionInput: e.target.value,
    });
  };

  handleSubmit = (which) => (e) => {
    if (which === 'username') {
      if (!this.state.newUsername) {
        return this.setState({
          usernameError: 'Please enter a new username',
        });
      }

      if (this.checkUsername(this.state.newUsername)) {
        this.setState({
          editUsername: !this.state.editUsername,
        });

        this.context.handleChangeUserInfo(this.state.newUsername);
        this.handleClickEdit();
      }
    }

    if (which === 'picture') {
      if (!this.state.newPicture) {
        return this.setState({
          pictureError: 'Please enter a new picture url',
        });
      }

      if (this.checkURL(this.state.newPicture)) {
        this.setState({
          editPicture: !this.state.editPicture,
        });

        this.context.handleChangeUserInfo(null, this.state.newPicture);
        this.handleClickEdit();
      } else {
        return this.setState({
          pictureError: 'Not a picture url!',
        });
      }
    }
  };

  handleClickEdit = () => {
    if (this.state.editingOptionOpen) {
      this.handleCloseEditingOption();
    }
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
            src={editImg}
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
              <div className="user-page-edit-profile-overlay">
                <div className="user-page-settings-top">
                  <div>Account Settings</div>
                  <img
                    className="user-page-edit-profile-btn"
                    src={xImg}
                    alt="Edit profile"
                    onClick={this.handleClickEdit}
                  />
                </div>
                <div className="user-page-edit-profile-overlay-content">
                  {this.state.editUsername &&
                  this.state.editingOptionOpen === 'username' ? (
                    <>
                      <p>Enter your new username</p>
                      <input
                        type="text"
                        placeholder="Username"
                        id="user-page-username"
                        name="username-input"
                        value={this.state.newUsername}
                        onChange={this.onChangeUsername}
                        required
                      />
                      <br />
                      {this.state.usernameError ? (
                        <span className="user-page-error-message">
                          {this.state.usernameError}
                        </span>
                      ) : null}
                      <br />
                      <button onClick={this.handleSubmit('username')}>
                        Submit
                      </button>
                      <button onClick={this.handleShowInput('username')}>
                        Back
                      </button>
                    </>
                  ) : this.state.editingOptionOpen ? null : (
                    <button onClick={this.handleShowInput('username')}>
                      Change username
                    </button>
                  )}
                  {this.state.editPicture &&
                  this.state.editingOptionOpen === 'picture' ? (
                    <>
                      <p>Enter a link to your new picture</p>
                      <input
                        type="text"
                        placeholder="Picture Url"
                        id="user-page-picture-url"
                        name="picture-url-input"
                        value={this.state.newPicture}
                        onChange={this.onChangeUrl}
                        required
                      />
                      <br />
                      {this.state.pictureError ? (
                        <span className="user-page-error-message">
                          {this.state.pictureError}
                        </span>
                      ) : null}
                      <br />
                      <button onClick={this.handleSubmit('picture')}>
                        Submit
                      </button>
                      <button onClick={this.handleShowInput('picture')}>
                        Back
                      </button>
                    </>
                  ) : this.state.editingOptionOpen ? null : (
                    <button onClick={this.handleShowInput('picture')}>
                      Change profile picture
                    </button>
                  )}
                  <br />
                  {this.state.signOutVerify &&
                  this.state.editingOptionOpen === 'signout' ? (
                    <>
                      <p>Sign out now?</p>
                      <button onClick={this.handleClickSignOut(2, true)}>
                        Yes
                      </button>
                      <button onClick={this.handleClickSignOut(2, false)}>
                        No
                      </button>
                    </>
                  ) : this.state.editingOptionOpen ? null : (
                    <button onClick={this.handleClickSignOut(1)}>
                      Sign Out
                    </button>
                  )}
                  <br />
                  {this.state.deletionStarted &&
                  this.state.editingOptionOpen === 'delete' ? (
                    <>
                      <div>
                        <span style={{ color: 'red' }}>
                          PLEASE READ CAREFULLY:
                        </span>
                        <br />
                        Deleting an account is <b>permanent</b>. Your account
                        and <b>all data</b> linked to it will be lost forever.{' '}
                        <b>This CAN NOT be reversed!</b> If you understand and
                        still want to continue, enter your username below and
                        submit.
                      </div>
                      <p style={{ color: 'gray' }}>
                        <i>{signedInAs.user.username}</i>
                      </p>
                      <input
                        type="text"
                        placeholder="Enter username here"
                        id="user-page-account-deletion"
                        name="user-page-account-deletion"
                        value={this.state.deletionInput}
                        style={{ textAlign: 'center' }}
                        onChange={this.onChangeDeletionInput}
                        required
                      />
                      <br />
                      {this.state.deleteError ? (
                        <span className="user-page-error-message">
                          {this.state.deleteError}
                        </span>
                      ) : null}
                      <br />
                      <button
                        onClick={this.handleClickDeleteUser('DELETE ACCOUNT')}
                        style={{ color: 'red' }}
                      >
                        DELETE MY ACCOUNT
                      </button>
                      <button onClick={this.handleClickDeleteUser('Back')}>
                        Back
                      </button>
                    </>
                  ) : this.state.editingOptionOpen ? null : (
                    <button
                      onClick={this.handleClickDeleteUser()}
                      style={{ color: 'red' }}
                    >
                      Delete my account
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </header>

          {this.state.editMode ? null : (
            <>
              {' '}
              <hr className="user-page-hr" />
              <div className="user-page-your-palettes-div">My Palettes</div>
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

            <hr className="user-page-hr" />

            <div className="user-page-your-palettes-div">
              {user.username}'s Palettes
            </div>

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
