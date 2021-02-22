import React from 'react';
import PropTypes from 'prop-types';

export default function Button ( {label, handleClick} ) {
  return <button aria-label={label} type="button" className={`icon icon-${label}`} onClick={handleClick} tabIndex="0" />;
}

Button.defaultProps = {
  label: 'edit',
};

Button.propTypes = {
  label: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};