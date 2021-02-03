import React, { Component } from 'react';
import PaletteList from '../PaletteList/PaletteList';

export class BrowsePalettesPage extends Component {
  render() {
    return (
      <div>
        <header role="banner">
          <h1>Explore Popular Palettes</h1>
          <h4>
            Get inspired by popular color palettes created by other users!
          </h4>
        </header>

        <PaletteList />
      </div>
    );
  }
}

export default BrowsePalettesPage;
