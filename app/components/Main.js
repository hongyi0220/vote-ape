import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Landing } from './Landing';
import { Nav } from './Nav';
import { Footer } from './Footer';

export const Main = props => {
    return (
        <div>
            <Route path='/' component={Nav} />
            <Switch>
                <Route exact path='/' component={Landing} />
            </Switch>
            <Route path='/' component={Footer} />
        </div>
    );
}
