import React, { useState, useContext } from 'react'
import validation from '../login/LoginValidation';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'


const LoginUserForm = (props) => {
  const history = useNavigate();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState({})

  const { email, password } = loginForm

  const onChangeLoginForm = event => setLoginForm(prev => ({ ...prev, [event.target.name]: event.target.value }))

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("https://nice-handr-server1.onrender.com/api/auth/login", {
        email, password
      })
      console.log(res.data)
      if (res.data.message === 'User logged in successfully') {
        let token = res.data.accessToken
        localStorage.setItem("Saved Token", 'Bearer ' + token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
        history('/home');
      } else if (res.data.message === 'Incorrect username or password!') {
        alert('Incorrect username or password!');
      }
    } catch (e) {
      alert('Wrong details');
    }

  }



  return (
    <div className='auth-form'>
      <div className='wrapper'>
        <div className='form-box'>
          <h2 id='loginHeader'>Login</h2>
          <form className='form' onSubmit={submit} action='POST'>
            <div className="input-box">
              <input value={email} type='email' placeholder='Email' id='email' name='email' onChange={onChangeLoginForm} />
              {error.email && <span>{error.email}</span>}
            </div>
            <div className="input-box">
              <input value={password} type='password' placeholder='Password' id='password' name='password' onChange={onChangeLoginForm} />
              {/* {error.password && <span>{error.password}</span>} */}
            </div>
            <button type='submit' className='login-btn'>Log in</button>
          </form>
          <div className='login-register'>
            <p>
              Don't have an account?
              <a onClick={() => props.onFormSwitch('signup_user')}>Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default LoginUserForm;