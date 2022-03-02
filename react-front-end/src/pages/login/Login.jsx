import React, { useRef, useContext } from 'react';
import './login.css'
import {loginCall} from '../../apiCalls'
import { CircularProgress } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';


const Login = () => {
    const email = useRef();
    const password = useRef();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);



    const handleClick = (e) => {
        e.preventDefault()   
        loginCall({email:email.current.value, password:password.current.value}, dispatch);
    };

    console.log(user);
    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">FreedomNET</h3>
                    <span className="loginDesc">Connect! Post! #SHARE</span>
                </div>
                <div className="loginRight" onSubmit={handleClick}>
                    <form className="loginBox">
                        <input type="email" required className="loginInput" placeholder='Email' ref={email} />
                        <input 
                            type="password" 
                            required 
                            minLength='6'
                            className="loginInput" 
                            placeholder='Password' 
                            ref={password} 
                        />
                        <button className="loginButton" type='submit' disabled={isFetching}>{ isFetching ? <CircularProgress color='white' size='20px' /> : 'Log In' }</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton">
                        { isFetching ? <CircularProgress color='white' size='20px' /> : 'Create a New Account' }
                            </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
