import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Transition from "react-transition-group/Transition";

import "./Modal.css";

const duration = 200;

const defaultStyle = {
  boxShadow: "none",
  pointerEvents: "none",
  transform: "translate3d(-50%, -100%, 0)",
  transition: `${duration}ms ease-out`
};

const transitionStyles = {
  entered: {
    boxShadow: "0 5px 50px rgba(0, 0, 0, 0.3)",
    opacity: 1,
    pointerEvents: "all",
    transform: "translate3d(-50%, -2em, 0)"
  },
  exiting: {
    transition: `100ms ease-in`
  }
};

const Modal = props =>
  <div>
    <div
      className={classNames({
        Underlay: true,
        showModal: props.show
      })}
    >
      {props.children}
    </div>
    <Transition in={props.show} timeout={duration}>
      {state =>
        <div
          className="Modal"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          {props.content}
        </div>}
    </Transition>
    {props.show && <div className="ModalBackground" onClick={props.close} />}
  </div>;

Modal.propTypes = {
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  content: PropTypes.element,
  close: PropTypes.func,
  title: PropTypes.string
};

export default Modal;
