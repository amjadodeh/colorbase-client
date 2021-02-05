import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Context from './Context';
import LandingPage from './LandingPage/LandingPage';
import SignInPage from './SignInPage/SignInPage';
import PalettePage from './PalettePage/PalettePage';
import BrowsePalettesPage from './BrowsePalettesPage/BrowsePalettesPage';
import UserPage from './UserPage/UserPage';
import './App.css';

const demo_account_id = uuidv4();

class App extends Component {
  state = {
    signedInAs: {
      user: false,
    },
    users: [
      {
        id: demo_account_id,
        username: 'asdfUser',
        profile_picture:
          'https://images.pexels.com/photos/1887946/pexels-photo-1887946.jpeg',
        password: 'asdfPass',
      },
    ],
    palettes: [
      {
        id: 1,
        palette_name: 'Colorrrrssss',
        hex: ['#ff0000', '#00ff00', '#0000ff', '#ff00ff'],
        user_id: demo_account_id,
      },
      {
        id: 2,
        palette_name: 'Nice Colors',
        hex: ['#ffff00', '#00ffff', '#f0f0f0', '#0f0f0f'],
        user_id: demo_account_id,
      },
      {
        id: 3,
        palette_name: 'Noice Colours',
        hex: ['#0f000f', '#f000f0', '#000f00', '#00f000'],
        user_id: demo_account_id,
      },
      {
        id: 4,
        palette_name: 'Down the rabit hole...',
        hex: ['#000000', '#00ff00', '#000000', '#00ff00'],
        user_id: demo_account_id,
      },
      {
        id: 5,
        palette_name: 'Taking the red pill.',
        hex: ['#000000', '#00ff00', '#000000', '#00ff00', '#000000'],
        user_id: demo_account_id,
      },
      {
        id: 6,
        palette_name: 'Am I The Chosen One?',
        hex: ['#000000', '#00ff00', '#000000', '#00ff00', '#000000', '#00ff00'],
        user_id: demo_account_id,
      },
      {
        id: 7,
        palette_name: `He's beginning to believe!!!`,
        hex: [
          '#000000',
          '#00ff00',
          '#000000',
          '#00ff00',
          '#000000',
          '#00ff00',
          '#000000',
          '#00ff00',
          '#000000',
          '#00ff00',
        ],
        user_id: demo_account_id,
      },
    ],
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

  handleAddNewUser = (user) => {
    this.setState({
      users: [...this.state.users, user],
      signedInAs: { user: user },
    });
  };

  handleChangeUserProfilePic = (newProfilePic) => {
    const newUser = {
      id: this.state.signedInAs.user.id,
      username: this.state.signedInAs.user.username,
      profile_picture: newProfilePic,
      password: this.state.signedInAs.user.password,
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
      palettes: this.state.palettes.filter(
        (palette) => palette.user_id !== userId
      ),
    });
  };

  render() {
    const value = {
      signedInAs: this.state.signedInAs,
      users: [...this.state.users],
      palettes: [...this.state.palettes],
      handleSignInUser: this.handleSignInUser,
      handleSignOutUser: this.handleSignOutUser,
      handleAddNewUser: this.handleAddNewUser,
      handleChangeUserProfilePic: this.handleChangeUserProfilePic,
      handleUploadPalette: this.handleUploadPalette,
      handleDeletePalette: this.handleDeletePalette,
      handleDeleteUser: this.handleDeleteUser,
    };
    return (
      <Context.Provider value={value}>
        <main className="App">
          <Switch>
            <Route path="/sign-in" component={SignInPage} />
            <Route path="/palette-maker" exact component={PalettePage} />
            <Route path="/palette-maker/:paletteId" component={PalettePage} />
            <Route path="/browse-palettes" component={BrowsePalettesPage} />
            <Route path="/user/:userId" component={UserPage} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </main>
      </Context.Provider>
    );
  }
}

export default App;
