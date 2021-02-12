import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SignInOverlay from './SignInOverlay';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SignInOverlay />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
