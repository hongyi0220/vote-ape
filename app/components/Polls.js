import React from 'react';
import { Poll } from './Poll';
import { Route } from 'react-router-dom';

export const Polls = props => {
    const polls = props.state.polls;
    const handleClickFromPoll = props.handleClickFromPoll;
    const history = props.history;
    const popped = props.state.ui.poll;
    const popPoll = props.popPoll;
    console.log('poll popped: ', popped);
    // console.log('popPoll:', popPoll);
    console.log('state inside <Polls>:', props.state);
    return (
        <div className='polls-container'>
            <Route path='/polls/poll' render={ () => popped ? <Poll state={props.state}/> : ''}/>
            {polls ? polls.map((poll, i) =>
                <div className='poll' id={poll._id} onClick={e => {popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                    {`Title: ${poll.poll_name} Created: ${poll.created} by ${poll.username}`}
                </div>
            ) : ''}
        </div>
    );
}
