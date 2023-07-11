import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { setIsLoggedIn } from "../../configure";
import "./index.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const active = useSelector((state) => state.darkActive.active);


  const handleLogin = async (e) => {
    e.preventDefault();
  
    const auth = getAuth();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("auth", JSON.stringify(auth));
      dispatch(setIsLoggedIn(true));
      
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };
  
  

  const handleUserChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={`login__container ${active ? "login__container-active" : "login__container"}`}>
      <form onSubmit={handleLogin}>
        <div className="form-group mb-3">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" className="form-control" value={email} onChange={handleUserChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <div>{error}</div>}
        <div className="button-container d-flex justify-content-center">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;




