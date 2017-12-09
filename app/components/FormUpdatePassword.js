import React from 'react';

export const FormUpdatePassword = props => {
    const user_id = props.userInfo._id;
    return (
        <form action='/user/update/password' method='POST'>
            <label htmlFor='password'>Current password</label>
            <input id='password' type='password' name='password'></input>
            <label htmlFor='new-password'>New password</label>
            <input id='new_password' type='password' name='new_password'></input>
            <input id='user_id' type='hidden' name='user_id' value={user_id}></input>
            <button type='submit'></button>
        </form>
    );
}
