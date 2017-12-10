import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = props => {
    const auth = props.state.authenticated;
    const userInfo = props.state.userInfo;
    return (
        <div className='nav-container'>
            <Link to='/'>Logo</Link>&nbsp;&nbsp;
            {auth ? '' : <div className='auth'><Link to='/user/login'>SIGN IN</Link>&nbsp;&nbsp;<Link to='/user/signup'>SIGN UP</Link></div>}
            {auth ? (<div className='link-to-user'>Hello, <div className='username' onClick={props.popMenu}>{userInfo[0].firstname}!</div></div>) : ''}
        </div>
    );
}
