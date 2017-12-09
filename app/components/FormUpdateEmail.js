import React from 'react';

export const FormUpdateEmail = props => {
    const email = props.userInfo.email;
    const user_id = props.userInfo._id;
    return (
        <form action='/user/update/email' method='POST'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='text' name='email' defaultValue={email}></input>
            <label htmlFor='password'>Current password</label>
            <input id='password' type='password' name='password'></input>
            <input id='user_id' type='hidden' name='user_id' value={user_id}></input>
            <button type='submit'></button>
        </form>
    );
}
