import React, { useState } from 'react'
import LoginUserForm from './LoginUserForm';
import RegisterUserForm from './RegisterUserForm';
function LogAndSignUser() {
  const [currentForm, setCurrentForm] = useState('login')
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div>
      {
        currentForm === "login" ? <LoginUserForm onFormSwitch={toggleForm} /> : <RegisterUserForm onFormSwitch={toggleForm}/>
      }
    </div>
  )
}

export default LogAndSignUser