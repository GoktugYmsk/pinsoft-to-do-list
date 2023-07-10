import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/content/login";
import Components from "./components";
import "./App.scss";

function App() {
  const active = useSelector((state) => state.darkActive.active);
  const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);
  const navigate = useNavigate()

  const Protected = ({ isLoggedIn, children }) => {

    useEffect(() => {
      if (!isLoggedIn) {
        navigate("/")
        return
      } 
    }, [])

    return children;
  };



  console.log('app logged', isLoggedIn)

  return (
    <div className={`App  ${active ? 'app-active ' : 'App'}`}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<Protected isLoggedIn={isLoggedIn}>  <Components />
          </Protected>} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}


export default App;
