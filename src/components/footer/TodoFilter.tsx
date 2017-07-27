import * as React from 'react';
import { HashRouter, Link } from 'react-router-dom';

export interface TodoFilterProps {
  active: string;
}

export const TodoFilter: React.StatelessComponent<TodoFilterProps> = ({ active }) => {
  return (
    <HashRouter>
      <div>
        <ul className="filters">
          <li>
            <Link className={active === 'all' ? 'selected' : ''} to="/">All</Link>
          </li>
          <li>
            <Link className={active === 'active' ? 'selected' : ''} to="/active">Active</Link>
          </li>
          <li>
            <Link className={active === 'completed' ? 'selected' : ''} to="/completed">Completed</Link>
          </li>
        </ul>
      </div>
    </HashRouter>
  );
};