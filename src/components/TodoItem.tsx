import * as React from 'react';

export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
}

export interface State {
  todoInput: string;
}

export interface TodoItemProps {
  todoItem: TodoType;
  editId: number;
  handleOnCheck: (todoId: number, checked: boolean) => void;
  handleOnDoubleClick: (todoId: number) => void;
  handleOnUpdate: (todoId: number, todo: string) => void;
  handleOnCancel: () => void;
  handleOnRemove: (todoId: number) => void;
}

export class TodoItem extends React.Component<TodoItemProps, State> {
  private todoInput: HTMLInputElement;

  constructor(props: TodoItemProps) {
    super(props);

    this.state = {
      todoInput: this.props.todoItem.title,
    };
  }
  
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.handleOnCheck(this.props.todoItem.id, e.currentTarget.checked);
  };

  onDoubleClick = () => {
    this.props.handleOnDoubleClick(this.props.todoItem.id);
  };

  onClick = () => {
    this.props.handleOnRemove(this.props.todoItem.id);
  };

  onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.update();
    } else if (e.key === 'Escape') {
      this.props.handleOnCancel();

      this.setState({
        todoInput: this.props.todoItem.title,
      })
    }
  }

  onBlur = () => {
    this.update();
  }

  update = () => {
    const updatedTodo = this.state.todoInput.trim();
    console.log(updatedTodo);
    if (updatedTodo === '') {
      this.props.handleOnRemove(this.props.todoItem.id);
    } else {
      this.props.handleOnUpdate(this.props.todoItem.id, updatedTodo);
    }
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoInput: e.currentTarget.value,
    });
  }

  render() {
    return (
      <li className={this.props.todoItem.id === this.props.editId ? 'editing' : ''}>
        <div className="view">
          <input 
            type="checkbox" 
            className="toggle"
            checked={this.props.todoItem.completed ? true : false} 
            onChange={this.onChange} 
          />
          <label onDoubleClick={this.onDoubleClick}>{this.props.todoItem.title}</label>
          <button 
            className="destroy"
            onClick={this.onClick}
          />
        </div>
        <input 
          className="edit" 
          value={this.state.todoInput}
          onChange={this.handleOnChange}
          onKeyUp={this.onKeyUp}
          onBlur={this.onBlur}
          ref={(input) => { this.todoInput = input as HTMLInputElement; }}
          placeholder="What needs to be done?"
        />
      </li>
    );
  }
}