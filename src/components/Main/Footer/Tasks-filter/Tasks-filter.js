import React from 'react';
import PropTypes from 'prop-types';
import './Tasks-filter.css';
import enums from '../../../../constant';

const TasksFilter = ({ filterFn }) => (
  <ul className="filters">
    <li>
      <button type="button" className="selected" onClick={filterFn}>
        {enums.ALL}
      </button>
    </li>
    <li>
      <button type="button" onClick={(event) => filterFn(event, enums.ACTIVE_CN)}>
        {enums.ACTIVE}
      </button>
    </li>
    <li>
      <button type="button" onClick={(event) => filterFn(event, enums.DONE_CN)}>
        {enums.DONE}
      </button>
    </li>
  </ul>
);

TasksFilter.defaultProps = {};

TasksFilter.propTypes = {
  filterFn: PropTypes.func.isRequired,
};

export default TasksFilter;
