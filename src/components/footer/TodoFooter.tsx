import * as React from 'react';

import { TodoCounter } from './TodoCounter';
import { TodoFilter } from './TodoFilter';
import { TodoClear } from './TodoClear';

export interface TodoFooterProps {
  count: number;
  active: string;
  handleOnClear: () => void;
}

export const TodoFooter: React.StatelessComponent<TodoFooterProps> = ({ count, active, handleOnClear }) => {
  return (
    <footer className="footer">
      <TodoCounter count={count} />
      <TodoFilter active={active} />
      <TodoClear handleOnClear={handleOnClear} />
    </footer>
  );
}