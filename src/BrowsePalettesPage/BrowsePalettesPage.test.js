import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BrowsePalettesPage from './BrowsePalettesPage';

it('renders without crashing', () => {
  window.scrollTo = jest.fn();
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <BrowsePalettesPage />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
