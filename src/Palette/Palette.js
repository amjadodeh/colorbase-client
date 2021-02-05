import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Context from '../Context';
import { v4 as uuidv4 } from 'uuid';

// import deleteImg from '../images/delete.png';
import './Palette.css';

export class Palette extends Component {
  static contextType = Context;

  render() {
    const { users = [] } = this.context;
    const { palette, userId } = this.props;
    const user = users.find((user) => palette.user_id === user.id);
    const userName = user.username;

    return !userId ? (
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
            <Link to={`/user/${palette.user_id}`}>{userName}</Link>
          </div>
        </div>
      </>
    ) : userId === palette.user_id ? (
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
            <Link to={`/user/${palette.user_id}`}>{userName}</Link>
          </div>
          {/* <img src={deleteImg} alt="Delete palette" /> */}
        </div>
      </>
    ) : null;
  }
}

export default Palette;
