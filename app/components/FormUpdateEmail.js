import React from 'react';
import { Link } from 'react-router-dom';

export const FormUpdateEmail = props => {
    const email = props.formProps.userData.email;
    const updateUserData = props.formProps.updateUserData;
    const memory = props.formProps.memory;
    return (
        <form className='form-email' action='/user/update/email' method='POST'>
            <div className='email-box'>
                <label htmlFor='email'>Email</label>
                <input id='email' type='email' name='email'
                    onChange={updateUserData} value={memory.email}/>
            </div>
            <div className='password-box'>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' name='password' autoComplete='new_password'
                    onChange={updateUserData} value={memory.password || ''}/>
            </div>
            <div className='buttons-box'>
                <Link to='/user'><button className='first-button' type='button'>Cancel</button></Link>&nbsp;
                <button type='submit'>Change email</button>
            </div>
        </form>
    );
}
