import * as React from 'react';

import { TodoCounter } from './TodoCounter';
import { TodoFilter } from './TodoFilter';
import { TodoClear } from './TodoClear';

export interface TodoFooterProps {
  count: number;
  handleOnClear: () => void;
}

export const TodoFooter: React.StatelessComponent<TodoFooterProps> = ({ count, handleOnClear }) => {
  return (
    <footer className="footer">
      <TodoCounter count={count} />
      <TodoFilter />
      <TodoClear handleOnClear={handleOnClear} />
    </footer>
  );
}