import React, { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm';
function Login() {
  const [currentForm, setCurrentForm] = useState('login')
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div>
      {
        currentForm === "login" ? <LoginForm onFormSwitch={toggleForm} /> : <RegisterForm onFormSwitch={toggleForm}/>
      }
    </div>
  )
}

export default Login