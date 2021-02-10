import React, { Component } from 'react';
import Context from '../Context';
import { v4 as uuidv4 } from 'uuid';

import copyBlack from '../images/copy-black.png';
import copyWhite from '../images/copy-white.png';
import deleteBlack from '../images/delete-black.png';
import deleteWhite from '../images/delete-white.png';
import lockBlack from '../images/padlock-black.png';
import lockWhite from '../images/padlock-white.png';
import lockOpenBlack from '../images/padlock-open-black.png';
import lockOpenWhite from '../images/padlock-open-white.png';
import xImg from '../images/X.png';
import Nav from '../Nav/Nav';
import './PalettePage.css';

export class PalettePage extends Component {
  static contextType = Context;

  state = {
    showPaletteName: false,
    palette_name: '',
    copied: '',
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
          locked: false,
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
            locked: false,
            colorHex:
              '#' +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
          },
          {
            id: uuidv4(),
            locked: false,
            colorHex:
              '#' +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
          },
          {
            id: uuidv4(),
            locked: false,
            colorHex:
              '#' +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
          },
          {
            id: uuidv4(),
            locked: false,
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
      locked: color.locked,
      colorHex: color.id === colorId ? e.target.value : color.colorHex,
    }));

    this.setState({
      colors: changedColors,
    });
  };

  handleRandomize = () => {
    const randomizedColors = this.state.colors.map((color) => ({
      id: color.id,
      locked: color.locked,
      colorHex: color.locked
        ? color.colorHex
        : '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
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
        locked: false,
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
      this.context.handleShowSignIn();
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

  handleLockColor = (colorId) => () => {
    const changedColors = this.state.colors.map((color) => ({
      id: color.id,
      locked: color.id === colorId ? !color.locked : color.locked,
      colorHex: color.colorHex,
    }));

    this.setState({
      colors: changedColors,
    });
  };

  lightOrDark(color) {
    var r, g, b, hsp;

    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;

    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    if (hsp > 127.5) {
      return true;
    } else {
      return false;
    }
  }

  handleShowPaletteName = () => {
    if (this.context.signedInAs.user) {
      this.setState({
        showPaletteName: !this.state.showPaletteName,
      });
    } else {
      this.context.handleShowSignIn();
    }
  };

  render() {
    return (
      <div className="palette-maker">
        <Nav />
        {this.state.colors.map((color) => (
          <div
            className="palette-maker-color"
            key={color.id}
            style={{ backgroundColor: color.colorHex }}
          >
            <input
              className="palette-maker-color-hex"
              value={color.colorHex}
              style={{
                color: this.lightOrDark(color.colorHex) ? '#000' : '#fff',
              }}
              maxLength="7"
              size="2"
              onChange={this.handleChangeHex(color.id)}
            />
            <span className="palette-maker-color-options">
              <img
                className="palette-maker-copy-color"
                src={this.lightOrDark(color.colorHex) ? copyBlack : copyWhite}
                alt="Copy color"
                onClick={this.handleCopyHex(color.colorHex)}
              />

              {color.colorHex === this.state.copied ? (
                <div className="palette-maker-copied-message">
                  Color copied to clipboard!
                </div>
              ) : null}

              <img
                className="palette-maker-delete-color"
                src={
                  this.lightOrDark(color.colorHex) ? deleteBlack : deleteWhite
                }
                alt="Delete color"
                onClick={this.handleRemoveColor(color.id)}
              />

              <img
                className="palette-maker-lock-color"
                src={
                  this.lightOrDark(color.colorHex)
                    ? color.locked
                      ? lockBlack
                      : lockOpenBlack
                    : color.locked
                    ? lockWhite
                    : lockOpenWhite
                }
                alt="Delete color"
                onClick={this.handleLockColor(color.id)}
              />
            </span>
          </div>
        ))}
        <div className="palette-maker-palette-options">
          <button onClick={this.handleRandomize}>Randomize!</button>
          <button onClick={this.handleAddColor}>Add color</button>
          <button onClick={this.handleShowPaletteName}>Upload</button>
        </div>

        {this.state.showPaletteName ? (
          <>
            <div className="palette-maker-palette-name-overlay">
              <section className="palette-maker-palette-name-input-section">
                <div className="palette-maker-x-div">
                  <img
                    src={xImg}
                    alt="Exit"
                    className="palette-maker-x"
                    onClick={this.handleShowPaletteName}
                  />
                </div>
                <input
                  className="palette-maker-palette-name-input"
                  value={this.state.palette_name}
                  placeholder="Palette name"
                  type="text"
                  name="palette-maker-palette-name"
                  onChange={this.handleChangeName}
                />
                <button
                  className="palette-maker-palette-name-upload-button"
                  onClick={this.handleUpload}
                >
                  Upload now!
                </button>
              </section>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default PalettePage;
