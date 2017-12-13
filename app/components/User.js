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
import { UpdateSuccessful } from './UpdateSuccessful';
import { FormCreate } from './FormCreate';
import { CreateSuccessful } from './CreateSuccessful';
import { UpdateError } from './UpdateError';

export const User = props => {
    const auth = props.state.user.authenticated;
    const state = props.state;
    const closePopUps = props.closePopUps;
    const viewPoll = props.viewPoll;
    // console.log('auth at User.js?', auth ? 'yes': 'no');
    return (
        <div>
            {/* {console.log('yo!userData from <User>: ',state.user.data)} */}
            <Switch>
                <Route path='/user/create' render={() => auth ? <FormCreate addOption={props.addOption} state={state} /> : ''} />
                <Route path='/user/signup' component={ Form } />
                <Route path='/user/login' render={() => <FormLogin /> } />
                <Route path='/user' render={() => auth ? <UserContent viewPoll={viewPoll} state={state} /> : ''} />
            </Switch>
            <Switch>
                <Route path='/user/create/successful' component={ CreateSuccessful } />
                <Route path='/user/create/successful' component={ CreateSuccessful } />
                <Route path='/user/update/error' component={ UpdateError } />
                <Route path='/user/update/successful' component={ UpdateSuccessful } />
                <Route path='/user/update/(fullname|username|password|email)'
                render={() => auth ? <Updates state={state} updateUserData={props.updateUserData}/> : ''} />
            </Switch>
            <Route path='/user/signup/invalid/email' component={ InvalidEmail } />
            <Route path='/user/signup/invalid' component={ InvalidUsername } />
            <Route path='/user/login/error' component={ LoginError } />
        </div>
    );
}
