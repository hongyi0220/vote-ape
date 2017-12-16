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
            <Link className='logo' to='/'>Logo</Link>&nbsp;&nbsp;
            {/* onClick={() => location.assign('polls')} */}
            <Link className='link-polls' to='/polls' >Polls</Link>&nbsp;&nbsp;
            <Switch>
                <Route exact path='/user/create' render={() => ''}></Route>
                <Route render={() =>
                    {return auth ? <Link className='create' to='/user/create'>CREATE</Link> : ''}}>
                </Route>
                }
            </Switch>
            {/* {auth && create ? <Link to='/user/create' onClick={unmountCreate}>CREATE</Link> : ''}&nbsp;&nbsp; */}
            {auth ? '' : <div className='auth'><Link className='login' to='/user/login'>SIGN IN</Link></div>}
            {auth ? (<div className='link-user'>Hello, <div className='username' onClick={props.toggleMenu}>{userData.firstname}!</div></div>) : ''}
        </div>
    );
}
