import React from 'react';
import { Update } from './Update';

export const Updates = props => {
    return (
        <div className='updates-container'>
            <Update updateUserData={props.updateUserData} state={props.state} />
        </div>
    );
}
