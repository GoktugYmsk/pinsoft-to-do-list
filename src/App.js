import React, { useEffect } from "react";
import { useSelector } from 'react-redux';

import Login from './components/content/login'
import Components from "./components";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";

function App() {
  const active = useSelector((state) => state.darkActive.active);

  useEffect(() => {
    if (active) {
      document.body.style.backgroundColor = '#dfe2e7 ';
      document.body.style.transition = '0.3s';
    } else {
      document.body.style.backgroundColor = '#242424';
      document.body.style.transition = '0.3s';
    }

    return () => {
      document.body.style.backgroundColor = null;
      document.body.style.color = null;
    };
  }, [active]);

  return (
    <div className={`App  ${active ? 'app-active ' : 'App'}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Components />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
