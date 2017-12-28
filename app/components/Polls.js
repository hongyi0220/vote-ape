import React from 'react';
import { Poll } from './Poll';
import { Route } from 'react-router-dom';

export const Polls = props => {
    const viewPoll = props.viewPoll;
    const state = props.state;
    const polls = state.polls;
    const handleClickFromPoll = viewPoll.handleClickFromPoll;
    const history = viewPoll.history;
    const popped = props.state.ui.poll;
    const popPoll = viewPoll.popPoll;
    const buildChart = props.buildChart;
    const storeCommentInMemory = props.storeCommentInMemory;

    let featured10;
    if (polls) featured10 = polls.sort((a, b) => a.voted - b.voted).reverse().slice(0,10);
    const upVote = props.upVote;
    const handleSubmitComment = props.handleSubmitComment;

    return (
        <div className='polls-container'>

            <h3>Featured Polls</h3>
            <div className='featured-polls-container'>
                {/* Poll pop-up */}
                <Route path='/polls/poll' render={() =>
                    popped ? <Poll handleSubmitComment={handleSubmitComment} storeCommentInMemory={storeCommentInMemory}
                        upVote={upVote} buildChart={buildChart} state={state}/> : ''}/>

                {polls ? featured10.map((poll, i) =>
                    <div key={i} className='poll' id={poll ? poll._id : ''} onClick={e => {e.stopPropagation(); popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                        <div id={poll ? poll._id : ''} className='title-created-container'>
                            <div id={poll ? poll._id : ''} className='title-box'><b id={poll ? poll._id : ''}>{poll.poll_name}</b></div>
                            <div id={poll ? poll._id : ''} className='created-box'>{poll.created}</div>
                        </div>
                        <div id={poll ? poll._id : ''} className='poll-detail-container'>By {poll.username}&nbsp;<div id={poll ? poll._id : ''} className='seperator'></div>&nbsp;
                           Voted: {poll.voted}&nbsp;<div id={poll ? poll._id : ''} className='seperator'></div>&nbsp;<i id={poll ? poll._id : ''} className="fa fa-thumbs-o-up" aria-hidden="true">
                          </i>&nbsp;{poll.upvote}
                        </div>
                    </div>
                ) : ''}
            </div>
            <h3>All Polls</h3>
            <div className='all-polls-container'>

                {polls ? polls.map((poll, i) =>
                    <div key={i} className='poll' id={poll ? poll._id : ''}
                        onClick={e => {e.stopPropagation(); popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                        <div id={poll ? poll._id : ''} className='title-created-container'>
                            <div id={poll ? poll._id : ''} className='title-box'><b id={poll ? poll._id : ''}>{poll.poll_name}</b></div>
                            <div id={poll ? poll._id : ''} className='created-box'>{poll.created}</div>
                        </div>
                        <div id={poll ? poll._id : ''} className='poll-detail-container'>By {poll.username}&nbsp;<div id={poll ? poll._id : ''} className='seperator'></div>&nbsp;
                           Voted: {poll.voted}&nbsp;<div id={poll ? poll._id : ''} className='seperator'></div>&nbsp;<i id={poll ? poll._id : ''} className="fa fa-thumbs-o-up" aria-hidden="true">
                          </i>&nbsp;{poll.upvote}
                        </div>
                    </div>
                ) : ''}
            </div>
        </div>
    );
}
