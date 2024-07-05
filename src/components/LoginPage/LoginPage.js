import React from 'react';
import { useState } from 'react';
import './LoginPage.scss';

const LoginPage = ({setUserData}) => {
  const [ isLoginError, setLoginError ] = useState(false);
  const [ isRegistrationError, setRegistrationError ] = useState(false);
  const [ name, setName ] = useState('');
  const [ registrationUsername, setRegUsername ] = useState('');
  const [ registrationPassword, setRegPassword ] = useState('');
  const [ loginUsername, setUsername ] = useState('');
  const [ loginPassword, setPassword ] = useState('');
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8008/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok || !data.user ) {
        setLoginError(true);
      } else {
        console.log(response);
        setLoginError(false);
        window.localStorage.setItem('userData', JSON.stringify(data));
        setUserData(data);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError(true);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8008/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username: registrationUsername, password: registrationPassword })
      });
      
      if (!response.ok) {
        console.error('Error registering user:', response);
        setRegistrationError(true);
      } else {
        console.log(response);
        setRegistrationError(false);
        const data = await response.json();
        setUserData(data);
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setRegistrationError(true);
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={loginUsername} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setPassword(e.target.value)} />
          {isLoginError && <div className="error-banner">Login unsuccessful. Please try again.</div>}
          <button type="submit" >Login</button>
        </form>
      </div>
      <div className="register-form">
        <h1>Register</h1>
        <form className="register-form" onSubmit={handleRegistration}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Username" value={registrationUsername} onChange={(e) => setRegUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={registrationPassword} onChange={(e) => setRegPassword(e.target.value)} />
          {isRegistrationError && <div className="error-banner">Registration unsuccessful. Please try again.</div>}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;