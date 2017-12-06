import React from 'react';

export const FormLogin = props => {
    return (
        <form action='/user/login' method='post'>
        <div>
            <label htmlFor='username'>Enter your username</label>
            <input id='username' type='text' name='user_username'></input>
        </div>
        <div>
            <label htmlFor='password'>Enter your password</label>
            <input id='password' type='password' name='user_password'></input>
        </div>
            <button type='submit' onClick={props.handleSubmit}>Login</button>
        </form>
    );
}
