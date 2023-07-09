import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupModal } from "../configure";



import "./index.scss";

function Footer() {
  const dispatch = useDispatch();

  

  const active = useSelector((state) => state.darkActive.active);
  const popupModel = useSelector((state) => state.modal.popupModal);

  const handleAddTask = () => {
    dispatch(setPopupModal(true));
  };


  return (
    <div className={`row  ${active ? 'row-active' : 'row'}`}>
      <div className="col-md-12">
        <div
          className={`footer-container ${popupModel ? "footer-container__opacity" : ""
            }`}
        >
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
    </div>
  );
}

export default Footer;