import React, { Component } from "react";
import TodoListTemplate from "./components/TodoListTemplate";
import TodoItemList from "./components/TodoItemList";
import Form from "./components/Form";

class App extends Component {
  id = 3;
  state = {
    input: "",
    todos: [
      {
        id: 0,
        text: "React",
        checked: false
      },
      {
        id: 1,
        text: "HTML",
        checked: true
      },
      {
        id: 2,
        text: "CSS",
        checked: false
      }
    ]
  };

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  handleCreate = () => {
    const { input, todos } = this.state;
    this.setState({
      input: "",
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.handleCreate();
    }
  };

  handleToggle = id => {
    const { todos } = this.state;
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos];
    nextTodos[index] = {
      ...selected,
      // id: selected.id,
      // text: selected.text,
      // checked: selected.checked,
      checked: !selected.checked
    };
    this.setState({
      todos: nextTodos
    });
  };

  handleRemove = id => {
    const { todos } = this.state;
    this.setState({
      todos: todos.filter(todo => todo.id !== id)
    });
  };

  render() {
    const { input, todos } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleRemove,
      handleToggle
    } = this;
    return (
      <div>
        <TodoListTemplate
          form={
            <Form
              value={input}
              onCreate={handleCreate}
              onKeyPress={handleKeyPress}
              onChange={handleChange}
            />
          }
        >
          <TodoItemList
            todos={todos}
            onToggle={handleToggle}
            onRemove={handleRemove}
          />
        </TodoListTemplate>
      </div>
    );
  }
}

export default App;
