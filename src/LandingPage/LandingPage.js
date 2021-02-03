import React, { Component } from 'react';
import './LandingPage.css';

export class LandingPage extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Find your perfect color scheme today!</h1>
          <h3>
            Create the perfect color scheme for your project or get inspired by
            popular color palettes created by other users!
          </h3>
          <button>Start creating!</button>
          <br />
          <button>Browse popular palettes</button>
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
            presentation, and even your very own living room needs a good color
            scheme. You can you find the perfect colors for your project here on
            the best color scheme sharing platform for you.
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
            With ColorStop you can create your perfect color scheme, even if you
            are not skilled in design. By pressing 'randomize' button on the
            Palette Maker Page, randomly generate color palettes until you find
            the perfect one for you!
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
    );
  }
}

export default LandingPage;
