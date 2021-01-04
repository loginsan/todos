import React from 'react';
import PropTypes from 'prop-types';
import './Tasks-count.css';

const TasksCount = ({count}) => {
  return <span className="todo-count">{count} items left</span>
}

TasksCount.defaultProps = {
  count: 0
}

TasksCount.propTypes = {
  count: PropTypes.number
}

export default TasksCount;