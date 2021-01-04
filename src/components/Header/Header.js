import React from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from '../New-task-form';

const Header = ( {label, addTodo, title} ) => {

  return (
    <header className="header">
      <h1>{title}</h1>
      <NewTaskForm label={label} addTodo={addTodo} />
    </header>
  )

}

Header.defaultProps = {
  title: 'todos',
  label: 'What needs to be done?'
}

Header.propTypes = {
  label: PropTypes.string,
  addTodo: PropTypes.func.isRequired,
  title: PropTypes.string
}

export default Header;