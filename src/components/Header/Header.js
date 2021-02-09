import React from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../New-task-form';

const Header = ({ label, addTodo, handleNewTaskSubmit, title }) => (
  <header className="header">
    <h1>{title}</h1>
    <NewTaskForm label={label} addTodo={addTodo} handleNewTaskSubmit={handleNewTaskSubmit} />
  </header>
);

Header.defaultProps = {
  title: 'todos',
  label: 'What needs to be done?',
};

Header.propTypes = {
  label: PropTypes.string,
  addTodo: PropTypes.func.isRequired,
  handleNewTaskSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Header;
