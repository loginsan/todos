import React from 'react';
import PropTypes from 'prop-types';
import './New-task-form.css';

const NewTaskForm = ({ label, addTodo, handleNewTaskSubmit }) => (
  <form className="new-todo-form" onSubmit={handleNewTaskSubmit}>
    <input className="new-todo" placeholder={label} onKeyUp={addTodo} />
    <input className="new-todo-form__timer" placeholder="Min" onKeyUp={addTodo} />
    <input className="new-todo-form__timer" placeholder="Sec" onKeyUp={addTodo} />
  </form>
);

NewTaskForm.defaultProps = {
  label: 'What to do?',
};

NewTaskForm.propTypes = {
  label: PropTypes.string,
  addTodo: PropTypes.func.isRequired,
  handleNewTaskSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;
