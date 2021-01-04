import React from 'react';
import PropTypes from 'prop-types';
import './Tasks-clear.css';

const TasksClear = ( {clearFn, label} ) => {
  return <button className="clear-completed" onClick={clearFn}>{label}</button>
}

TasksClear.defaultProps = {
  label: 'Clear completed'
}

TasksClear.propTypes = {
  clearFn: PropTypes.func.isRequired,
  label: PropTypes.string
}

export default TasksClear;