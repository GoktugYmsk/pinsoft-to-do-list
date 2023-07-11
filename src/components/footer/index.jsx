import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupModal } from "../configure";

import "./index.scss";

function Footer() {
  const dispatch = useDispatch();

  
  const logoutPopup = useSelector((state) => state.logout.logoutPopup);
  const active = useSelector((state) => state.darkActive.active);


  const handleAddTask = () => {
<<<<<<< HEAD
    if(!logoutPopup) 
=======
    if(!logoutPopup) // Logout popup açık durumda task popup açılmıyor.
>>>>>>> 48b14c82ddc54c3d0fb8a668c63cda0cbb8e65a1
    {
      dispatch(setPopupModal(true));
    }
  };


  return (
    <div className={`row  ${active ? 'row-active' : 'row'}`}>
      <div className="col-md-12">
        <div
          className={`footer-container`}
        >
          <button onClick={handleAddTask}>Add Task</button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
