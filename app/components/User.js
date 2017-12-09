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

export const User = props => {
    const authenticated = props.state.authenticated;
    return (
        <div>
            {console.log('yo!userInfo: ',props.userInfo)}

            <Switch>
                <Route path='/user/signup' component={ Form } />
                <Route path='/user/login' render={ () => <FormLogin /> } />
                <Route path='/user' render={ () => authenticated ? <UserContent state={props.state} /> : ''} />
            </Switch>
            <Switch>
                <Route path='/user/update/fullname/successful' component={ UpdateSuccessful } />
                <Route path='/user/update/(fullname)?/'
                render={ () => authenticated ? <Updates state={props.state} updateName={props.updateName}/> : ''} />
            </Switch>
            <Route path='/user/signup/invalid/email' component={ InvalidEmail } />
            <Route path='/user/signup/invalid' component={ InvalidUsername } />
            <Route path='/user/login/error' component={ LoginError } />
        </div>
    );
}
