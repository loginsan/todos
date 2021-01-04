import React from 'react';
import PropTypes from 'prop-types';
import './Tasks-filter.css';
import C from '../../constant';

const TasksFilter = ({filterFn}) => {
  return (
    <ul className="filters">
      <li>
        <button className="selected" onClick={filterFn}>{C.ALL}</button>
      </li>
      <li>
        <button onClick={(event) => filterFn(event, C.ACTIVE_CN)}>{C.ACTIVE}</button>
      </li>
      <li>
        <button onClick={(event) => filterFn(event, C.DONE_CN)}>{C.DONE}</button>
      </li>
    </ul>
  )
}

TasksFilter.defaultProps = {
  filterFn: () => {}
}

TasksFilter.propTypes = {
  filterFn: PropTypes.func.isRequired
}

export default TasksFilter;