import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Palette from '../Palette/Palette';
import './PaletteList.css';

const PaletteList = (props) => {
  if (props.userId) {
    if (
      !!props.palettes.find(
        (palette) => palette.user_id === Number(props.userId)
      )
    ) {
      return (
        <div className="palette-list-container">
          {props.palettes.map((palette) => (
            <div key={uuidv4()}>
              <Palette palette={palette} userId={props.userId} />
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
        {props.palettes.map((palette) => (
          <div key={uuidv4()}>
            <Palette palette={palette} />
          </div>
        ))}
      </div>
    );
  }
};

export default PaletteList;
