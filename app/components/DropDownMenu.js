import React from 'react';
import { Link } from 'react-router-dom';

export const DropDownMenu = props => {
    const popped = props.popped;
    const handleCLickFromMenu = props.handleCLickFromMenu;
    return (
        <div>
            {popped ?
                <div className='drop-down-menu'>
                    <Link className='menu-dashboard' to='/user' onClick={handleCLickFromMenu}>Dashboard</Link>
                    <button className='menu-signout' type='button' onClick={handleCLickFromMenu}>Sign Out</button>
                    {/* <Link className='menu-signout' to='/signout' onClick={signout}>Sign Out</Link> */}
                </div> : ''}
        </div>
    );
}
