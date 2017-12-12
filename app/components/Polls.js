import React from 'react';
import { Poll } from './Poll';
import { Route } from 'react-router-dom';

export const Polls = props => {
    let polls = props.state.polls;
    console.log('state inside <Polls>:', props.state);
    return (
        <div className='polls-container'>
            <Route path='polls/poll' render={ () => <Poll /> }/>
            {polls ? polls.map((poll, i) => 
                <div className='poll'>
                    {`Title: ${poll.poll_name} Created: ${poll.created}`}
                </div>
            ) : ''}
        </div>
    );
}
