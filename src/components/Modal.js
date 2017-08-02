import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./Modal.css";

// TODO: Animate this

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
    {props.show &&
      <div className="ModalContainer">
        <div className="Modal">
          <h2 className="ModalHeader">
            {props.title}
          </h2>
          {props.content}
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
