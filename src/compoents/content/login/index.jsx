import React, { useState } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const userChange = (e) => {
    setUser(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const userClick = () => {
    if (user === "Pinsoft" && password === "1234") {
        navigate("/mainpage");
    }
  };

  return (
    <div>
      <p>selam</p>
      <input onChange={userChange} type="text" />
      <input type="password" onChange={passwordChange} />
      <button onClick={userClick}>Submit</button>
    </div>
  );
}

export default Login;
