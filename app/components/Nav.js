import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';

export const Nav = props => {
    const auth = props.state.user.authenticated;
    // const create = props.state.ui.create;
    const userData = props.state.user.data;
    // const unmountCreate = props.unmountCreate;
    // const topLevelNav = props.topLevelNav;
    return (
        <div className='nav-container'>
            <Link to='/'>Logo</Link>&nbsp;&nbsp;
            {/* onClick={() => location.assign('polls')} */}
            <Link to='/polls' >Polls</Link>&nbsp;&nbsp;
            <Switch>
                <Route exact path='/user/create' render={() => ''}></Route>
                <Route render={() =>
                    {return auth ? <Link to='/user/create'>CREATE</Link> : ''}}>
                </Route>
                }
            </Switch>&nbsp;&nbsp;
            {/* {auth && create ? <Link to='/user/create' onClick={unmountCreate}>CREATE</Link> : ''}&nbsp;&nbsp; */}
            {auth ? '' : <div className='auth'><Link to='/user/login'>SIGN IN</Link>&nbsp;&nbsp;<Link to='/user/signup'>SIGN UP</Link></div>}
            {auth ? (<div className='link-to-user'>Hello, <div className='username' onClick={props.toggleMenu}>{userData.firstname}!</div></div>) : ''}
        </div>
    );
}
