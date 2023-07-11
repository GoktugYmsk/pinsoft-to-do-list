import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/content/login";
import Components from "./components";
import NotFound from "./components/notfound/NotFound";

import "./App.scss";

function App() {
  const active = useSelector((state) => state.darkActive.active);

  const logoutPopup = useSelector((state) => state.logout.logoutPopup);


  useEffect(() => {
    const spanElement = document.getElementById("components-span");
    if(logoutPopup){
      spanElement.style.opacity = "0.2";
    }

    else{
      spanElement.style.opacity = "1";
  
    }
  }, [logoutPopup])


  useEffect(() => {
    if (active) {
      document.body.style.backgroundColor = "#dfe2e7";
      document.body.style.transition = "0.3s";
    } else {
      document.body.style.backgroundColor = "#242424";
      document.body.style.transition = "0.3s";
    }

    return () => {
      document.body.style.backgroundColor = null;
      document.body.style.color = null;
    };
  }, [active]);

  return (
    <div className={`App ${active ? "app-active" : "App"}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Components />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
