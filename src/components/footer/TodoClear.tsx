import * as React from 'react';

export interface TodoClearProps {
  handleOnClear: () => void;
}

export const TodoClear: React.StatelessComponent<TodoClearProps> = ({ handleOnClear }) => {
  return (
    <button className="clear-completed" onClick={handleOnClear}>Clear completed</button>
  );
};