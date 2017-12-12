import React from 'react';
// import { Route } from 'react-router-dom';
import { Update } from './Update';

export const Updates = props => {
    return (
        <div className='updates-container'>
            <Update updateName={props.updateName} state={props.state} />
            {/* {console.log('heya from <updates>')} */}
        </div>
    );
}
