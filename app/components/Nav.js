import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = props => {
    const auth = props.state.user.authenticated;
    const userData = props.state.user.data;
    // const topLevelNav = props.topLevelNav;
    return (
        <div className='nav-container'>
            <Link to='/'>Logo</Link>&nbsp;&nbsp;
            {/* onClick={() => location.assign('polls')} */}
            <Link to='/polls' >Polls</Link>&nbsp;&nbsp;
            {auth ? <Link to='/user/create'>CREATE</Link> : ''}&nbsp;&nbsp;
            {auth ? '' : <div className='auth'><Link to='/user/login'>SIGN IN</Link>&nbsp;&nbsp;<Link to='/user/signup'>SIGN UP</Link></div>}
            {auth ? (<div className='link-to-user'>Hello, <div className='username' onClick={props.popMenu}>{userData.firstname}!</div></div>) : ''}
        </div>
    );
}
