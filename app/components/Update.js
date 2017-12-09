import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { FormUpdateName } from './FormUpdateName';
import { FormUpdateUsername } from './FormUpdateUsername';
import { FormUpdatePassword } from './FormUpdatePassword';
import { FormUpdateEmail } from './FormUpdateEmail';

export const Update = props => {
    const userInfo = props.state.userInfo[0];
    const memory = props.state.memory;
    const updateName = props.updateName;
    const formProps = {userInfo, memory, updateName};
    return (
        <div className='update-box'>
            <Switch>
                <Route path='/user/update/fullname' render={ () => <FormUpdateName formProps={formProps} /> } />
                <Route path='/user/update/username' render={ () => <FormUpdateUsername userInfo={userInfo} /> } />
                <Route path='/user/update/password' render={ () => <FormUpdatePassword userInfo={userInfo} /> } />
                <Route path='/user/update/email' render={ () => <FormUpdateEmail userInfo={userInfo}/> } />
            </Switch>
        </div>
    );
}
