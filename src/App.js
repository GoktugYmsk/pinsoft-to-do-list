import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/content/login";
import CustomComponent from "./components/CustomComponent";
import NotFound from "./components/notfound/NotFound";

import "./App.scss";



function App() {
  const active = useSelector((state) => state.darkActive.active);

  const isLoggedIn = sessionStorage.getItem("auth")

  const Protected = ({children}) => {

    const navigate = useNavigate();

    useEffect(() => {

      if (sessionStorage.getItem("auth")) {
        navigate("/home");
      }
      else {
        navigate('/')
      }
      
    }, []);
    return isLoggedIn ? children : <Navigate to="/" />;
  };

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

          <Route path="/home" element={<Protected><CustomComponent /></Protected>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
