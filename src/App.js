import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Context from './Context';
import { API_BASE_URL } from './config';
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
    users: [],
    palettes: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${API_BASE_URL}/users`),
      fetch(`${API_BASE_URL}/palettes`),
    ])
      .then(([usersRes, palettesRes]) => {
        if (!usersRes.ok) return usersRes.json().then((e) => Promise.reject(e));
        if (!palettesRes.ok)
          return palettesRes.json().then((e) => Promise.reject(e));

        return Promise.all([usersRes.json(), palettesRes.json()]);
      })
      .then(([users, palettes]) => {
        this.setState({ users, palettes });
        this.setState({
          palettes: this.state.palettes.map((palette) => {
            palette.hex = palette.hex
              .split(',')
              .filter((hex) => (hex ? hex : null));
            return palette;
          }),
        });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  fetchHelper(endpoint, method, reqBody) {
    fetch(`${API_BASE_URL}/${endpoint}`, {
      method: `${method.toUpperCase()}`,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((response) => {
        // return 'success'
        return response;
      })
      .catch((error) => {
        console.error({ error });
      });
  }

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
    this.fetchHelper('users', 'post', user);

    this.setState({
      users: [...this.state.users, user],
      signedInAs: { user: user },
    });
  };

  handleChangeUserProfilePic = (newProfilePic) => {
    this.fetchHelper(`users/${this.state.signedInAs.user.id}`, 'patch', {
      profile_picture: newProfilePic,
    });

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
