import React, { Component } from 'react';
import './PalettePage.css';

export class PalettePage extends Component {
  render() {
    return (
      <div className="palette-maker">
        <section>
          <div class="palette-maker-color">
            <input
              class="1 palette-maker-color-value"
              value="#bbbbbb"
              maxlength="7"
              size="4"
            />
            <br />
            <br />
            <a href="blah">copy</a>
            <br />
            <br />
            <a href="blah">remove color</a>
          </div>
          <div class="palette-maker-color">
            <input
              class="2 palette-maker-color-value"
              value="#dddddd"
              maxlength="7"
              size="4"
            />
            <br />
            <br />
            <a href="blah">copy</a>
            <br />
            <br />
            <a href="blah">remove color</a>
          </div>
          <div class="palette-maker-color">
            <input
              class="1 palette-maker-color-value"
              value="#bbbbbb"
              maxlength="7"
              size="4"
            />
            <br />
            <br />
            <a href="blah">copy</a>
            <br />
            <br />
            <a href="blah">remove color</a>
          </div>
          <div class="palette-maker-color">
            <input
              class="2 palette-maker-color-value"
              value="#dddddd"
              maxlength="7"
              size="4"
            />
            <br />
            <br />
            <a href="blah">copy</a>
            <br />
            <br />
            <a href="blah">remove color</a>
          </div>
        </section>

        <section>
          <button>Randomize!</button>
          <button>Add color</button>
          <button>Upload</button>
        </section>
      </div>
    );
  }
}

export default PalettePage;
