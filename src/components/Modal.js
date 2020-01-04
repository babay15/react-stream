import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      className='ui dimmer modals visible active'
      onClick={props.handleParentModalClick}
    >
      <div
        className='ui standard modal visible active'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='header'>{props.renderToModalHeader}</div>
        <div className='content'>{props.renderToModalContent}</div>
        <div className='actions'>{props.renderToModalActions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
