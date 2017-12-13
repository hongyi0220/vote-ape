import React from 'react';
import { Poll } from './Poll';
import { Route } from 'react-router-dom';

export const Polls = props => {
    const state = props.state;
    const polls = state.polls;
    const handleClickFromPoll = props.handleClickFromPoll;
    const history = props.history;
    const popped = props.state.ui.poll;
    const popPoll = props.popPoll;
    const buildChart = props.buildChart;
    console.log('poll popped: ', popped);
    // console.log('popPoll:', popPoll);
    console.log('state inside <Polls>:', props.state);
    return (
        <div className='polls-container'>
            <Route path='/polls/poll' render={() => popped ? <Poll buildChart={buildChart} state={state}/> : ''}/>
            {polls ? polls.map(poll =>
                <div className='poll' id={poll._id} onClick={e => {popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                    {`Title: ${poll.poll_name} Created: ${poll.created} By ${poll.username}
                    Views: ${poll.views} Voted: ${poll.voted} Upvote: ${poll.upvote}`}
                </div>
            ) : ''}
        </div>
    );
}
