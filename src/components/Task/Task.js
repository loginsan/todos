import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TaskEditField from '../Task-edit-field';
import { formatDistanceToNow } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import './Task.css';
import C from '../../constant';

export default class Task extends Component {

  static defaultProps = {
    id: 'key' + Date.now(),
    isDone: false,
    isEdit: false,
    isHidden: false,
    description: 'Just do it',
    created: Date.now()
  }

  setClassName = (isDone, isEdit, isHidden) => {
    let classNames = '';
    if (isDone) classNames = C.DONE_CN;
    if (isEdit) classNames = C.EDIT_CN;
    if (isHidden) classNames += ` ${C.HIDDEN_CN}`;
    return classNames;
  }

  render() {
    const {id, isDone, isEdit, isHidden, description, created, handlers} = this.props;

    let classNames = this.setClassName(isDone, isEdit, isHidden);
    let editField = isEdit && <TaskEditField tid={id} value={description} onChange={handlers.change} onSubmit={handlers.submit} />;
    let checkedToggle = isDone? 'checked' : '';

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={() => handlers.check(id)} tabIndex="1" checked={checkedToggle} />
          <label>
            <span className="description" onDoubleClick={() => handlers.check(id)}>{description}</span>
            <span className="created">{formatDistanceToNow(created, { addSuffix: true, includeSeconds: true, locale: ruLocale })}</span>
          </label>
          <button className="icon icon-edit" onClick={(event) => handlers.edit(id, event)} tabIndex="1"></button>
          <button className="icon icon-destroy" onClick={() => handlers.delete(id)} tabIndex="1"></button>
        </div>
        { editField }
      </li>
    )
  }
}

Task.propTypes = {
  id: PropTypes.string,
  isDone: PropTypes.bool,
  isEdit: PropTypes.bool,
  isHidden: PropTypes.bool,
  description: PropTypes.string,
  created: PropTypes.number,
  handlers: PropTypes.object
}
