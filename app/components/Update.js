import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { FormUpdateName } from './FormUpdateName';
import { FormUpdateUsername } from './FormUpdateUsername';
import { FormUpdatePassword } from './FormUpdatePassword';
import { FormUpdateEmail } from './FormUpdateEmail';

export const Update = props => {
    const userData = props.state.user.data;
    const memory = props.state.memory;
    const updateName = props.updateName;
    const formProps = {userData, memory, updateName};
    return (
        <div className='update-box'>
            <Switch>
                <Route path='/user/update/fullname' render={ () => <FormUpdateName formProps={formProps} /> } />
                <Route path='/user/update/username' render={ () => <FormUpdateUsername userData={userData} /> } />
                <Route path='/user/update/password' render={ () => <FormUpdatePassword userData={userData} /> } />
                <Route path='/user/update/email' render={ () => <FormUpdateEmail userData={userData}/> } />
            </Switch>
        </div>
    );
}
