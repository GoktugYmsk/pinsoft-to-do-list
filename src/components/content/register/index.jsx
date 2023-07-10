import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth';
import { useSelector } from 'react-redux';
import { setIsLoggedIn } from '../../configure';
import './index.scss'
import { useDispatch } from 'react-redux';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const active = useSelector((state) => state.darkActive.active);

    const sendAuthRequest = (path) => {
        // axios veya ajax ile yapilabilir
        fetch("/" + path, {
            method: "POST",
            headers: {
                "Content type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                localStorage.setItem("tokenKey", result.message); // auth response "Bearer " + jwtToken(Typei string) donecek
                localStorage.setItem("currentUser", result.userId);
                // localStorage.setItem("currentUser", result.userName); userName'i gormek istersek ekstra bir username inputu olusturulabilir
            })
            .catch((error) => console.log(error))
    }

    // useEffect(() => {
    //     const auth = getAuth();
    //     const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             navigate('/home');
    //             dispatch(setIsLoggedIn(true))
    //         } else {
    //             setIsLoading(false);
    //         }
    //     });
    //
    //     return () => {
    //         unsubscribe();
    //     };
    // }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);
            console.log(error.message)
        }
    };

    const handleUserChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`login__container' ${active ? 'login__container-active' : 'login__container'}`}>
            <form onSubmit={handleRegister}>
                <div className='form-group mb-3'>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        className='form-control'
                        value={email}
                        onChange={handleUserChange}
                        required
                    />
                </div>
                <div className='form-group mb-3'>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className='form-control'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                {error && <div>{error}</div>}
                <div className="button-container d-flex justify-content-center">
                    <button type="submit" className='login-button'>Register</button>
                </div>
            </form>
        </div>
    );
};
export default Register;
