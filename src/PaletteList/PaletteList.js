import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Palette from '../Palette/Palette';
import './PaletteList.css';

export class PaletteList extends Component {
  render() {
    if (this.props.userId) {
      if (
        !!this.props.palettes.find(
          (palette) => palette.user_id === Number(this.props.userId)
        )
      ) {
        return (
          <div className="palette-list-container">
            {this.props.palettes.map((palette) => (
              <div key={uuidv4()}>
                <Palette palette={palette} userId={this.props.userId} />
              </div>
            ))}
          </div>
        );
      } else {
        return <p className="palette-list-p">Nothing to see here.</p>;
      }
    } else {
      return (
        <div className="palette-list-container">
          {this.props.palettes.map((palette) => (
            <div key={uuidv4()}>
              <Palette palette={palette} />
            </div>
          ))}
        </div>
      );
    }
  }
}

export default PaletteList;
