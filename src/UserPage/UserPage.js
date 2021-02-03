import React, { Component } from 'react';
import PaletteList from '../PaletteList/PaletteList';

export class UserPage extends Component {
  render() {
    return (
      <div>
        <header role="banner">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fvectors%2Fdefault-avatar-profile-icon-grey-photo-placeholder-vector-id1018999828%3Fb%3D1%26k%3D6%26m%3D1018999828%26s%3D170x170%26h%3Dq4b27rdUaNXiztxGF8LyKN2Ktx4Eb8nSKe7m2UpBpfE%3D&f=1&nofb=1"
            alt=""
          />
          <h1>User</h1>
        </header>

        <hr />

        <div>Your Palettes</div>

        <br />

        <PaletteList />
      </div>
    );
  }
}

export default UserPage;
