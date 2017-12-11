import React from 'react';
import { Link } from 'react-router-dom';

export const FormUpdateName = props => {
    const firstname = props.formProps.userInfo.firstname;
    const lastname = props.formProps.userInfo.lastname;
    const user_id = props.formProps.userInfo._id;
    const updateName = props.formProps.updateName;
    const memory = props.formProps.memory;
    console.log(user_id);
    return (
        <form action='/user/update/fullname' method='post'>
            <div>
                <label htmlFor='firstname'>First name</label>
                <input id='firstname' type='text' name='firstname'
                    onChange={updateName} value={memory.firstname}>
                </input>
            </div>
            <div>
                <label htmlFor='lastname'>Last name</label>
                <input id='lastname' type='text' name='lastname'
                    onChange={updateName} value={memory.lastname}>
                </input>
            </div>
            <input id='user_id' type='hidden' name='user_id' value={user_id}></input>
            <button type='button'><Link to='/user'>Cancel</Link>&nbsp;</button>
            <button type='submit'>Change name</button>
        </form>
    );
}
