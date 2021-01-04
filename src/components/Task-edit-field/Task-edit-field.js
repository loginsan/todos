import React from 'react';
import PropTypes from 'prop-types';
import './Task-edit-field.css';

const TaskEditField = ( {tid, value, onChange, onSubmit} ) => {
  return (
    <form className="edit-form" onSubmit={(event) => onSubmit(tid, event)}>
      <span>
        <input type="text" className="edit"  tabIndex="1"
          onChange={(event) => onChange(tid, event)}
          value={value}
        />
      </span>
    </form>
  )
}

TaskEditField.defaultProps = {
  value: 'Task description'
};

TaskEditField.propTypes = {
  tid: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default TaskEditField;