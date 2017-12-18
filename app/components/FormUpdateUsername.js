import React from 'react';
import { Link } from 'react-router-dom';

export const FormUpdateUsername = props => {
    const username = props.formProps.userData.username;
    const updateUserData = props.formProps.updateUserData;
    const memory = props.formProps.memory;
    return (
        <form className='form-username' action='/user/update/username' method='POST'>
            <div className='username-box'>
                <label htmlFor='username'>Username</label>
                <input id='username' type='text' name='username'
                    onChange={updateUserData} value={memory.username}/>
            </div>
            <div className='password-box'>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' name='password' autoComplete='new_password'
                    onChange={updateUserData} value={memory.password || ''}/>
            </div>
            <div className='buttons-box'>
                <Link to='/user'><button className='first-button' type='button'>Cancel</button></Link>&nbsp;
                <button type='submit'>Change username</button>
            </div>
        </form>
    );
}
