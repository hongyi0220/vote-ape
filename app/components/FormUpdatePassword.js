import React from 'react';

export const FormUpdatePassword = props => {
    const user_id = props.userInfo._id['$oid'];
    return (
        <form action='/user/update/password' method='POST'>
            <Label htmlFor='password'>Current password</Label>
            <input id='password' type='password' name='password'></input>
            <Label htmlFor='new-password'>New password</Label>
            <input id='new_password' type='password' name='new_password'></input>
            <input id='user_id' type='hidden' name='user_id' value={user_id}></input>
            <button type='submit'></button>
        </form>
    );
}
