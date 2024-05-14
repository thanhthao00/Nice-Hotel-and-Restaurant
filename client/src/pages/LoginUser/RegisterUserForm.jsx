import React, { useState } from 'react'
import validation from '../login/LoginValidation';
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';


const RegisterUserForm = (props) => {
    const history = useNavigate()
    const [signupForm, setSignupForm] = useState({
        email: '',
        password: '',
        full_name: '',
        phone_number: '',
        address: '',
        birthday: '',
        user_id: ''
    });

    const [error, setError] = useState({})

    const { email, password, full_name, phone_number, address, birthday, user_id } = signupForm

    const onChangeSignupForm = event => setSignupForm(prev => ({ ...prev, [event.target.name]: event.target.value }))

    async function submit(e) {
        e.preventDefault();

        try {
            const res = await axios.post("https://nice-handr-server1.onrender.com/api/auth/register_guest", {
                email, password, full_name, phone_number, address, birthday, user_id
            });
            console.log(res.data)
            if (res.data.message === 'User created successfully') {
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
        <div className='auth-form-register'>
            <div className='wrapper'>
                <div className='form-box'>
                    <h2>Register</h2>
                    <form className='Register_form' onSubmit={submit} action='POST'>
                        <div className="input-box">
                            <input value={email} type='email' placeholder='Email' id='email' name='email' onChange={onChangeSignupForm} />
                            {error.email && <span>{error.email}</span>}
                        </div>
                        <div className="input-box">
                            <input value={password} type='password' placeholder='Password' id='password' name='password' onChange={onChangeSignupForm} />
                            {error.password && <span>{error.password}</span>}
                        </div>
                        <div className="input-box">
                            <input value={full_name} type='' placeholder='Your Name' id='full_name' name='full_name' onChange={onChangeSignupForm} />
                        </div>
                        <div className="input-box">
                            <input value={phone_number} type='' placeholder='Phone Number' id='phone_number' name='phone_number' onChange={onChangeSignupForm} />
                        </div>
                        <div className="input-box">
                            <input value={address} type='' placeholder='Address' id='address' name='address' onChange={onChangeSignupForm} />
                        </div>
                        <div className="input-box">
                            <input value={birthday} type='date' placeholder='Date of birth' id='birthday' name='birthday' onChange={onChangeSignupForm} />
                        </div>
                        <div className="input-box">
                            <input value={user_id} type='' placeholder='Your ID' id='user_id' name='user_id' onChange={onChangeSignupForm} />
                        </div>
                        <button type='submit' className='login-btn'>Register</button>
                    </form>
                    <div className='login-register'>
                        <p>
                            Already have an account?
                            <a onClick={() => props.onFormSwitch('login')}>Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default RegisterUserForm;