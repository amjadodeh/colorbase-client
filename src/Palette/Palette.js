import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context';
import { v4 as uuidv4 } from 'uuid';

import upImg from '../images/up.png';
import downImg from '../images/down.png';
import './Palette.css';

export class Palette extends Component {
  static contextType = Context;

  state = {
    expanded: false,
  };

  handleClickExpand = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  handleClickDelete = (paletteId) => (e) => {
    e.preventDefault();
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
              {palette.palette_name}
              <br />
              {this.state.expanded ? (
                <>
                  by <Link to={`/user/${palette.user_id}`}>{userName}</Link>
                </>
              ) : null}
            </span>
            <span className="palette-span-2" onClick={this.handleClickExpand}>
              {this.state.expanded ? (
                <img
                  className="palette-expand-button"
                  src={downImg}
                  alt="Expand palette info"
                />
              ) : (
                <img
                  className="palette-expand-button"
                  src={upImg}
                  alt="Expand palette info"
                  onClick={this.handleClickExpand}
                />
              )}
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
              {palette.palette_name}
              <br />
              {this.state.expanded ? (
                <>
                  by <Link to={`/user/${palette.user_id}`}>{userName}</Link>
                  {signedInAs.user.id === Number(userId) ? (
                    <>
                      <br />
                      <span
                        className="palette-delete-span"
                        onClick={this.handleClickDelete(palette.id)}
                      >
                        <a href="true">Delete palette</a>
                      </span>
                    </>
                  ) : null}
                </>
              ) : null}
            </span>
            <span className="palette-span-2" onClick={this.handleClickExpand}>
              {this.state.expanded ? (
                <img
                  className="palette-expand-button"
                  src={downImg}
                  alt="Expand palette info"
                />
              ) : (
                <img
                  className="palette-expand-button"
                  src={upImg}
                  alt="Expand palette info"
                  onClick={this.handleClickExpand}
                />
              )}
            </span>
          </div>
        </div>
      </>
    ) : null;
  }
}

export default Palette;
