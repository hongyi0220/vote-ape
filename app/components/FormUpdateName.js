import React from 'react';
import { Link } from 'react-router-dom';

export const FormUpdateName = props => {
    const firstname = props.formProps.userData.firstname;
    const lastname = props.formProps.userData.lastname;
    // const user_id = props.formProps.userData._id;
    const updateUserData = props.formProps.updateUserData;
    const memory = props.formProps.memory;
    // console.log(user_id);
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
            {/* <input id='user_id' type='hidden' name='user_id' value={user_id}></input> */}
            <div className='buttons-box'>
                <button type='button'><Link to='/user'>Cancel</Link>&nbsp;</button>
                <button type='submit'>Change name</button>
            </div>
        </form>
    );
}
