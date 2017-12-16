import React from 'react';
import { Poll } from './Poll';
import { Route } from 'react-router-dom';

export const Polls = props => {
    const viewPoll = props.viewPoll;
    const state = props.state;
    const polls = state.polls;
    // console.log('polls inside <Polls>:', polls);
    const handleClickFromPoll = viewPoll.handleClickFromPoll;
    const history = viewPoll.history;
    const popped = props.state.ui.poll;
    const popPoll = viewPoll.popPoll;
    const buildChart = props.buildChart;
    const storeCommentInMemory = props.storeCommentInMemory;
    // const recent10 = polls.sort((a, b) => a.date - b.date).reverse();
    let featured10;
    if (polls) featured10 = polls.sort((a, b) => a.voted - b.voted).reverse();
    const upVote = props.upVote;
    const handleSubmitComment = props.handleSubmitComment;
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

            <div className='featured-polls-container'>
                <h3>Featured Polls</h3>
                <Route path='/polls/poll' render={() =>
                    popped ? <Poll handleSubmitComment={handleSubmitComment} storeCommentInMemory={storeCommentInMemory}
                        upVote={upVote} buildChart={buildChart} state={state}/> : ''}/>
                {polls ? featured10.map(poll =>
                    <div className='poll' id={poll._id} onClick={e => {popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                    <div className='title-created-container'>
                        <div className='title-box'><b>{poll.poll_name}</b></div>
                        <div className='created-box'>{poll.created}</div>
                    </div>
                    <div className='poll-detail-container'>By {poll.username}&nbsp;<div className='seperator'></div>&nbsp;
                       Voted: {poll.voted}&nbsp;<div className='seperator'></div>&nbsp;<i className="fa fa-thumbs-o-up" aria-hidden="true">
                      </i>&nbsp;{poll.upvote}
                    </div>
                        {/* {`Title: ${poll.poll_name} Created: ${poll.created} By ${poll.username}
                        Views: ${poll.views} Voted: ${poll.voted}`} <i className="fa fa-thumbs-o-up" aria-hidden="true">
                        </i>&nbsp;{poll.upvote} */}
                    </div>
                ) : ''}
            </div>

            <div className='all-polls-container'>
                <h3>All Polls</h3>
                {/* <Route path='/polls/poll' render={() => popped ? <Poll buildChart={buildChart} state={state}/> : ''}/> */}
                {polls ? polls.map(poll =>
                    <div className='poll' id={poll._id}
                        onClick={e => {popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                        <div className='title-created-container'>
                            <div className='title-box'><b>{poll.poll_name}</b></div>
                            <div className='created-box'>{poll.created}</div>
                        </div>
                        <div className='poll-detail-container'>By {poll.username}&nbsp;<div className='seperator'></div>&nbsp;
                           Voted: {poll.voted}&nbsp;<div className='seperator'></div>&nbsp;<i className="fa fa-thumbs-o-up" aria-hidden="true">
                          </i>&nbsp;{poll.upvote}
                        </div>
                    </div>
                    // <div className='poll' id={poll._id} onClick={e => {popPoll(e); handleClickFromPoll(e); history.push('/polls/poll')}}>
                    //     {`Title: ${poll.poll_name} Created: ${poll.created} By ${poll.username}
                    //     Views: ${poll.views} Voted: ${poll.voted} Upvote: ${poll.upvote}`}
                    // </div>
                ) : ''}
            </div>
        </div>
    );
}
