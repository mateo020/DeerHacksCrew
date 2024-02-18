import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleLogin = () => {
    console.log('Login stuff here');
    navigate('/home');
  };

  const navigate = useNavigate();

  return (
    <div className={'main--container'}>
      <div className={'title--container'}>
        <div>Login</div>
      </div>
      <br />
      <div className={'input--container'}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'input--box'}
        />
        <label className="error--label">{emailError}</label>
      </div>
      <br />
      <div className={'input--container'}>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'input--box'}
        />
        <label className="error--label">{passwordError}</label>
      </div>
      <br />
      <div className={'input--container'}>
        <button className="btn btn-primary" onClick={handleLogin}>Log in</button>
      </div>
    </div>
  )
}

export default Login