import React from 'react';

export const FormUpdateName = props => {
    const firstname = props.userInfo.firstname;
    const lastname = props.userInfo.lastname;
    const user_id = props.userInfo._id['$oid'];
    return (
        <form action='/user/update/name' method='POST'>
            <Label htmlFor='firstname'>First name</Label>
            <input id='firstname' type='text' name='firstname' value={firstname}></input>
            <Label htmlFor='lastname'>Last name</Label>
            <input id='lastname' type='text' name='lastname' value={lastname}></input>
            <input id='user_id' type='hidden' name='user_id' value={user_id}></input>
            <button type='submit'></button>
        </form>
    );
}
