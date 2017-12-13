import React from 'react';
// import { Route } from 'react-router-dom';
import { Update } from './Update';

export const Updates = props => {
    return (
        <div className='updates-container'>
            <Update updateUserData={props.updateUserData} state={props.state} />
            {/* {console.log('heya from <updates>')} */}
        </div>
    );
}
