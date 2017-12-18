import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = props => {
    return (
        <div className='landing-container'>
            <h1>Welcome to PollMonkey!</h1>
            <Link className='signup' to='/user/signup'>SIGN UP FREE</Link>
        </div>
    );
}
