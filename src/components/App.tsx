import * as React from 'react';
import { match } from 'react-router-dom';

import { TodoHeader } from './header/TodoHeader';
import { TodoMain } from './main/TodoMain';
import { TodoType } from './main/TodoItem';
import { TodoFooter} from './footer/TodoFooter';

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

    const active = this.todoItems.filter(todoItem => !todoItem.completed)

    this.state = {
      currentId: this.currentId,
      editId: 0,
      toggleAll: active.length === 0 ? true : false,
      todoItems: this.getFilteredItems(),
    };
  }

  componentWillReceiveProps(nextProps: AppProps) {
    const filter = this.getFilter(nextProps);

    this.setState({
      todoItems: this.getFilteredItems(filter),
    });
  }

  getFilteredItems(filter?: string): TodoType[] {
    const todoItems = this.todoItems;
    if (typeof filter === 'undefined') {
      filter = this.getFilter(this.props);
    }

    if (filter === 'active') {
      return todoItems.filter(todoItem => todoItem.completed === false);
    } else if (filter ===  'completed') {
      return todoItems.filter(todoItem => todoItem.completed === true);
    } else {
      return todoItems;
    }
  }

  getFilter(props: AppProps) {
    return typeof props.match !== 'undefined' && typeof props.match.params.filter !== 'undefined' 
      ? props.match.params.filter 
      : 'all';
  }

  handleOnToggle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = e.currentTarget.checked;
    
    this.todoItems = this.getFilteredItems('all')
      .map(todoItem => {
        todoItem.completed = checked;
        return todoItem;
      });

    this.setState({
      toggleAll: checked,
      todoItems: this.getFilteredItems(),
    });
  }

  handleOnCheck = (todoItemId: number, checked: boolean): void => {
    const todoItems = this.todoItems;
    
    const index = todoItems.findIndex(todoItem => todoItem.id === todoItemId);
    todoItems[index].completed = checked;
    
    this.todoItems = todoItems;

    const active = todoItems.filter(todoItem => !todoItem.completed);

    this.setState({
      toggleAll: active.length === 0 ? true : false,
      todoItems: this.getFilteredItems(),
    });
  }

  handleOnDoubleClick = (editId: number): void => {
    this.setState({
      editId,
    });
  }

  handleOnUpdate = (todoId: number, todo: string): void => {
    const todoItems = this.todoItems;
      
    const index = todoItems.findIndex(todoItem => todoItem.id === todoId);
    todoItems[index].title = todo;

    this.todoItems = todoItems;

    this.setState({
      editId: 0,
      todoItems: this.getFilteredItems(), 
    });
  }

  handleOnCancel = (): void => {
    this.setState({
      editId: 0,
    });
  }

  handleOnRemove = (todoId: number): void => {
    const todoItems = this.todoItems;
      
    const index = todoItems.findIndex(todoItem => todoItem.id === todoId);
    todoItems.splice(index, 1);

    this.todoItems = todoItems;
  
    this.setState({
      editId: 0,
      todoItems: this.getFilteredItems(), 
    });
  }

  handleOnEnter = (todo: string): void => {
    if (todo !== '') {
      // Get from local storage since we this.state may have filtered todos.
      const todoItems = this.todoItems;
      const nextId = this.currentId += 1;

      todoItems.push({
        id: nextId,
        title: todo,
        completed: false,
      });

      this.todoItems = todoItems;

      this.setState({
        currentId: nextId,
        todoItems: this.getFilteredItems(), 
      });
    }
  }

  handleOnClear = (): void => {
    const todoItems = this.todoItems
      .filter(todoItem => !todoItem.completed);

    this.todoItems = todoItems;

    this.setState({
      toggleAll: false,
      todoItems: this.getFilteredItems(),
    });
  }
  
  render() {
    const todoCount = this.todoItems.length;
    const filter = this.getFilter(this.props);
    
    let main = null;
    let footer = null;
    
    if (todoCount) {
      main = (
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
      );
      footer = (
        <TodoFooter 
          count={todoCount} 
          active={filter}
          handleOnClear={this.handleOnClear} 
        />
      );
    }
    
    return (
      <div className="todo">
        <TodoHeader handleOnEnter={this.handleOnEnter} />
        {main}
        {footer}
      </div>
    );
  }

  // Getters and setters. May be overkill but wanted to practice this a bit.
  get currentId() {
    const currentId = localStorage.getItem('currentId');
    return currentId === null ? 0 : +currentId;
  }

  set currentId(currentId) {
    localStorage.setItem('currentId', '' + currentId);
  }

  get todoItems() {
    const todoItems = localStorage.getItem('todoItems');
    return (todoItems !== null ? JSON.parse(todoItems) : []) as TodoType[];
  }

  set todoItems(todoItems) {
    if(todoItems !== null) {
      localStorage.setItem('todoItems', JSON.stringify(todoItems));
    }
  }
}