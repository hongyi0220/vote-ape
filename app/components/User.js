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

export const User = props => {
    return (
        <div>
            {console.log('yo!userInfo: ',props.userInfo)}
            <UserContent state={props.state}/>
            <Switch>
                <Route path='/user/signup' component={ Form } />
                <Route path='/user/login' render={ () => <FormLogin handleClick={props.handleClick} /> } />
            </Switch>
            <Route path='/user/signup/invalid' component={ InvalidUsername } />
            <Route path='/user/signup/invalid/email' component={ InvalidEmail } />
            <Route path='/user/login/error' component={ LoginError } />
        </div>
    );
}
