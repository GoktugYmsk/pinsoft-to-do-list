import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useSelector } from 'react-redux';
import './index.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const active = useSelector((state) => state.darkActive.active);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error) {
      setError(error.message);
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
      <form onSubmit={handleLogin}>
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
          <button type="submit" className='login-button'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
