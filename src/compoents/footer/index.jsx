import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPopupModal } from "../configure";
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import "./index.scss";

function Footer() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const active = useSelector((state) => state.darkActive.active);
  const popupModel = useSelector((state) => state.modal.popupModal);

  const handleAddTask = () => {
    dispatch(setPopupModal(true));
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={`row  ${active ? 'row-active' : 'row'}`}>
      <div className="col-md-12">
        <div
          className={`footer-container ${popupModel ? "footer-container__opacity" : ""
            }`}
        >
          <button onClick={handleAddTask}>Add Task</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
