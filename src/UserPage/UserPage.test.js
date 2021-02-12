import React from 'react';
import ReactDOM from 'react-dom';
import UserPage from './UserPage';
import { createMemoryHistory } from 'history';

import Context from '../Context';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const history = createMemoryHistory();
  history.push('/');

  ReactDOM.render(
    <Context.Provider
      value={{
        signedInAs: { user: { id: 4 } },
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
      <UserPage match={{ params: 4 }} history={history} />
    </Context.Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
