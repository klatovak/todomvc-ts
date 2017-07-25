import * as React from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { TodoHeader } from './TodoHeader';
import { TodoMain } from './TodoMain';
import { TodoType } from './TodoItem';
import { TodoFooter} from './TodoFooter';

export interface State {
  currentId: number;
  editId: number;
  toggleAll: boolean;
  todoItems: TodoType[];
}

export class Todo extends React.Component<{}, State> {
  constructor() {
    super();

    this.state = {
      currentId: 0,
      editId: 0,
      toggleAll: false,
      todoItems: this.getTodoItems(),
    };
  }

  getTodoItems(): TodoType[] {
    const todoItems = localStorage.getItem('todoItems');
    if (todoItems !== null) {
      return JSON.parse(todoItems);
    } else {
      return [];
    }
  }

  setTodoItems(todoItems: TodoType[]): void {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }

  handleOnToggle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.currentTarget.checked;
    
    const todoItems = this.state.todoItems.map(todoItem => {
      todoItem.completed = checked;
      return todoItem;
    });
    
    this.setState({
      toggleAll: checked,
      todoItems,
    });

    this.setTodoItems(todoItems);
  }

  handleOnCheck = (todoItemId: number, checked: boolean): void => {
    const todoItems = this.state.todoItems.slice();
    
    const index = todoItems.findIndex(todoItem => todoItem.id === todoItemId);
    todoItems[index].completed = checked;

    const completed = todoItems.filter(todoItem => !todoItem.completed);

    this.setState({
      toggleAll: completed.length === 0 ? true : false,
      todoItems,
    });

    this.setTodoItems(todoItems);
  }

  handleOnDoubleClick = (todoId: number): void => {
    this.setState({
      editId: todoId,
    });
  }

  handleOnUpdate = (todoId: number, todo: string): void => {
    const todoItems = this.state.todoItems.slice();
      
    const index = this.state.todoItems.findIndex(todoItem => todoItem.id === todoId);
    todoItems[index].title = todo;

    this.setState({
      editId: 0,
      todoItems, 
    });

    this.setTodoItems(todoItems);
  }

  handleOnCancel = (): void => {
    this.setState({
      editId: 0,
    });
  }

  handleOnRemove = (todoId: number): void => {
    const todoItems = this.state.todoItems.slice();
      
    const index = this.state.todoItems.findIndex(todoItem => todoItem.id === todoId);
    todoItems.splice(index, 1);

    this.setState({
      editId: 0,
      todoItems, 
    });

    this.setTodoItems(todoItems);
  }

  handleOnEnter = (todo: string): void => {
    if (todo !== '') {
      const todoItems = this.state.todoItems.slice();
      const nextId = this.state.currentId + 1;

      todoItems.push({
        id: nextId,
        title: todo,
        completed: false,
      });

      this.setState({
        currentId: nextId,
        todoItems, 
      });

      this.setTodoItems(todoItems);
    }
  }

  handleOnClear = (): void => {
    const todoItems = this.state.todoItems
      .slice()
      .filter(todoItem => !todoItem.completed);

    this.setState({
      toggleAll: false,
      todoItems,
    });

    this.setTodoItems(todoItems);
  }
  
  render() {
    return (
      <div className="todo">
        <TodoHeader handleOnEnter={this.handleOnEnter} />
        <TodoMain 
          toggleAll={this.state.toggleAll} 
          todoItems={this.state.todoItems} 
          editId={this.state.editId}
          handleOnToggle={this.handleOnToggle} 
          handleOnCheck={this.handleOnCheck} 
          handleOnDoubleClick={this.handleOnDoubleClick}
          handleOnUpdate={this.handleOnUpdate}
          handleOnCancel={this.handleOnCancel}
          handleOnRemove={this.handleOnRemove}
        />
        <TodoFooter count={this.state.todoItems.length} handleOnClear={this.handleOnClear} />
      </div>
    );
  }
}