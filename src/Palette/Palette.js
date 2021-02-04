import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './Palette.css';

export class Palette extends Component {
  render() {
    const { palette } = this.props;
    return (
      <>
        <div className="palette-container" key={uuidv4()}>
          <Link to={`/palette-maker/${palette.id}`}>
            <div className="palette-colors">
              {palette.hex.map((hex) => (
                <div
                  className="palette-color"
                  key={uuidv4()}
                  style={{ backgroundColor: `${hex}` }}
                ></div>
              ))}
            </div>
          </Link>
          <div>
            {palette.palette_name} by{' '}
            <Link to={`/user/${palette.user_id}`}>{palette.user_id}</Link>
          </div>
        </div>
      </>
    );
  }
}

export default Palette;
