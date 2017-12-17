import React from 'react';
import { Link } from 'react-router-dom';

export const FormLogin = props => {
    return (
        <div className='login-container'>
            <h2>Sign into your account</h2>
            <div className='link-signup'>Don't have an account?&nbsp;
                <Link className='signup' to='/user/signup'>Sign Up</Link>
            </div>
            <form className='form-login' action='/user/login' method='post'>
            <div className='username-box'>
                <label htmlFor='username'>Enter your username</label>
                <input id='username' type='text' name='username'/>
            </div>
            <div className='password-box'>
                <label htmlFor='password'>Enter your password</label>
                <input id='password' type='password' name='password'/>
            </div>
            <div className='button-box'>
                <button type='submit'>SIGN IN&nbsp;&nbsp;<i className="fa fa-caret-right" aria-hidden="true"></i></button>
            </div>
            </form>
        </div>
    );
}
