import React from 'react';

export default React.createContext({
  signedInAs: {},
  users: [],
  palettes: [],
  handleSignInUser: () => {},
  handleSignOutUser: () => {},
  handleAddNewUser: () => {},
  handleChangeUserProfilePic: () => {},
  handleUploadPalette: () => {},
  handleDeletePalette: () => {},
  handleDeleteUser: () => {},
  handleShowMenu: () => {},
  handleShowSignIn: () => {},
});
