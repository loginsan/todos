import React, { Component } from 'react';
import Header from '../Header';
import Main from '../Main';
import enums from '../../constant';

export default class App extends Component {
  constructor() {
    super();
    const loadState = localStorage.getItem('todoState');
    this.state = {
      todoData: loadState === null ? [] : JSON.parse(loadState).todoData,
    };
  }

  onToggleDone = (id) => {
    this.setState( ({ todoData }) => this.toggleProp(todoData, id, 'isDone') );
  };

  onEdit = (id) => {
    this.setState( ({ todoData }) => this.toggleProp(todoData, id, 'isEdit') );
  };

  onEditKeyUp = (id, event) => {
    event.preventDefault();
    this.onEdit(id, event);
  };

  onChangeText = (id, event) => {
    this.setState( ({ todoData }) => ({
      todoData: todoData.map( (todo) => (todo.id === id ? { ...todo, description: event.target.value } : todo) ),
    }) );
  };

  onDelete = (id) => {
    this.setState( ({ todoData }) => ({
      todoData: todoData.filter(el => el.id !== id),
    }) );
  };

  onClearDone = () => {
    this.setState( ({ todoData }) => ({
      todoData: todoData.filter(el => el.isDone === false),
    }) );
  };

  onFilterList = (event, filter = enums.ALL) => {
    document.querySelector('.filters .selected').classList.remove('selected');
    event.target.classList.add('selected');
    this.setState( ({ todoData }) => ({
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
    const { parentNode } = ev.target;
    const todoParams = parentNode.querySelectorAll('input');
    const title = todoParams[0].value;
    if (ev.key === 'Enter' && title !== '') {
      const MM = todoParams[1].value;
      const SS = todoParams[2].value;
      const time = (MM ? parseInt(MM, 10) : 5) * 60 + (SS ? parseInt(SS, 10) : 0);
      console.log(MM, SS, time);
      this.clearInputs(todoParams);
      this.setState( ({ todoData }) => ({
          todoData: [...todoData, this.createTodoObj(title, time)],
      }) );
    }
  };

  handleNewTaskSubmit = (event) => {
    event.preventDefault();
  };

  setId() {
    return `key${Date.now() - Math.ceil(1000 * Math.random())}`;
  }

  clearInputs = (nodes) => {
    const inputs = nodes;
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
  };

  toggleProp = (propArr, id, name) => ({
    todoData: propArr.map(el => (el.id === id ? { ...el, [name]: !el[name] } : el)),
  });

  saveState = () => {
    localStorage.setItem('todoState', JSON.stringify(this.state));
  };

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

  createTodoObj(text, time) {
    return {
      id: this.setId(),
      isDone: false,
      isEdit: false,
      isHidden: false,
      description: text,
      created: Date.now(),
      timeLeft: time,
    };
  }

  render() {
    const { todoData } = this.state;
    this.saveState();
    return (
      <section className="todoapp">
        <Header addTodo={this.onAddTodo} handleNewTaskSubmit={this.handleNewTaskSubmit} />
        <Main items={todoData} listHandlers={this.listHandlers()} footerHandlers={this.footerHandlers()} />
      </section>
    );
  }
}
