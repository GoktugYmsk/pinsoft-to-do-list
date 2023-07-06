import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './index.scss'

import Form from 'react-bootstrap/Form';

function Login() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [active, setActive] = useState()

    const navigate = useNavigate();

    const switchClickActive = () => {
setActive(!active)
    }


    const userChange = (e) => {
        setUser(e.target.value);
    };

    const passwordChange = (e) => {
        setPassword(e.target.value);
    };

    const userClick = () => {
        if (user === "Pinsoft" && password === "1234") {
            navigate("/mainpage");
        } else {
            setErrorMessage("Kullanıcı adı veya şifre yanlış!");
        }
    };

    return (
        <div className={`login__container ${active ? 'login__container-ligth' : 'login__container'}`} >
            <Form.Check
                type="switch"
                id="custom-switch"
                onClick={switchClickActive}
            />
            <div className="input__group" >
                <input onChange={userChange} type="text" />
                <input type="password" onChange={passwordChange} />
                <button onClick={userClick}>
                    <p>Submit</p>
                </button>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Login;
