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
            <div className='logo-box'><Link className='logo' to='/'><img src='./img/chimp.png'/></Link></div>
            {/* onClick={() => location.assign('polls')} */}
            <div className='link-polls-box'><Link className='link-polls' to='/polls' >Polls</Link></div>
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
