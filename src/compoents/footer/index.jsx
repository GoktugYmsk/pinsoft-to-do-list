import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupModal } from "../configure";


import "./index.scss";

function Footer() {
  const active = useSelector((state) => state.darkActive.active);
  const dispatch = useDispatch();
  const popupModel = useSelector((state) => state.modal.popupModal);

  const handleSubmit = () => {
    dispatch(setPopupModal(true));
  };
  
  return (
    <div className={`row  ${active ? 'row-active' : 'row'}`}>
      <div className="col-md-12">
        <div
          className={`footer-container ${
            popupModel ? "footer-container__opacity" : ""
          }`}
        >
          <div className="footer-container">
            <button onClick={handleSubmit}>Add Task</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
