import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Context from './Context';
import { API_BASE_URL } from './config';
import LandingPage from './LandingPage/LandingPage';
import SignInOverlay from './SignInOverlay/SignInOverlay';
import PalettePage from './PalettePage/PalettePage';
import BrowsePalettesPage from './BrowsePalettesPage/BrowsePalettesPage';
import UserPage from './UserPage/UserPage';
import './App.css';

class App extends Component {
  state = {
    signedInAs: {
      user: false,
    },
    showMenu: false,
    showSignIn: false,
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
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  fetchHelper(endpoint, method, reqBody) {
    if (reqBody) {
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
          if (method === 'post') {
            if (endpoint === 'users') {
              this.setState({
                users: [...this.state.users, response],
                signedInAs: { user: response },
              });
            } else if (endpoint === 'palettes') {
              this.setState({
                palettes: [...this.state.palettes, response],
              });
            }
          }

          return response;
        })
        .catch((error) => {
          console.error({ error });
        });
    } else {
      fetch(`${API_BASE_URL}/${endpoint}`, {
        method: `${method.toUpperCase()}`,
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) return res.json().then((e) => Promise.reject(e));
          return res.json();
        })
        .then((response) => {
          console.log(response);
          if (method === 'get') {
            if (endpoint === 'palettes') {
              this.setState({ palettes: response });
            } else if (endpoint === 'users') {
              this.setState({ users: response });
            }
          }
        })
        .catch((error) => {
          console.error({ error });
        });
    }
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

  handleAddNewUser = (newUser) => {
    this.fetchHelper('users', 'post', newUser);
  };

  handleChangeUserInfo = (username, profile_picture) => {
    this.fetchHelper(`users/${this.state.signedInAs.user.id}`, 'patch', {
      ...(username && { username }),
      ...(profile_picture && { profile_picture }),
    });

    const newUser = {
      id: this.state.signedInAs.user.id,
      username: username ? username : this.state.signedInAs.user.username,
      profile_picture: profile_picture
        ? profile_picture
        : this.state.signedInAs.user.profile_picture,
      password: this.state.signedInAs.user.password,
    };

    this.fetchHelper('users', 'get');

    this.setState({
      signedInAs: {
        user: newUser,
      },
    });
  };

  handleUploadPalette = (palette) => {
    this.fetchHelper('palettes', 'post', palette);
  };

  handleDeletePalette = (paletteId) => {
    this.fetchHelper(`palettes/${paletteId}`, 'delete');

    this.setState({
      palettes: this.state.palettes.filter(
        (palette) => palette.id !== paletteId
      ),
    });
  };

  handleDeleteUser = (userId) => {
    this.fetchHelper(`users/${userId}`, 'delete');

    this.setState({
      users: this.state.users.filter((user) => user.id !== userId),
      signedInAs: { user: false },
      palettes: this.state.palettes.filter(
        (palette) => palette.user_id !== userId
      ),
    });
  };

  handleShowMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  handleShowSignIn = () => {
    this.setState({
      showSignIn: !this.state.showSignIn,
    });
  };

  render() {
    const value = {
      signedInAs: this.state.signedInAs,
      showMenu: this.state.showMenu,
      showSignIn: this.state.showSignIn,
      users: [...this.state.users],
      palettes: [...this.state.palettes],
      handleSignInUser: this.handleSignInUser,
      handleSignOutUser: this.handleSignOutUser,
      handleAddNewUser: this.handleAddNewUser,
      handleChangeUserInfo: this.handleChangeUserInfo,
      handleUploadPalette: this.handleUploadPalette,
      handleDeletePalette: this.handleDeletePalette,
      handleDeleteUser: this.handleDeleteUser,
      handleShowMenu: this.handleShowMenu,
      handleShowSignIn: this.handleShowSignIn,
    };
    return (
      <Context.Provider value={value}>
        <main className="App">
          <Switch>
            {/* <Route path="/sign-in" component={SignInPage} /> */}
            <Route path="/palette-maker" exact component={PalettePage} />
            <Route path="/palette-maker/:paletteId" component={PalettePage} />
            <Route path="/browse-palettes" component={BrowsePalettesPage} />
            <Route path="/user/:userId" component={UserPage} />
            <Route path="/" component={LandingPage} />
          </Switch>
          {this.state.showSignIn ? <SignInOverlay /> : null}
        </main>
      </Context.Provider>
    );
  }
}

export default App;
