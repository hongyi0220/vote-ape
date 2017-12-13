import React from 'react';
import { Link } from 'react-router-dom';

export const FormUpdatePassword = props => {
    // const user_id = props.formProps.userData._id;
    const updateUserData = props.formProps.updateUserData;
    const memory = props.formProps.memory;
    return (
        <form action='/user/update/password' method='POST'>
            <label htmlFor='password'>Current password</label>
            <input id='password' type='password' name='password'
                onChange={updateUserData} value={memory.password || ''}>
            </input>
            <label htmlFor='new-password'>New password</label>
            <input id='new_password' type='password' name='new_password'
                onChange={updateUserData} value={memory.newPassword || ''}>
            </input>
            {/* <input id='user_id' type='hidden' name='user_id' value={user_id}></input> */}
            <button type='button'><Link to='/user'>Cancel</Link>&nbsp;</button>
            <button type='submit'>Change password</button>
        </form>
    );
}
