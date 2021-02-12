import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PalettePage from './PalettePage';

it('renders without crashing', () => {
  window.scrollTo = jest.fn();
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <PalettePage match={{ params: 4 }} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
