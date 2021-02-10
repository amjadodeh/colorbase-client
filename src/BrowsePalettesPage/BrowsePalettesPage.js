import React, { Component } from 'react';
import Context from '../Context';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import PaletteList from '../PaletteList/PaletteList';
import './BrowsePalettesPage.css';

export class BrowsePalettesPage extends Component {
  static contextType = Context;

  render() {
    const { palettes } = this.context;
    return (
      <div>
        <Nav />
        <header className="browse-palettes-header">
          <h1>Popular palettes</h1>
          <h4>
            Get inspired by popular color palettes created by other users!
          </h4>
        </header>

        <div className="browse-palettes-list">
          <PaletteList palettes={palettes} />
        </div>

        <Footer />
      </div>
    );
  }
}

export default BrowsePalettesPage;
