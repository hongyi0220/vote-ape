import React from 'react';
import { Link } from 'react-router-dom';

export const Form = props => {
    // const style = {
    //     width: '80%'
    // }
    return (
        <div className='form-container'>
            <h2>Sign up for your FREE account</h2>
            <div className='link-signin'>Already have an account?&nbsp;
                <Link className='login' to='/user/login'>Sign In</Link>
            </div>
            <form className='form-signup' action='/user/signup' method='post'>
            <div className='name-box'>
                <div className='firstname-box'>
                    <label htmlFor='firstname'>First name</label>
                    <input id='firstname' type='text' name='firstname'/>
                </div>
                <div className='lastname-box'>
                    <label htmlFor='lastname'>Last name</label>
                    <input id='lastname' type='text' name='lastname'/>
                </div>
            </div>
            <div className='username-box'>
                <label htmlFor='username'>Choose a username</label>
                <input id='username' type='text' name='username'/>
            </div>
            <div className='password-box'>
                <label htmlFor='password'>Choose a password</label>
                <input id='password' type='password' name='password'/>
            </div>
            <div className='email-box'>
                <label htmlFor='email'>Enter your email</label>
                <input id='email' type='email' name='email'/>
            </div>
            <div className='button-box'>
                <button type='submit'>SIGN UP&nbsp;&nbsp;<i class="fa fa-caret-right" aria-hidden="true"></i></button>
            </div>
            </form>
        </div>
    );
}
