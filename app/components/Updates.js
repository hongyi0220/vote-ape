import React from 'react';
import { Route } from 'react-router-dom';
import { Update } from './Update';

export const Updates = props => {
    return (
        <div className='updates-container'>
            <Update state={props.state} />
            {console.log('heya from <updates>')}
            im updates
        </div>
    );
}
