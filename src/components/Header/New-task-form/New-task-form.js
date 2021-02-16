import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './New-task-form.css';

const NewTaskForm = ({ label, addTodo }) => {
  const textRef = React.createRef();
  const minRef = React.createRef();
  const secRef = React.createRef();
  const handleKeyUp = (event) => addTodo(event, [textRef, minRef, secRef]);
  const handleSubmit = (event) => { event.preventDefault() };

  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!focused) {
      textRef.current.focus();
      setFocused(true);
    }
  }, [textRef, focused]);

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input ref={textRef} className="new-todo" placeholder={label} onKeyUp={handleKeyUp} />
      <input ref={minRef} className="new-todo-form__timer" placeholder="Min" onKeyUp={handleKeyUp} />
      <input ref={secRef} className="new-todo-form__timer" placeholder="Sec" onKeyUp={handleKeyUp} />
    </form>
  );
};

NewTaskForm.defaultProps = {
  label: 'What to do?',
};

NewTaskForm.propTypes = {
  label: PropTypes.string,
  addTodo: PropTypes.func.isRequired,
};

export default NewTaskForm;
