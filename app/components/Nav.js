import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = props => {
    const authenticated = props.state.authenticated;
    return (
        <div className='nav-container'>
            <Link to='/'>Logo</Link>&nbsp;&nbsp;
            {authenticated ? '' : <Link to='/user/login'>SIGN IN</Link>}&nbsp;&nbsp;
            <Link to='/user/signup'>SIGN UP</Link>
        </div>
    );
}
