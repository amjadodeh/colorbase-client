import React from 'react';

export default React.createContext({
  signedInAs: {},
  users: [],
  palettes: [],
  handleAddNewUser: () => {},
  handleSignInUser: () => {},
  handleSignOutUser: () => {},
  handleChangeUserProfilePic: () => {},
  handleUploadPalette: () => {},
  handleDeletePalette: () => {},
  handleDeleteUser: () => {},
});
