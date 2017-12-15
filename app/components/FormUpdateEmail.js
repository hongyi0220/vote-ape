import React from 'react';
import { Link } from 'react-router-dom';

export const FormUpdateEmail = props => {
    const email = props.formProps.userData.email;
    // const user_id = props.formProps.userData._id;
    const updateUserData = props.formProps.updateUserData;
    const memory = props.formProps.memory;
    return (
        <form action='/user/update/email' method='POST'>
            <label htmlFor='email'>Email</label>
            <input id='email' type='email' name='email'
                onChange={updateUserData} value={memory.email}>
            </input>
            <label htmlFor='password'>Password</label>
            <input id='password' type='password' name='password' autoComplete='new_password'
                onChange={updateUserData} value={memory.password || ''}/>
            {/* <input id='user_id' type='hidden' name='user_id' value={user_id}/> */}
            <button type='button'><Link to='/user'>Cancel</Link>&nbsp;</button>
            <button type='submit'>Change email</button>
        </form>
    );
}
