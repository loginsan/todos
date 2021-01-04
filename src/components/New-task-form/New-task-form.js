import React from 'react';
import PropTypes from 'prop-types';
import './New-task-form.css';

const NewTaskForm = ( {label, addTodo, autofocus} ) => {
  return (
    <input className="new-todo" placeholder={label} autoFocus={autofocus} onKeyUp={addTodo} />
  );
}

NewTaskForm.defaultProps = {
  label: 'What to do?',
  autofocus: true
};

NewTaskForm.propTypes = {
  label: PropTypes.string,
  addTodo: PropTypes.func.isRequired,
  autofocus: PropTypes.bool
};

export default NewTaskForm;