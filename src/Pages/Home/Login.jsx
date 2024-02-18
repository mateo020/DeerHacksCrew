import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

const handleLogin = () => {
  // Check if the user has entered both fields correctly
  if ('' === email) {
    setEmailError('Please enter your email')
    return
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    setEmailError('Please enter a valid email')
    return
  }

  if ('' === password) {
    setPasswordError('Please enter a password')
    return
  }

  if (password.length < 7) {
    setPasswordError('The password must be 8 characters or longer')
    return
  }
  
    navigate('/home');
  };

const navigate = useNavigate();

return (
  <div className={'main--container'}>
    <div className={'title--container'}>
      <div>Login</div>
    </div>
    <br/>
    <div>Not registered yet? Sign up</div>
    <br/>
    <div className={'input--container'}>
      <input
        value={email}
        placeholder="Email"
        onChange={(ev) => setEmail(ev.target.value)}
        className={'input--box'}
      />
      <label className="error--label">{emailError}</label>
    </div>
    <br />
    <div className={'input--container'}>
      <input
        value={password}
        placeholder="Password"
        onChange={(ev) => setPassword(ev.target.value)}
        className={'input--box'}
      />
      <label className="error--label">{passwordError}</label>
    </div>
    <br />
    <div className={'input--container'}>
      <button className="btn btn-primary" onClick={handleLogin}>Log in</button>
    </div>

    <div className='logo--container'>
      <img src="./img/logo.svg" alt="Logoipsum"></img>
    </div>
  </div>
)
}

export default Login