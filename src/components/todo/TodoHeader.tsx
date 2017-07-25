import * as React from 'react';

import { NewTodo } from './NewTodo';

export interface TodoHeaderProps {
  handleOnEnter: (todo: string) => void;
}

export const TodoHeader: React.StatelessComponent<TodoHeaderProps> = ({ handleOnEnter }) => {
  return (
    <header>
      <h1>todos</h1>
      <NewTodo handleOnEnter={handleOnEnter} />
    </header>
  );
}