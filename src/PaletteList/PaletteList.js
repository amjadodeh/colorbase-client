import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Palette from '../Palette/Palette';
import './PaletteList.css';

export class PaletteList extends Component {
  render() {
    if (this.props.userId) {
      return this.props.palettes.map((palette) => (
        <div key={uuidv4()}>
          <Palette palette={palette} userId={this.props.userId} />
        </div>
      ));
    } else {
      return this.props.palettes.map((palette) => (
        <div key={uuidv4()}>
          <Palette palette={palette} />
        </div>
      ));
    }
  }
}

export default PaletteList;
