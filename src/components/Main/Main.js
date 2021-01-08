import React from 'react';
import PropTypes from 'prop-types';
import TaskList from '../Task-list';
import Footer from '../Footer';

const Main = ({ items, listHandlers, footerHandlers }) => (
  <section className="main">
    <TaskList items={items} handlers={listHandlers} />
    <Footer items={items} handlers={footerHandlers} />
  </section>
);

Main.defaultProps = {
  items: [],
};

Main.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  listHandlers: PropTypes.objectOf(PropTypes.func).isRequired,
  footerHandlers: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default Main;
