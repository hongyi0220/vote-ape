import React from 'react';
import { Link } from 'react-router-dom';

export const DropDownMenu = props => {
    const popped = props.popped;
    const handleClickFromMenu = props.handleClickFromMenu;
    return (
        <div>
            {popped ?
                <div className='drop-down-menu'>
                    <Link className='menu-dashboard' to='/user' onClick={handleClickFromMenu}>Dashboard</Link>
                    <button className='menu-signout' type='button' onClick={handleClickFromMenu}>Sign Out</button>
                    {/* <Link className='menu-signout' to='/signout' onClick={signout}>Sign Out</Link> */}
                </div> : ''}
        </div>
    );
}
