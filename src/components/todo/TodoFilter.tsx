import * as React from 'react';
import { HashRouter, Link } from 'react-router-dom';

export const TodoFilter: React.StatelessComponent = () => {
  return (
    <HashRouter>
      <div>
        <ul className="filters">
          <li>
            <Link to="/" replace>All</Link>
          </li>
          <li>
            <Link to="/active" replace>Active</Link>
          </li>
          <li>
            <Link to="/completed" replace>Completed</Link>
          </li>
        </ul>
      </div>
    </HashRouter>
  );
};