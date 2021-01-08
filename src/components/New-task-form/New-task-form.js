import React from 'react';
import PropTypes from 'prop-types';
import './New-task-form.css';

const NewTaskForm = ({ label, addTodo }) => <input className="new-todo" placeholder={label} onKeyUp={addTodo} />;

NewTaskForm.defaultProps = {
  label: 'What to do?',
};

NewTaskForm.propTypes = {
  label: PropTypes.string,
  addTodo: PropTypes.func.isRequired,
};

export default NewTaskForm;
