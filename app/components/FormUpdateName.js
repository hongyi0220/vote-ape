import React from 'react';
import { Link } from 'react-router-dom';

export const FormUpdateName = props => {
    const firstname = props.formProps.userData.firstname;
    const lastname = props.formProps.userData.lastname;
    const updateUserData = props.formProps.updateUserData;
    const memory = props.formProps.memory;

    return (
        <form className='form-fullname' action='/user/update/fullname' method='post'>
            <div className='firstname-box'>
                <label htmlFor='firstname'>First name</label>
                <input id='firstname' type='text' name='firstname'
                    onChange={updateUserData} value={memory.firstname}/>
            </div>
            <div className='lastname-box'>
                <label htmlFor='lastname'>Last name</label>
                <input id='lastname' type='text' name='lastname'
                    onChange={updateUserData} value={memory.lastname}/>
            </div>
            <div className='buttons-box'>
                <Link to='/user'><button className='first-button' type='button'>Cancel</button></Link>&nbsp;
                <button type='submit'>Change name</button>
            </div>
        </form>
    );
}
