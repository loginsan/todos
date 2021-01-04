import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Task-list.css';
import Task from '../Task';


export default class TaskList extends Component {

  static defaultProps = {
    items: []
  }

  render() {
    const {items, handlers} = this.props;
    const todoListItems = items.map( ({id, isDone, isEdit, isHidden, description, created}) => (
      <Task key={id} id={id} isDone={isDone} isEdit={isEdit} isHidden={isHidden}
        description={description} created={created} handlers={handlers}
      />
    ));
    return (
      <ul className="todo-list">
      { todoListItems }
      </ul>
    )
  }

}

TaskList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  handlers: PropTypes.object.isRequired
}
