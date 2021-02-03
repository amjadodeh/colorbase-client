import React from 'react';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import LandingPage from './LandingPage/LandingPage';
import PalettePage from './PalettePage/PalettePage';
import PaletteList from './PaletteList/PaletteList';
import UserPage from './UserPage/UserPage';
import SignInPage from './SignInPage/SignInPage';
import './App.css';

function App() {
  return (
    <main className="App">
      <Nav />
      <LandingPage />
      <hr />
      <PalettePage />
      <hr />
      <PaletteList />
      <hr />
      <UserPage />
      <hr />
      <SignInPage />
      <hr />
      <Footer />
    </main>
  );
}

export default App;
