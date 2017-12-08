import React from 'react';

export const FormUpdateEmail = props => {
    const email = props.userInfo.email;
    const user_id = props.userInfo._id['$oid'];
    return (
        <form action='/user/update/email' method='POST'>
            <Label htmlFor='email'>Email</Label>
            <input id='email' type='text' name='email' value={email}></input>
            <Label htmlFor='password'>Current password</Label>
            <input id='password' type='password' name='password'></input>
            <input id='user_id' type='hidden' name='user_id' value={user_id}></input>
            <button type='submit'></button>
        </form>
    );
}
