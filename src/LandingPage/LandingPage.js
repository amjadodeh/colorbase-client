import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import paletteExample from '../images/palette-example.png';
import paletteMakerExample from '../images/palette-maker-example.png';
import ExplorePalettesExample from '../images/explore-palettes-example.png';
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import './LandingPage.css';

export class LandingPage extends Component {
  render() {
    return (
      <>
        <Nav />
        <div className="landing-div">
          <header className="landing-header">
            <h1>Find the perfect color palette for you!</h1>
            <h4>
              Create the perfect color palette for your project or get inspired
              by popular color palettes created by other users!
            </h4>
            <Link to="/palette-maker">
              <button className="landing-button-1">Start creating!</button>
            </Link>
            <br />
            <Link to="/browse-palettes">
              <button className="landing-button-2">
                Explore popular palettes
              </button>
            </Link>
          </header>

          <section className="landing-section">
            <header>
              <h3>The Perfect Palette</h3>
            </header>
            <img
              className="landing-img"
              src={paletteExample}
              alt="Palette example"
            />
            <p>
              ColorStop is the essential tool for creating and exploring color
              palettes.
            </p>
          </section>

          <section className="landing-section">
            <header>
              <h3>Simple, Fast, Palette Maker</h3>
            </header>
            <img
              className="landing-img"
              src={paletteMakerExample}
              alt="Palette example"
            />
            <p>
              You can create your perfect color palette, even if you are not
              skilled in design. Press 'randomize' on the Palette Maker page to
              randomly generate color palettes until you find the perfect one
              for you!
            </p>
          </section>

          <section className="landing-section">
            <header>
              <h3>Explore Color Palettes</h3>
            </header>
            <img
              className="landing-img"
              src={ExplorePalettesExample}
              alt="Palette example"
            />
            <p>
              ColorStop has a huge collection of color palettes that are well
              organized and ready to be used!
            </p>
          </section>
        </div>
        <Footer />
      </>
    );
  }
}

export default LandingPage;
