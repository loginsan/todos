import React from 'react';
import PropTypes from 'prop-types';
import './Task-edit-field.css';

const TaskEditField = ({ tid, value, onChange, onSubmit }) => (
  <form className="edit-form" onSubmit={(event) => onSubmit(tid, event)}>
    <label>
      <input type="text" className="edit" tabIndex="0" value={value} onChange={(event) => onChange(tid, event)} />
    </label>
  </form>
);

TaskEditField.defaultProps = {
  value: 'Task description',
};

TaskEditField.propTypes = {
  tid: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default TaskEditField;
