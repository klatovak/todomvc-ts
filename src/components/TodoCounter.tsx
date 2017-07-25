import * as React from 'react';

export interface TodoCounterProps {
  count: number;
}

export const TodoCounter: React.StatelessComponent<TodoCounterProps> = ({ count }) => {
  const text: string = count !== 1 ? 'Items' : 'Item';
  
  return (
    <span className="todo-count"><strong>{count}</strong> {text} left</span>
  );
};