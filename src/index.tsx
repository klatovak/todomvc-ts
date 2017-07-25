import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Todo } from './components/todo/Todo';

ReactDOM.render(
  <Todo />, 
  document.getElementById('todoapp') as HTMLElement
);

