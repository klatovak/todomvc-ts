import * as React from 'react';

import { ToggleCheckboxes } from '../global/ToggleCheckboxes';
import { TodoList } from './TodoList';
import { TodoType } from './TodoItem';

export interface TodoMainProps {
  toggleAll: boolean;
  todoItems: TodoType[];
  editId: number;
  handleOnToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnCheck: (todoId: number, checked: boolean) => void;
  handleOnDoubleClick: (todoId: number) => void;
  handleOnUpdate: (todoId: number, todo: string) => void;
  handleOnCancel: () => void;
  handleOnRemove: (todoId: number) => void;
}

export const TodoMain: React.StatelessComponent<TodoMainProps> = ({ 
    toggleAll, 
    todoItems, 
    editId, 
    handleOnToggle, 
    handleOnCheck, 
    handleOnDoubleClick, 
    handleOnUpdate,
    handleOnCancel,
    handleOnRemove 
  }) => {
  
    return (
    <section className="main">
      <ToggleCheckboxes toggleAll={toggleAll} handleOnToggle={handleOnToggle} /> 
      <TodoList 
        todoItems={todoItems} 
        editId={editId} 
        handleOnCheck={handleOnCheck} 
        handleOnDoubleClick={handleOnDoubleClick} 
        handleOnUpdate={handleOnUpdate}
        handleOnCancel={handleOnCancel}
        handleOnRemove={handleOnRemove} 
      />
    </section>
  );
}