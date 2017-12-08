import React from 'react';

export const Form = props => {
    return (
        <form action='/user/signup' method='post'>
        <div>
            <label htmlFor='firstname'>First name</label>
            <input id='firstname' type='text' name='firstname'></input>
        </div>
        <div>
            <label htmlFor='lastname'>Last name</label>
            <input id='lastname' type='text' name='lastname'></input>
        </div>
        <div>
            <label htmlFor='username'>Choose a username</label>
            <input id='username' type='text' name='username'></input>
        </div>
        <div>
            <label htmlFor='password'>Choose a password</label>
            <input id='password' type='password' name='password'></input>
        </div>
        <div>
            <label htmlFor='email'>Enter your email</label>
            <input id='email' type='email' name='email'></input>
        </div>
            <button type='submit'>SIGN UP</button>
        </form>
    );
}
