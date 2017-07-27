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
  
  componentDidUpdate() {
    if(this.props.todoItem.id === this.props.editId) {
      this.todoInput.focus();
    }
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const className = e.currentTarget.className;
    
    if (className === 'toggle') {
      this.props.handleOnCheck(this.props.todoItem.id, e.currentTarget.checked);
    } else if(className === 'edit') {
      this.setState({
        todoInput: e.currentTarget.value,
      });
    }
  };

  handleOnDoubleClick = () => {
    this.props.handleOnDoubleClick(this.props.todoItem.id);
  };

  handleOnClick = () => {
    this.props.handleOnRemove(this.props.todoItem.id);
  };

  handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.update();
    } else if (e.key === 'Escape') {
      this.props.handleOnCancel();

      this.setState({
        todoInput: this.props.todoItem.title,
      })
    }
  }

  handleOnBlur = () => {
    this.update();
  }

  update = () => {
    const updatedTodo = this.state.todoInput.trim();

    if (updatedTodo === '') {
      this.props.handleOnRemove(this.props.todoItem.id);
    } else {
      this.props.handleOnUpdate(this.props.todoItem.id, updatedTodo);
    }
  }

  render() {
    const liClasses = [];
    if (this.props.todoItem.id === this.props.editId) {
      liClasses.push('editing');
    }
    if (this.props.todoItem.completed) {
      liClasses.push('completed');
    }

    return (
      <li className={liClasses.join(' ')}>
        <div className="view">
          <input 
            type="checkbox" 
            className="toggle"
            checked={this.props.todoItem.completed ? true : false} 
            onChange={this.handleOnChange} 
          />
          <label onDoubleClick={this.handleOnDoubleClick}>{this.props.todoItem.title}</label>
          <button 
            className="destroy"
            onClick={this.handleOnClick}
          />
        </div>
        <input 
          className="edit" 
          type="text"
          value={this.state.todoInput}
          onChange={this.handleOnChange}
          onKeyUp={this.handleOnKeyUp}
          onBlur={this.handleOnBlur}
          ref={(input) => { this.todoInput = input as HTMLInputElement; }}
          placeholder="What needs to be done?"
        />
      </li>
    );
  }
}