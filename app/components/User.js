import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Form } from './Form';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { FormLogin } from './FormLogin';
import { InvalidUsername } from './InvalidUsername';
import { InvalidEmail } from './InvalidEmail';
import { LoginError } from './LoginError';
import { UserContent } from './UserContent';
import { Updates } from './Updates';
import { FormCreate } from './FormCreate';

export const User = props => {
    const auth = props.state.user.authenticated;
    const state = props.state;
    const closePopUps = props.closePopUps;
    const viewPoll = props.viewPoll;
    const handleDelete = props.handleDelete;

    return (
        <div className='user-container'>

            <Switch>
                <Route path='/user/create' render={() => auth ? <FormCreate addOption={props.addOption} state={state} /> : ''} />
                <Route path='/user/signup' component={ Form } />
                <Route path='/user/login' component={ FormLogin } />
                <Route path='/user' render={() => auth ? <UserContent handleDelete={handleDelete} viewPoll={viewPoll} state={state} /> : ''} />
            </Switch>
            {/* Msgs */}
            <Switch>
                <Route path='/user/create/successful' render={() => <div className='msg'>Poll created!</div>} />
                <Route path='/user/update/(fullname|username|password|email)'
                render={() => auth ? <Updates state={state} updateUserData={props.updateUserData}/> : ''} />
            </Switch>

            <Route path='/user/signup/invalid/email' component={ InvalidEmail } />
            <Route path='/user/signup/invalid' component={ InvalidUsername } />
            <Route path='/user/login/error' component={ LoginError } />
        </div>
    );
}
