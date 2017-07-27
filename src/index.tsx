import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import { App } from './components/App';

ReactDOM.render(
  <HashRouter>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/:filter" component={App} />
    </div>
  </HashRouter>, 
  document.getElementById('todoapp') as HTMLElement
);

