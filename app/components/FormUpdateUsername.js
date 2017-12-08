import React from 'react';

export const FormUpdateUsername = props => {
    const username = props.userInfo.username;
    const user_id = props.userInfo._id['$oid'];
    return (
        <form action='/user/update/username' method='POST'>
            <Label htmlFor='username'>Username</Label>
            <input id='username' type='text' name='username' value={username}></input>
            <Label htmlFor='password'>Username</Label>
            <input id='password' type='password' name='password'></input>
            <input id='user_id' type='hidden' name='user_id' value={user_id}></input>
            <button type='submit'></button>
        </form>
    );
}
