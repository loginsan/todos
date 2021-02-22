import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Main from '../Main';
import enums from '../../constant';


const setId = () => `key${Date.now() - Math.ceil(1000 * Math.random())}`;

const createTodoObj = (text, time) => ({
  id: setId(),
  isDone: false,
  isEdit: false,
  isHidden: false,
  description: text,
  created: Date.now(),
  timeLeft: time,
});

const clearInputs = (nodes) => {
  const inputs = nodes;
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].current.value = '';
  }
};

const toggleProp = (props, id, name) => props.map(el => (el.id === id ? { ...el, [name]: !el[name] } : el));

const saveState = (data) => {
  localStorage.setItem('todoState', JSON.stringify(data));
};

const initData = () => {
  const loadState = localStorage.getItem('todoState');
  return loadState !== null? JSON.parse(loadState) : [];
}

const App = () => {
  const [todoData, setTodoData] = useState( initData() );

  useEffect(() => {
    saveState(todoData); 
  }, [todoData]);

  const onToggleDone = (id) => {
    setTodoData( toggleProp(todoData, id, enums.PROP_DONE) );
  };

  const onEdit = (id) => {
    setTodoData( toggleProp(todoData, id, enums.PROP_EDIT) );
  };

  const onEditKeyUp = (id, event) => {
    event.preventDefault();
    onEdit(id, event);
  };

  const onChangeText = (id, event) => {
    setTodoData(
      todoData.map( todo => (todo.id === id ? { ...todo, description: event.target.value } : todo) )
    );
  };

  const onDelete = (id) => {
    setTodoData(
      todoData.filter(el => el.id !== id)
    );
  };

  const onClearDone = () => {
    setTodoData(
      todoData.filter(el => el.isDone === false)
    );
  };

  const onFilterList = (event, filter = enums.ALL) => {
    document.querySelector('.filters .selected').classList.remove('selected');
    event.target.classList.add('selected');
    setTodoData(
      todoData.map(el => {
        let flagHidden = false;
        if (filter === enums.ACTIVE_CN) flagHidden = el.isDone;
        if (filter === enums.DONE_CN) flagHidden = !el.isDone;
        return { ...el, isHidden: flagHidden };
      })
    );
  };

  const onAddTodo = (event, refArray) => {
    const ev = event;
    const title = refArray[0].current.value;
    if (ev.key === 'Enter' && title !== '') {
      const MM = refArray[1].current.value;
      const SS = refArray[2].current.value;
      const time = (MM ? parseInt(MM, 10) : 5) * 60 + (SS ? parseInt(SS, 10) : 0);
      clearInputs(refArray);
      setTodoData(
        [...todoData, createTodoObj(title, time)]
      );
    }
  };

  const listHandlers = () => ({
    delete: onDelete,
    check: onToggleDone,
    edit: onEdit,
    submit: onEditKeyUp,
    change: onChangeText,
  });

  const footerHandlers = () => ({
    filter: onFilterList,
    clear: onClearDone,
  });

  return (
    <section className="todoapp">
      <Header addTodo={onAddTodo} />
      <Main items={todoData} listHandlers={listHandlers()} footerHandlers={footerHandlers()} />
    </section>
  );
}

export default App;
