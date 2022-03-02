import axios from 'axios';
import React, { useRef } from 'react';
import './register.css'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();   
        if(passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        } 
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post('/auth/register', user);
                navigate('/login');
            } catch (err) {
                console.log(err)
            }
        }
    };

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FreedomNET</h3>
                    <span className="loginDesc">Connect! Post! #SHARE</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input 
                            type="text" 
                            required className="loginInput" 
                            placeholder='Username' 
                            ref={username} 
                        />
                        <input 
                            type="email" 
                            required 
                            className="loginInput"
                            placeholder='Email' 
                            ref={email} 
                        />
                        <input 
                            type="password" 
                            required 
                            className="loginInput" 
                            placeholder='Password' 
                            ref={password} 
                            minLength='6'
                        />
                        <input 
                            type="password" 
                            required className="loginInput" 
                            placeholder='Password Again' 
                            ref={passwordAgain} 
                        />
                        <button className="loginButton" type='submit'>Sign Up</button>
                        <button className="loginRegisterButton">Log In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
