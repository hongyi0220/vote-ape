import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = props => {
    const authenticated = props.state.authenticated;
    const userInfo = props.state.userInfo;
    return (
        <div className='nav-container'>
            <Link to='/'>Logo</Link>&nbsp;&nbsp;
            {authenticated ? '' : <Link to='/user/login'>SIGN IN</Link>}&nbsp;&nbsp;
            {authenticated ? <div className='link-to-user'>Hello, <Link to='/user'>{userInfo[0].firstname}!</Link></div> : <Link to='/user/signup'>SIGN UP</Link>}
        </div>
    );
}
