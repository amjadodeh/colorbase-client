import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Context from './Context';
import LandingPage from './LandingPage/LandingPage';
import SignInPage from './SignInPage/SignInPage';
import PalettePage from './PalettePage/PalettePage';
import BrowsePalettesPage from './BrowsePalettesPage/BrowsePalettesPage';
import UserPage from './UserPage/UserPage';
import './App.css';

class App extends Component {
  state = {
    signedInAs: {
      user: false,
    },
    users: [
      {
        id: 32413,
        username: 'asdfman',
        profile_picture:
          'https://images.pexels.com/photos/1887946/pexels-photo-1887946.jpeg',
        salt: '54335',
        hashedPassword: '9U8basbdya7',
      },
    ],
    palettes: [
      {
        id: 1,
        palette_name: 'Colorrrrssss',
        hex: ['#ff0000', '#00ff00', '#0000ff', '#ff00ff'],
        user_id: 32413,
      },
      {
        id: 2,
        palette_name: 'Nice Colors',
        hex: ['#ffff00', '#00ffff', '#f0f0f0', '#0f0f0f'],
        user_id: 32413,
      },
      {
        id: 3,
        palette_name: 'Noice Colours',
        hex: ['#0f000f', '#f000f0', '#000f00', '#00f000'],
        user_id: 32413,
      },
      {
        id: 4,
        palette_name: 'The Chosen One: Jumping down the rabit hole.',
        hex: ['#dddddd', '#bbbbbb', '#dddddd', '#bbbbbb'],
        user_id: 32413,
      },
      {
        id: 5,
        palette_name: 'The Chosen One: Taking the red pill.',
        hex: ['#dddddd', '#bbbbbb', '#dddddd', '#bbbbbb', '#dddddd'],
        user_id: 32413,
      },
      {
        id: 6,
        palette_name: 'The Chosen One: Am I The Chosen One?',
        hex: ['#dddddd', '#bbbbbb', '#dddddd', '#bbbbbb', '#dddddd', '#bbbbbb'],
        user_id: 32413,
      },
      {
        id: 7,
        palette_name: `The Chosen One: He's beginning to believe!!!`,
        hex: [
          '#dddddd',
          '#bbbbbb',
          '#dddddd',
          '#bbbbbb',
          '#dddddd',
          '#bbbbbb',
          '#dddddd',
          '#bbbbbb',
          '#dddddd',
          '#bbbbbb',
        ],
        user_id: 32413,
      },
    ],
  };

  handleAddNewUser = (user) => {
    this.setState({
      users: [...this.state.users, user],
      signedInAs: { user: user },
    });
  };

  handleSignInUser = (user) => {
    this.setState({
      signedInAs: { user: user },
    });
  };

  handleSignOutUser = () => {
    this.setState({
      signedInAs: { user: false },
    });
  };

  handleChangeUserProfilePic = (newProfilePic) => {
    const newUser = {
      id: this.state.signedInAs.user.id,
      username: this.state.signedInAs.user.username,
      profile_picture: newProfilePic,
      salt: this.state.signedInAs.user.salt,
      hashedPassword: this.state.signedInAs.user.hashedPassword,
    };

    this.setState({
      signedInAs: {
        user: newUser,
      },
      users: [...this.state.users, newUser],
    });
  };

  handleUploadPalette = (palette) => {
    this.setState({
      palettes: [...this.state.palettes, palette],
    });
  };

  handleDeletePalette = (paletteId) => {
    this.setState({
      palettes: this.state.palettes.filter(
        (palette) => palette.id !== paletteId
      ),
    });
  };

  handleDeleteUser = (userId) => {
    this.setState({
      users: this.state.users.filter((user) => user.id !== userId),
      signedInAs: { user: false },
    });
  };

  render() {
    const value = {
      signedInAs: this.state.signedInAs,
      users: [...this.state.users],
      palettes: [...this.state.palettes],
      handleAddNewUser: this.handleAddNewUser,
      handleSignInUser: this.handleSignInUser,
      handleSignOutUser: this.handleSignOutUser,
      handleChangeUserProfilePic: this.handleChangeUserProfilePic,
      handleUploadPalette: this.handleUploadPalette,
      handleDeletePalette: this.handleDeletePalette,
      handleDeleteUser: this.handleDeleteUser,
    };
    return (
      <Context.Provider value={value}>
        <main className="App">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/palette-maker" exact component={PalettePage} />
            <Route path="/palette-maker/:paletteId" component={PalettePage} />
            <Route path="/browse-palettes" component={BrowsePalettesPage} />
            <Route path="/user/:userId" component={UserPage} />
          </Switch>
        </main>
      </Context.Provider>
    );
  }
}

export default App;
