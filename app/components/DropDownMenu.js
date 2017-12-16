import React from 'react';
import { Link } from 'react-router-dom';

export const DropDownMenu = props => {
    const popped = props.popped;
    const handleClickFromMenu = props.handleClickFromMenu;
    return (
        <div className='drop-down-menu-container'>
            {popped ?
                <div className='drop-down-menu'>
                    <div className='dashboard-button-box' onClick={handleClickFromMenu}>
                        <Link className='dashboard-button' to='/user' >Dashboard</Link>
                    </div>
                    {/* <div className='signout-button-box' > */}
                        <div className='signout-button' onClick={handleClickFromMenu}>Sign Out</div>
                    {/* </div> */}
                    {/* <Link className='menu-signout' to='/signout' onClick={signout}>Sign Out</Link> */}
                </div> : ''}
        </div>
    );
}
