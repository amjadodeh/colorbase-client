import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import LandingPage from './LandingPage/LandingPage';
import SignInPage from './SignInPage/SignInPage';
import PalettePage from './PalettePage/PalettePage';
import BrowsePalettesPage from './BrowsePalettesPage/BrowsePalettesPage';
import UserPage from './UserPage/UserPage';
import './App.css';

function App() {
  return (
    <main className="App">
      <Nav />
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/palette-maker" component={PalettePage} />
        <Route path="/browse-palettes" component={BrowsePalettesPage} />
        <Route path="/user/:userId" component={UserPage} />
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
