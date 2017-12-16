import React from 'react';
import { Link } from 'react-router-dom';

export const FormUpdatePassword = props => {
    // const user_id = props.formProps.userData._id;
    const updateUserData = props.formProps.updateUserData;
    const memory = props.formProps.memory;
    return (
        <form className='form-password' action='/user/update/password' method='POST'>
            <div className='password-box'>
                <label htmlFor='password'>Current password</label>
                <input id='password' type='password' name='password' autoComplete='new_password'
                    onChange={updateUserData} value={memory.password || ''}/>
            </div>
            <div className='new-password-box'>
                <label htmlFor='new-password'>New password</label>
                <input id='new_password' type='password' name='new_password'
                    onChange={updateUserData} value={memory.newPassword || ''}/>
            </div>
            <div className='buttons-box'>
                <button type='button'><Link to='/user'>Cancel</Link>&nbsp;</button>
                <button type='submit'>Change password</button>
            </div>
            {/* <input id='user_id' type='hidden' name='user_id' value={user_id}/> */}

        </form>
    );
}
