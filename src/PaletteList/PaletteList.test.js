import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PaletteList from './PaletteList';

import Context from '../Context';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Context.Provider
        value={{
          users: [
            {
              id: 4,
              username: 'Username',
              profile_picture:
                'https://example.com/sdgugaghughfaf/sdfh9ahshfnasdf.jpg',
            },
          ],
        }}
      >
        <PaletteList
          palettes={[
            {
              palette_name: 'Palette Name',
              hex: '#000000,#ffffff',
              user_id: 4,
            },
          ]}
          //   users={[
          //     {
          //       id: 4,
          //       username: 'Username',
          //       profile_picture:
          //         'https://example.com/sdgugaghughfaf/sdfh9ahshfnasdf.jpg',
          //     },
          //   ]}
        />
      </Context.Provider>
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
