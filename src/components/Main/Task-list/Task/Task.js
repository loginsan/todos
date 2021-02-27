import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import TaskEditField from './Task-edit-field';
import Button from './Button';
import './Task.css';
import enums from '../../../../constant';


const digits = (tp) => (tp > 9 ? `${tp}` : `0${tp}`);

const splitTime = (time) => `${digits(Math.floor(time / 60))}:${digits(time % 60)}`;

const setClassName = (isDone, isEdit, isHidden) => {
  let classNames = '';
  if (isDone) classNames = enums.DONE_CN;
  if (isEdit) classNames = enums.EDIT_CN;
  if (isHidden) classNames += ` ${enums.HIDDEN_CN}`;
  return classNames;
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
}


const Task = ({ id, isDone, isEdit, isHidden, description, created, handlers, timeLimit, timeLeft, isPaused }) => {

  useInterval(() => {
    handlers.tick(id)
  }, 1000);

  const tMmSs = splitTime(timeLeft);
  const todoPaused = isPaused? 'приостановлена' : 'выполняется';
  const todoState = `Задача ${isDone ? 'выполнена' : todoPaused}.`;
  const inverseTime = `${todoState} Потрачено ${timeLimit - timeLeft} секунд`;

  const classNames = setClassName(isDone, isEdit, isHidden);
  const editField = isEdit && (
    <TaskEditField tid={id} value={description} onChange={handlers.change} onSubmit={handlers.submit} />
  );
  const checkedToggle = isDone ? 'checked' : '';

  return (
    <li className={classNames}>
      <div className="view">
        <input
          className="toggle"
          id={`check${id}`}
          type="checkbox"
          onChange={() => handlers.check(id)}
          tabIndex="0"
          checked={checkedToggle}
        />
        <label htmlFor={`check${id}`}>
          <span className="title" onDoubleClick={() => handlers.check(id)}>
            {description}
            <br />
            <span className="created">{formatDistanceToNow(created, { addSuffix: true, locale: ruLocale })}</span>
          </span>

          <span className="description">
            <Button label="play" handleClick={() => handlers.play(id)} />
            <Button label="pause" handleClick={() => handlers.pause(id)} />
            <b title={inverseTime}> {tMmSs}</b>
          </span>
        </label>

        <Button label="edit" handleClick={() => handlers.edit(id)} />
        <Button label="destroy" handleClick={() => handlers.delete(id)} />
      </div>
      {editField}
    </li>
  );
}

Task.defaultProps = {
  id: `key${Date.now()}`,
  isDone: false,
  isEdit: false,
  isHidden: false,
  description: 'Just do it',
  created: Date.now(),
  timeLimit: 300,
  timeLeft: 300,
  isPaused: true,
};

Task.propTypes = {
  id: PropTypes.string,
  isDone: PropTypes.bool,
  isEdit: PropTypes.bool,
  isHidden: PropTypes.bool,
  description: PropTypes.string,
  created: PropTypes.number,
  timeLimit: PropTypes.number,
  timeLeft: PropTypes.number,
  isPaused: PropTypes.bool,
  handlers: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Task;
