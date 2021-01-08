import React, { Component } from 'react';
import Header from '../Header';
import Main from '../Main';
import enums from '../../constant';

export default class App extends Component {
  state = {
    todoData: [
      this.createTodoObj('Completed task', true),
      this.createTodoObj('Editing task', true),
      this.createTodoObj('Active task', true),
      this.createTodoObj('Some test todo', true),
    ],
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => this.toggleProp(todoData, id, 'isDone'));
  };

  onEdit = (id) => {
    this.setState(({ todoData }) => this.toggleProp(todoData, id, 'isEdit'));
  };

  onEditKeyUp = (id, event) => {
    event.preventDefault();
    this.onEdit(id, event);
  };

  onChangeText = (id, event) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((todo) => (todo.id === id ? { ...todo, description: event.target.value } : todo)),
    }));
  };

  onDelete = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => el.id !== id),
    }));
  };

  onClearDone = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => el.isDone === false),
    }));
  };

  onFilterList = (event, filter = enums.ALL) => {
    document.querySelector('.filters .selected').classList.remove('selected');
    event.target.classList.add('selected');
    this.setState(({ todoData }) => ({
      todoData: todoData.map((el) => {
        let flagHidden = false;
        if (filter === enums.ACTIVE_CN) flagHidden = el.isDone;
        if (filter === enums.DONE_CN) flagHidden = !el.isDone;
        return { ...el, isHidden: flagHidden };
      }),
    }));
  };

  onAddTodo = (event) => {
    const ev = event;
    const { value } = ev.target;
    if (ev.key === 'Enter' && value !== '') {
      this.setState(({ todoData }) => {
        ev.target.value = '';
        return {
          todoData: [...todoData, this.createTodoObj(value)],
        };
      });
    }
  };

  setId() {
    return `key${Date.now() - Math.ceil(1000 * Math.random())}`;
  }

  toggleProp = (propArr, id, name) => ({
    todoData: propArr.map((el) => (el.id === id ? { ...el, [name]: !el[name] } : el)),
  });

  listHandlers = () => ({
    delete: this.onDelete,
    check: this.onToggleDone,
    edit: this.onEdit,
    submit: this.onEditKeyUp,
    change: this.onChangeText,
  });

  footerHandlers = () => ({
    filter: this.onFilterList,
    clear: this.onClearDone,
  });

  createTodoObj(text, demo = false) {
    return {
      id: this.setId(),
      isDone: false,
      isEdit: false,
      isHidden: false,
      description: text,
      created: demo ? Date.now() - Math.ceil(1000 * 60 * 7 * Math.random()) : Date.now(),
    }
  };

  render() {
    const { todoData } = this.state;
    return (
      <section className="todoapp">
        <Header addTodo={this.onAddTodo} />
        <Main items={todoData} listHandlers={this.listHandlers()} footerHandlers={this.footerHandlers()} />
      </section>
    );
  }
}
