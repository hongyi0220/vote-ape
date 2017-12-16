import React from 'react';
import { Link } from 'react-router-dom';

export const Landing = props => {
    const style = {
        height: document.documentElement.clientHeight - 160 || window.innerHeight - 160
    }
    return (
        <div className='landing-container'>
            <h1>Welcome to Poll Monkey!</h1>
            <Link className='signup' to='/user/signup'>SIGN UP FREE</Link>
        </div>
    );
}
