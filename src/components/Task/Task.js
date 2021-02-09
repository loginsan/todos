import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import TaskEditField from '../Task-edit-field';
import './Task.css';
import enums from '../../constant';

export default class Task extends Component {
  static defaultProps = {
    id: `key${Date.now()}`,
    isDone: false,
    isEdit: false,
    isHidden: false,
    description: 'Just do it',
    created: Date.now(),
    timeLeft: 300,
  };

  constructor(props) {
    super(props);
    this.state = {
      timer: undefined,
      isPaused: true,
      timeLeft: 0,
    };
  }

  componentDidMount() {
    const { timeLeft } = this.props;
    this.setState({
      isPaused: true,
      timer: setInterval(this.updateTimer, 1000),
      timeLeft,
    });
  }

  componentDidUpdate() {
    // ?
  }

  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer);
  }

  handlePause = () => {
    const { isPaused } = this.state;
    if (!isPaused) {
      this.setState({ isPaused: true });
    }
  }

  handlePlay = () => {
    const { isPaused } = this.state;
    if (isPaused) {
      this.setState({ isPaused: false });
    }
  }

  setClassName = (isDone, isEdit, isHidden) => {
    let classNames = '';
    if (isDone) classNames = enums.DONE_CN;
    if (isEdit) classNames = enums.EDIT_CN;
    if (isHidden) classNames += ` ${enums.HIDDEN_CN}`;
    return classNames;
  };

  splitTimeLeft = (timeLeft) => [Math.floor(timeLeft / 60), timeLeft % 60];

  updateTimer = () => {
    const { isPaused, timeLeft } = this.state;
    if (! isPaused ) {
      this.setState({
        timeLeft: timeLeft - 1,
      });
    }
  }

  render() {
    const { id, isDone, isEdit, isHidden, description, created, handlers } = this.props;
    const { timeLeft } = this.state;
    const [mm, ss] = this.splitTimeLeft(timeLeft);

    const classNames = this.setClassName(isDone, isEdit, isHidden);
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
            </span>
            <span className="description">
              <button className="icon icon-play" type="button" onClick={this.handlePlay} aria-label="play" />
              <button className="icon icon-pause" type="button" onClick={this.handlePause} aria-label="pause" />
              {mm}:{ss}
            </span>
            <span className="created">
              {formatDistanceToNow(created, { addSuffix: true, includeSeconds: true, locale: ruLocale })}
            </span>
          </label>

          <button
            aria-label="Edit"
            type="button"
            className="icon icon-edit"
            onClick={() => handlers.edit(id)}
            tabIndex="0"
          />

          <button
            aria-label="Delete"
            type="button"
            className="icon icon-destroy"
            onClick={() => handlers.delete(id)}
            tabIndex="0"
          />
        </div>
        {editField}
      </li>
    );
  }
}

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
