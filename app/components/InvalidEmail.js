import React from 'react';
import { Link } from 'react-router-dom';

export const InvalidEmail = props => {
    return (
        <div>
            <div className='msg'>This email is already in use, try signing in?</div>
            <Link to='/user/login'>Login</Link>
        </div>
    );
}
