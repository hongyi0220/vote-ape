import React from 'react';

export const FormUpdateUsername = props => {
    const username = props.userInfo.username;
    const user_id = props.userInfo._id;
    return (
        <form action='/user/update/username' method='POST'>
            <label htmlFor='username'>Username</label>
            <input id='username' type='text' name='username' defaultValue={username}></input>
            <label htmlFor='password'>Username</label>
            <input id='password' type='password' name='password'></input>
            <input id='user_id' type='hidden' name='user_id' value={user_id}></input>
            <button type='submit'></button>
        </form>
    );
}
