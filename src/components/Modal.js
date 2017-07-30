import React from "react";
import PropTypes from "prop-types";

import "./Modal.css";

const Modal = props =>
  <div>
    {props.show &&
      <div className="ModalContainer">
        <div className="Modal">
          <h2 className="ModalHeader">
            {props.title}
          </h2>
          {props.children}
          <button className="ModalButton" onClick={props.toggle}>
            Done
          </button>
        </div>
        <div className="ModalBackground" onClick={props.toggle} />
      </div>}
  </div>;

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func,
  title: PropTypes.string
};

export default Modal;
