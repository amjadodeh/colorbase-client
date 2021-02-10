import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
              Create the perfect color scheme for your project or get inspired
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
              <h3>The Perfect Colors</h3>
            </header>
            <p>
              [<em>placeholder for image</em>]
            </p>
            <p>
              ColorStop is the essential tool for creating and exploring color
              palettes. Every brand, website, app, game, book, artwork,
              presentation, and even your very own living room needs a good
              color scheme. You can you find the perfect colors for your project
              here on the best color scheme sharing platform for you.
            </p>
          </section>

          <section className="landing-section">
            <header>
              <h3>Simple, Easy, Palette Maker Interface</h3>
            </header>
            <p>
              [<em>placeholder for image</em>]
            </p>
            <p>
              With ColorStop you can create your perfect color scheme, even if
              you are not skilled in design. By pressing 'randomize' button on
              the Palette Maker Page, randomly generate color palettes until you
              find the perfect one for you!
            </p>
          </section>

          <section className="landing-section">
            <header>
              <h3>Explore Color Palettes</h3>
            </header>
            <p>
              [<em>placeholder for image</em>]
            </p>
            <p>
              ColorStop has a huge collection of color palettes that are well
              organized and ready to be used by you!
            </p>
          </section>
        </div>
        <Footer />
      </>
    );
  }
}

export default LandingPage;
