import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import Context from '../Context';

import PaletteList from '../PaletteList/PaletteList';
import './UserPage.css';

export class UserPage extends Component {
  static contextType = Context;

  state = {
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

  handleSubmit = (e) => {
    if (this.checkURL(this.state.newPicture)) {
      this.context.handleChangeUserProfilePic();
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
            {this.state.signOutVerify ? (
              <>
                <button onClick={this.handleClickSignOut(2, false)}>No</button>
                <button onClick={this.handleClickSignOut(2, true)}>Yes</button>
              </>
            ) : (
              <button onClick={this.handleClickSignOut(1)}>Sign Out</button>
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

          <div>{user.username}'s' Palettes</div>

          <br />

          <PaletteList palettes={palettes} userId={userId} />

          <Footer />
        </div>
      );
    }
  }
}

export default UserPage;
