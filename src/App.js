import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/content/login";
import Components from "./components";
import "./App.scss";

function App() {
  const active = useSelector((state) => state.darkActive.active);
  const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);

  const Protected = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/");
      }
    }, [ isLoggedIn,navigate]);

    return children;
  };

  console.log("app logged", isLoggedIn);

  return (
    <div className={`App ${active ? 'app-active' : 'App'}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protected>
                <Components />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
