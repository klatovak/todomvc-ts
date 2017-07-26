import * as React from 'react';
import { match } from 'react-router-dom';

import { TodoHeader } from './todo/TodoHeader';
import { TodoMain } from './todo/TodoMain';
import { TodoType } from './todo/TodoItem';
import { TodoFooter} from './todo/TodoFooter';

export interface State {
  currentId: number;
  editId: number;
  toggleAll: boolean;
  todoItems: TodoType[];
}

export interface AppProps {
  match?: match<{filter: string}>;
}

export class App extends React.Component<AppProps, State> {
  constructor(props: AppProps) {
    super(props);

    const filter = typeof props.match !== 'undefined' && typeof props.match.params.filter !== 'undefined' 
      ? props.match.params.filter 
      : 'all';

    this.state = {
      currentId: 0,
      editId: 0,
      toggleAll: false,
      todoItems: this.getTodoItems(filter),
    };
  }

  getTodoItems(filter: string): TodoType[] {
    const todoItemString = localStorage.getItem('todoItems');
    if (todoItemString !== null) {
      const todoItems = JSON.parse(todoItemString) as TodoType[];
      if (filter === 'active') {
        return todoItems.filter(todoItem => todoItem.completed === false);
      } else if (filter ===  'completed') {
        return todoItems.filter(todoItem => todoItem.completed === true);
      } else {
        return todoItems;
      }

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