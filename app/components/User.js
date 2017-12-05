import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Form } from './Form';
import { Nav } from './Nav';
import { Footer } from './Footer';

export const User = props => {
    return (
        <div>
            {/* <Route path='/user' component={Nav} /> */}
                <Switch>
                    <Route path='/user/signup' component={Form} />
                </Switch>
            {/* <Route path='/user' component={Footer} /> */}
        </div>
    );
}
