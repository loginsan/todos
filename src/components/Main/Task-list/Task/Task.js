import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import TaskEditField from './Task-edit-field';
import Button from './Button';
import './Task.css';
import enums from '../../../../constant';


const printTick = (tp) => (tp > 9 ? `${tp}` : `0${tp}`);

const splitTime = (time) => `${printTick(Math.floor(time / 60))}:${printTick(time % 60)}`;

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


const Task = ({ id, isDone, isEdit, isHidden, description, created, handlers, timeLeft }) => {
  const [paused, setPaused] = useState(true);
  const [time, setTime] = useState(timeLeft);

  useInterval(() => {
    if (!paused && time > 0) {
      setTime(time - 1);
    }
  }, 1000);

  useEffect(() => {
    if (isDone) {
      if (!paused) {
        setPaused(isDone);
      }
    }
  }, [isDone, paused]);

  const handlePause = () => {
    if (!paused && time > 0) {
      setPaused(true);
    }
  }

  const handlePlay = () => {
    if (paused && time > 0 && !isDone) {
      setPaused(false);
    }
  }

  const tMmSs = splitTime(time);
  const inverseTime = `Потрачено ${timeLeft - time} секунд`;

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
            <Button label="play" handleClick={handlePlay} />
            <Button label="pause" handleClick={handlePause} />
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
  timeLeft: 300,
};

Task.propTypes = {
  id: PropTypes.string,
  isDone: PropTypes.bool,
  isEdit: PropTypes.bool,
  isHidden: PropTypes.bool,
  description: PropTypes.string,
  created: PropTypes.number,
  timeLeft: PropTypes.number,
  handlers: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Task;
