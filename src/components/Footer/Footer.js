import React from 'react';
import PropTypes from 'prop-types';
import TasksCount from '../Tasks-count';
import TasksFilter from '../Tasks-filter';
import TasksClear from '../Tasks-clear';
import './Footer.css';

const Footer = ({items, handlers}) => {
  const todoLeft = items.reduce((acc, todo) => todo.isDone? acc : acc + 1, 0);
  return (
    <footer className="footer">
      <TasksCount count={todoLeft} />
      <TasksFilter filterFn={handlers.filter} />
      <TasksClear clearFn={handlers.clear} />
    </footer>
  )
}

Footer.defaultProps = {
  items: []
}

Footer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  handlers: PropTypes.object.isRequired
}

export default Footer;