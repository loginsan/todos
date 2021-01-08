import React from 'react';
import PropTypes from 'prop-types';
import Task from '../Task';
import './Task-list.css';

const TaskList = ({ items, handlers }) => {
  const todoListItems = items.map(({ id, ...todo }) => <Task key={id} id={id} {...todo} handlers={handlers} />);

  return <ul className="todo-list">{todoListItems}</ul>;
};

TaskList.defaultProps = {
  items: [],
};

TaskList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  handlers: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default TaskList;
