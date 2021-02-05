import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context';
import { v4 as uuidv4 } from 'uuid';

import deleteDark from '../images/delete-dark.png';
// import deleteLight from '../images/delete-light.png';
import './Palette.css';

export class Palette extends Component {
  static contextType = Context;

  lightOrDark(color) {
    // ^ this will be needed later...

    var r, g, b, hsp;

    color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));

    r = color >> 16;
    g = (color >> 8) & 255;
    b = color & 255;

    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

    if (hsp > 127.5) {
      return 'light';
    } else {
      return 'dark';
    }
  }

  handleClickDelete = (paletteId) => (e) => {
    this.context.handleDeletePalette(paletteId);
  };

  render() {
    const { users = [], signedInAs = {} } = this.context;
    const { palette, userId } = this.props;
    const user = users.find((user) => palette.user_id === user.id);
    const userName = user.username;

    return !userId ? (
      <>
        <div className="palette-container" key={uuidv4()}>
          <Link to={`/palette-maker/${palette.id}`}>
            <div className="palette-colors">
              {palette.hex.map((hex, i) => (
                <div
                  className="palette-color"
                  key={uuidv4()}
                  style={
                    i === 0
                      ? {
                          backgroundColor: `${hex}`,
                          borderRadius: '15px 0px 0px 0px',
                        }
                      : palette.hex.length - 1 === i
                      ? {
                          backgroundColor: `${hex}`,
                          borderRadius: '0px 15px 0px 0px',
                        }
                      : {
                          backgroundColor: `${hex}`,
                        }
                  }
                ></div>
              ))}
            </div>
          </Link>
          <div className="palette-bottom-div">
            <span className="palette-span-1">
              {palette.palette_name} by{' '}
              <Link to={`/user/${palette.user_id}`}>{userName}</Link>
            </span>
            <span className="palette-span-2">
              <b className="palette-bold">...</b>
            </span>
          </div>
        </div>
      </>
    ) : userId === palette.user_id ? (
      <>
        <div className="palette-container" key={uuidv4()}>
          <Link to={`/palette-maker/${palette.id}`}>
            <div className="palette-colors">
              {palette.hex.map((hex, i) => (
                <div
                  className="palette-color"
                  key={uuidv4()}
                  style={
                    i === 0
                      ? {
                          backgroundColor: `${hex}`,
                          borderRadius: '15px 0px 0px 0px',
                        }
                      : palette.hex.length - 1 === i
                      ? {
                          backgroundColor: `${hex}`,
                          borderRadius: '0px 15px 0px 0px',
                        }
                      : {
                          backgroundColor: `${hex}`,
                        }
                  }
                >
                  {/* {palette.hex.length - 1 === i ? (
                    <img
                      className="palette-delete"
                      src={
                        this.lightOrDark(hex) === 'light'    // ...for stuff like this
                          ? deleteDark
                          : deleteLight
                      }
                      alt="Delete palette"
                      onClick={this.handleClickDelete(palette.id)}
                    />
                  ) : null} */}
                </div>
              ))}
            </div>
          </Link>
          <div className="palette-bottom-div">
            <span className="palette-span-1">
              {palette.palette_name} by{' '}
              <Link to={`/user/${palette.user_id}`}>{userName}</Link>
            </span>
            <span className="palette-span-2">
              {signedInAs.user.id === userId ? (
                <img
                  className="palette-delete"
                  src={deleteDark}
                  alt="Delete palette"
                  onClick={this.handleClickDelete(palette.id)}
                />
              ) : (
                <b className="palette-bold">...</b>
              )}
            </span>
          </div>
        </div>
      </>
    ) : null;
  }
}

export default Palette;
