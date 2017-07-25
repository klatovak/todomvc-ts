import * as React from 'react';

import { TodoType, TodoItem } from './TodoItem';

export interface TodoListProps {
  todoItems: TodoType[];
  editId: number;
  handleOnCheck: (todoId: number, checked: boolean) => void;
  handleOnDoubleClick: (todoId: number) => void;
  handleOnUpdate: (todoId: number, todo: string) => void;
  handleOnCancel: () => void;
  handleOnRemove: (todoId: number) => void;
}

export const TodoList: React.StatelessComponent<TodoListProps> = ({ 
    todoItems, 
    editId, 
    handleOnCheck, 
    handleOnDoubleClick, 
    handleOnUpdate,
    handleOnCancel,
    handleOnRemove 
  }) => {
  
    return (
    <ul className="todo-list">
      {
        todoItems.map(todoItem => (
          <TodoItem
            key={todoItem.id}
            todoItem={todoItem}
            editId={editId} 
            handleOnCheck={handleOnCheck} 
            handleOnDoubleClick={handleOnDoubleClick} 
            handleOnUpdate={handleOnUpdate}
            handleOnCancel={handleOnCancel}
            handleOnRemove={handleOnRemove} 
          />
        ))
      }
    </ul>
  );
}