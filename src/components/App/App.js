import React, {Component} from 'react';
import Header from '../Header';
import Main from '../Main';
import C from '../../constant';

export default class App extends Component {

  state = {
    todoData : [
        this.createTodoObj("Completed task", true),
        this.createTodoObj("Editing task", true),
        this.createTodoObj("Active task", true),
        this.createTodoObj("Some test todo", true)
    ]
  }

  setId() {
    return "key" + (Date.now() - Math.ceil(1000 * Math.random()))
  }

  createTodoObj(text, demo = false) {
    return {
      id: this.setId(),
      isDone: false,
      isEdit: false,
      isHidden: false,
      description: text,
      created: demo? Date.now() - Math.ceil(1000 * 60 * 7 * Math.random()) : Date.now()
    }
  }

  toggleProp = (propArr, id, name) => {
    return {
      todoData: propArr.map( el => {
        return (el.id === id)? { ...el, [name]: !el[name] } : el
      })
    }
  }

  onToggleDone = (id) => {
    this.setState( ({todoData}) =>
      this.toggleProp(todoData, id, "isDone")
    )
  }

  onEdit = (id, event) => {
    this.setState( ({todoData}) =>
      this.toggleProp(todoData, id, "isEdit")
    )
  }

  onEditKeyUp = (id, event) => {
    event.preventDefault();
    this.onEdit(id, event);
  }

  changeText = (id, event) => {
    this.setState( ({todoData}) => {
      return {
        todoData: todoData.map( todo => {
          return (todo.id === id)? { ...todo, description: event.target.value} : todo
        })
      }
    })
  }

  onDelete = (id) => {
    this.setState( ({todoData}) => {
      return {
        todoData: todoData.filter( el => el.id !== id )
      }
    });
  }

  clearDone = () => {
    this.setState( ({todoData}) => {
      return {
        todoData: todoData.filter( el => el.isDone === false )
      }
    });
  }

  filterList = (event, filter = C.ALL) => {
    document.querySelector('.filters .selected').classList.remove('selected');
    event.target.classList.add('selected');
    this.setState( ({todoData}) => {
      return {
        todoData: todoData.map( el => {
          let flagHidden = false;
          if (filter === C.ACTIVE_CN) flagHidden = el.isDone;
          if (filter === C.DONE_CN) flagHidden = !el.isDone;
          return { ...el, isHidden: flagHidden };
        })
      }
    })
  }

  addTodo = (event) => {
    const value = event.target.value;
    if (event.key === "Enter" && value !== "") {
      this.setState( ({todoData}) => {
        event.target.value = "";
        return {
          todoData: [ ...todoData, this.createTodoObj(value) ]
        }
      });
    }
  }

  listHandlers = {
    'delete': this.onDelete, 
    'check': this.onToggleDone, 
    'edit': this.onEdit,
    'submit': this.onEditKeyUp,
    'change': this.changeText
  }

  footerHandlers = {
    'filter': this.filterList, 
    'clear': this.clearDone
  }

  render() {
    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <Main items={this.state.todoData} 
          listHandlers={this.listHandlers}
          footerHandlers={this.footerHandlers}
        />
      </section>
    )
  }

}
