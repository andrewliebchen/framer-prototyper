import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'reline';

import './LinkIcon.css';

const LinkIcon = (props) => 
  <div 
    className={`LinkIcon ${props.className && props.className}`}>
    <Icon
      name={props.name}
      onClick={props.onClick} 
      strokeWidth={2} />
      
  </div>

LinkIcon.propTypes = {
  name: PropTypes.oneOf([
    'x',
    'plus',
    'minus',
    'chevron',
    'arrow',
    'triangle',
    'square',
    'diamond',
    'burger',
  ]).isRequired,
  up: PropTypes.bool,
  down: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  className: PropTypes.className,
  onClick: PropTypes.func,
};

export default LinkIcon;