import React from 'react';
import ReactDOM from 'react-dom';
import SignInOverlay from './SignInOverlay';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignInOverlay />, div);
  ReactDOM.unmountComponentAtNode(div);
});
