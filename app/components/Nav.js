import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = props => {
    return (
        <div className='nav-container'>
            <Link to='/' >Logo</Link>
            <Link to='/user/signup' >SIGN UP</Link>
        </div>
    );
}
