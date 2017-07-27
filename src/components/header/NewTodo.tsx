import * as React from 'react';

interface NewTodoProps {
  handleOnEnter: (todo: string) => void;
}

interface State {
  todoInput: string;
}

export class NewTodo extends React.Component<NewTodoProps, State> {
  private todoInput: HTMLInputElement;

  constructor(props: NewTodoProps) {
    super(props);

    this.state = {
      todoInput: '',
    };
  }

  componentDidMount() {
    this.todoInput.focus();
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoInput: e.currentTarget.value,
    });
  }

  handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.setState({
        todoInput: '',
      });
    
      this.props.handleOnEnter(this.state.todoInput.trim());
    }
  }
  
  render() {
    return (
      <input 
        type="text"
        className="new-todo" 
        name="newTodo"
        value={this.state.todoInput}
        onChange={this.handleOnChange}
        onKeyUp={this.handleOnKeyUp}
        ref={(input) => { this.todoInput = input as HTMLInputElement; }}
        placeholder="What needs to be done?" 
      />
    );
  }
}