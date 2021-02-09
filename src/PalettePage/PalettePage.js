import React, { Component } from 'react';
import Context from '../Context';
import { v4 as uuidv4 } from 'uuid';

import Nav from '../Nav/Nav';
import './PalettePage.css';

export class PalettePage extends Component {
  static contextType = Context;

  state = {
    palette_name: 'My New Palette',
    copied: 'Copy',
    colors: [],
  };

  componentDidMount() {
    const { paletteId } = this.props.match.params;
    const { palettes = [] } = this.context;
    if (paletteId) {
      const palette = palettes.find(
        (palette) => palette.id === Number(paletteId)
      );
      const paletteName = `${palette.palette_name} (Forked)`;
      const colors = palette.hex
        .split(',')
        .filter((hex) => (hex ? hex : null))
        .map((hex) => ({
          id: uuidv4(),
          colorHex: hex,
        }));
      this.setState({
        palette_name: paletteName,
        colors: [...colors],
      });
    } else {
      this.setState({
        colors: [
          {
            id: uuidv4(),
            colorHex:
              '#' +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
          },
          {
            id: uuidv4(),
            colorHex:
              '#' +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
          },
          {
            id: uuidv4(),
            colorHex:
              '#' +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
          },
          {
            id: uuidv4(),
            colorHex:
              '#' +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
          },
        ],
      });
    }
  }

  handleChangeName = (e) => {
    this.setState({
      palette_name: e.target.value,
    });
  };

  handleChangeHex = (colorId) => (e) => {
    const changedColors = this.state.colors.map((color) => ({
      id: color.id,
      colorHex: color.id === colorId ? e.target.value : color.colorHex,
    }));

    this.setState({
      colors: changedColors,
    });
  };

  handleRandomize = () => {
    const randomizedColors = this.state.colors.map((color) => ({
      id: color.id,
      colorHex:
        '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
    }));

    this.setState({
      colors: randomizedColors,
    });
  };

  handleAddColor = () => {
    if (this.state.colors.length >= 10) {
      alert('you have reached the maximum color palette limit');
    } else {
      const newHex =
        '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0');
      const newColor = {
        id: uuidv4(),
        colorHex: newHex,
      };

      this.setState({
        colors: [...this.state.colors, newColor],
      });
    }
  };

  handleUpload = () => {
    if (this.context.signedInAs.user) {
      const hexValues = [this.state.colors.map((color) => color.colorHex)];

      const newPalette = {
        palette_name: this.state.palette_name,
        hex: hexValues.toString(),
        user_id: this.context.signedInAs.user.id,
      };

      this.context.handleUploadPalette(newPalette);
      this.props.history.push(`/user/${this.context.signedInAs.user.id}`);
    } else {
      return alert('Please sign in to upload');
    }
  };

  handleCopyHex = (colorHex) => (e) => {
    var el = document.createElement('textarea');
    el.value = colorHex;
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' }; // can't see meeeeeee
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.setState({
      copied: colorHex,
    });
    setTimeout(() => {
      this.setState({
        copied: '',
      });
    }, 2000);
  };

  handleRemoveColor = (colorId) => () => {
    if (this.state.colors.length <= 2) {
      alert('you have reached the minimum color palette limit');
    } else {
      this.setState({
        colors: this.state.colors.filter((color) => color.id !== colorId),
      });
    }
  };

  render() {
    return (
      <div className="palette-maker">
        <Nav />
        <div>
          <label htmlFor="palette-page-name">Palette Name</label>
          <input
            value={this.state.palette_name}
            placeholder="Enter palette name here"
            type="text"
            name="palette-page-name"
            id="palette-page-name"
            onChange={this.handleChangeName}
          />
          <button onClick={this.handleRandomize}>Randomize!</button>
          <button onClick={this.handleAddColor}>Add color</button>
          <button onClick={this.handleUpload}>Upload</button>
        </div>

        {this.state.colors.map((color) => (
          <div
            className="palette-maker-color"
            key={color.id}
            style={{ backgroundColor: color.colorHex }}
          >
            <input
              value={color.colorHex}
              maxLength="7"
              size="2"
              onChange={this.handleChangeHex(color.id)}
            />
            <button onClick={this.handleCopyHex(color.colorHex)}>
              {color.colorHex === this.state.copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={this.handleRemoveColor(color.id)}>
              Remove color
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default PalettePage;
