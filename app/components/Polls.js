import React from 'react';
import { Poll } from './Poll';
import { Route } from 'react-router-dom';

export const Polls = props => {
    const viewPoll = props.viewPoll;
    const state = props.state;
    const polls = state.polls;
    console.log('polls inside <Polls>:', polls);
    const handleClickFromPoll = viewPoll.handleClickFromPoll;
    const history = viewPoll.history;
    const popped = props.state.ui.poll;
    const popPoll = viewPoll.popPoll;
    const buildChart = props.buildChart;
    // const recent10 = polls.sort((a, b) => a.date - b.date).reverse();
    let featured10;
    if (polls) featured10 = polls.sort((a, b) => a.voted - b.voted).reverse();
    const upVote = props.upVote;
    // console.log('poll popped: ', popped);
    // console.log('popPoll:', popPoll);
    console.log('state inside <Polls>:', props.state);
    return (
        <div className='polls-container'>
            {/* <h3>Recent Polls</h3>
            <div className='recent-polls-container'>
                <Route path='/polls/poll' render={() => popped ? <Poll buildChart={buildChart} state={state}/> : ''}/>
                {polls ? recent10.map(poll =>
                    <div className='poll' id={poll._id} onClick={e => {popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                        {`Title: ${poll.poll_name} Created: ${poll.created} By ${poll.username}
                        Views: ${poll.views} Voted: ${poll.voted} Upvote: ${poll.upvote}`}
                    </div>
                ) : ''}
            </div> */}
            <h3>Featured Polls</h3>
            <div className='featured-polls-container'>
                <Route path='/polls/poll' render={() => popped ? <Poll upVote={upVote} buildChart={buildChart} state={state}/> : ''}/>
                {polls ? featured10.map(poll =>
                    <div className='poll' id={poll._id} onClick={e => {popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                        {`Title: ${poll.poll_name} Created: ${poll.created} By ${poll.username}
                        Views: ${poll.views} Voted: ${poll.voted} Upvote: ${poll.upvote}`}
                    </div>
                ) : ''}
            </div>
            <h3>All Polls</h3>
            <div className='all-polls-container'>
                {/* <Route path='/polls/poll' render={() => popped ? <Poll buildChart={buildChart} state={state}/> : ''}/> */}
                {polls ? polls.map(poll =>
                    <div className='poll' id={poll._id} onClick={e => {popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                        {`Title: ${poll.poll_name} Created: ${poll.created} By ${poll.username}
                        Views: ${poll.views} Voted: ${poll.voted} Upvote: ${poll.upvote}`}
                    </div>
                ) : ''}
            </div>
        </div>
    );
}
