import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context';
import { v4 as uuidv4 } from 'uuid';

import deleteBlack from '../images/delete-black.png';
// import deleteLight from '../images/delete-light.png';
import './Palette.css';

export class Palette extends Component {
  static contextType = Context;

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
              {palette.hex
                .split(',')
                .filter((hex) => (hex ? hex : null))
                .map((hex, i) => (
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
    ) : Number(userId) === palette.user_id ? (
      <>
        <div className="palette-container" key={uuidv4()}>
          <Link to={`/palette-maker/${palette.id}`}>
            <div className="palette-colors">
              {palette.hex
                .split(',')
                .filter((hex) => (hex ? hex : null))
                .map((hex, i) => (
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
              {signedInAs.user.id === Number(userId) ? (
                <img
                  className="palette-delete"
                  src={deleteBlack}
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
